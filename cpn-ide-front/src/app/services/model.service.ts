import { Injectable } from '@angular/core';
import { EventService } from './event.service';
import { Message } from '../common/message';
import { SettingsService } from '../services/settings.service';

import {
  getDefText
} from '../../lib/cpn-js/features/modeling/CpnElementFactory';

import { nodeToArray, addNode, arrayMove, getNextId, cloneObject } from '../common/utils';
import { DataCollectionMonitorTemplate, BreakpointMonitorTemplate, UserDefinedMonitorTemplate, WriteInFileMonitorTemplate, MarkingSizeMonitorTemplate, ListLengthDataCollectionMonitorTemplate, CountTransitionOccurrencesMonitorTemplate, PlaceContentBreakPointMonitorTemplate, TransitionEnabledBreakPointMonitorTemplate, MonitorType } from '../common/monitors';
import { parseDeclarartion } from '../project-tree/project-tree-declaration-node/declaration-parser';
import { DEFAULT_PAGE } from '../common/default-data';


/**
 * Common service for getting access to project data from all application
 */
@Injectable()
export class ModelService {

  monitorType = MonitorType;

  private isLoaded = false;

  public project = undefined;
  public projectData = undefined;
  public projectName = '';

  private backupModel = [];
  private redoBackupModel;
  private modelCase = [];

  countNewItems = 0;
  paramsTypes = ['ml', 'color', 'var', 'globref'];


  undoHistory = [];
  redoHistory = [];
  skipBackup = false;

  backupBusy = false;
  undoRedoBusy = false;

  constructor(private eventService: EventService,
    private settings: SettingsService,
  ) {
    console.log('ModelService instance CREATED!');

    this.modelCase['cpn:Place'] = 'place';
    this.modelCase['cpn:Transition'] = 'trans';
    this.modelCase['cpn:Connection'] = 'arc';
    this.modelCase['cpn:Label'] = 'label';
    this.modelCase['bpmn:Process'] = 'trans';
    this.modelCase['place'] = 'place';
    this.modelCase['trans'] = 'trans';
    this.modelCase['arc'] = 'arc';
    this.modelCase['label'] = 'label';

    this.eventService.on(Message.PROJECT_LOAD, (event) => {
      if (event.project) {
        this.loadProject(event.project);
        this.eventService.send(Message.SERVER_INIT_NET,
          {
            projectData: this.getProjectData(),
            complexVerify: true,
            restartSimulator: true
          });
      }
    });

    // this.eventService.on(Message.MODEL_RELOAD, () => {
    //   // this.loadProject(this.getProject());
    // });

    // MODEL SAVE BACKUP
    this.eventService.on(Message.MODEL_SAVE_BACKUP, (event) => {
      if (event && event.lastProjectData) {
        this.saveBackup(event.lastProjectData);
      }
    });

  }

  markNewModel() {
    this.isLoaded = false;
  }

  markOpenedModel() {
    this.isLoaded = true;
  }

  isModelLoaded() {
    return this.isLoaded;
  }

  /**
   * Load project
   */
  public loadProject(project) {
    console.log('ModelService.loadProject(), project = ', project);

    this.undoHistory = [];
    this.redoHistory = [];

    this.project = project;
    this.projectData = project.data;
    this.projectName = project.name;

    this.updatePlaceTypes();
    this.updateInstances();
    this.updateBinders();

    localStorage.setItem('projectJson', JSON.stringify(this.projectData));
  }

  getUndoCount() {
    // console.log('getUndoCount()');
    return this.undoHistory.length;
  }

  getRedoCount() {
    return this.redoHistory.length;
  }

  saveBackup(model) {
    if (this.backupBusy) {
      return;
    }
    this.backupBusy = true;

    if (Object.keys(model).length > 0) {
      // if (!this.skipBackup) {
      this.undoHistory.push(model);
      this.redoHistory = [];

      if (this.undoHistory.length > 100) {
        this.undoHistory.splice(0, 1);
      }
      // }
    }
    this.skipBackup = false;

    this.backupBusy = false;
  }

  undoChanges() {
    if (this.undoRedoBusy) {
      return;
    }
    this.undoRedoBusy = true;

    if (this.undoHistory.length > 0) {
      // add current model to redo history
      this.redoHistory.push(this.projectData);

      // get model from redo history
      this.projectData = this.undoHistory.pop();
      this.project = { data: this.projectData, name: this.projectName };
      this.skipBackup = true;
      this.eventService.send(Message.MODEL_RELOAD);
    }

    this.undoRedoBusy = false;

    // this.eventService.send(Message.MODEL_CHANGED);
  }

  redoChanges() {
    if (this.undoRedoBusy) {
      return;
    }
    this.undoRedoBusy = true;

    if (this.redoHistory.length > 0) {
      // get model from undo history
      this.projectData = this.redoHistory.pop();
      this.project = { data: this.projectData, name: this.projectName };
      this.skipBackup = true;
      this.eventService.send(Message.MODEL_RELOAD);

      // add current model to undo history
      this.undoHistory.push(this.projectData);
    }

    this.undoRedoBusy = false;

    // this.eventService.send(Message.MODEL_CHANGED);
  }

  public getProject() {
    return this.project;
  }

  public getProjectData() {
    return this.projectData;
  }

  /**
   * Get root cpnet element from CPN project JSON object
   * @returns - cpnElement for cpnet element
   */
  getCpn() {
    let cpnet;
    if (this.projectData) {
      if (this.projectData.workspaceElements) {
        if (this.projectData.workspaceElements instanceof Array) {
          for (const workspaceElement of this.projectData.workspaceElements) {
            if (workspaceElement.cpnet) {
              cpnet = workspaceElement.cpnet;
              break;
            }
          }
        } else {
          if (this.projectData.workspaceElements.cpnet) {
            cpnet = this.projectData.workspaceElements.cpnet;
          }
        }
      }
    }
    return cpnet;
  }

  getMonitorsRoot() {
    const cpnet = this.getCpn();
    if (cpnet) {
      if (!cpnet.monitorblock) {
        cpnet.monitorblock = {};
      }
      return cpnet.monitorblock;
    }
    return undefined;
  }

  /**
   * Delete any cpn element from model json
   *
   * @param cpnElement
   */
  deleteFromModel(cpnElement) {
    const id = cpnElement._id;

    const e = this.findCpnElementById(undefined, undefined, this.projectData, id);

    console.log('deleteFromModel(), e = ', e);

    if (e) {
      if (e.cpnParentElement instanceof Array) {
        e.cpnParentElement.splice(e.cpnParentElement.indexOf(e.cpnElement), 1);
        if (e.cpnParentElement.length === 0) {
          // console.log('deleteFromModel(), delete e = ', e);
          if (e.cpnGrandParentElement) {
            this.deleteFromObject(e.cpnGrandParentElement, e.cpnParentElement);
          }
        }
      } else if (e.cpnParentElement instanceof Object) {
        this.deleteFromObject(e.cpnParentElement, e.cpnElement);
      }
    }

    if (cpnElement.subst) {
      this.updateInstances();
    }
  }

  /**
   * Delete object from it's parent
   *
   * @param cpnParentElement
   * @param cpnElement
   */
  deleteFromObject(cpnParentElement, cpnElement) {
    if (cpnParentElement instanceof Object) {
      for (const key of Object.keys(cpnParentElement)) {
        if (cpnParentElement[key] === cpnElement) {
          delete cpnParentElement[key];
        }
      }
    }
  }

  /**
   * Find cpn object in json object tree
   *
   * @param cpnGrandParentElement
   * @param cpnParentElement
   * @param cpnElement
   * @param id
   */
  findCpnElementById(cpnGrandParentElement, cpnParentElement, cpnElement, id) {
    if (cpnElement instanceof Object || cpnElement instanceof Array) {
      // console.log('getCpnElementById(), cpnElement = ', cpnElement);

      if (cpnElement._id === id) {
        return {
          cpnGrandParentElement: cpnGrandParentElement,
          cpnParentElement: cpnParentElement,
          cpnElement: cpnElement
        };
      }

      for (const k of Object.keys(cpnElement)) {
        const e = this.findCpnElementById(cpnParentElement, cpnElement, cpnElement[k], id);
        if (e) {
          return {
            cpnGrandParentElement: e.cpnGrandParentElement,
            cpnParentElement: e.cpnParentElement,
            cpnElement: e.cpnElement
          };
        }
      }
    }
    return undefined;
  }

  addElementJsonOnPage(cpnElement, pageId, type, _modeling) {
    console.log('addElementJsonOnPage()', cpnElement, pageId, type);

    const page = this.getPageById(pageId);
    console.log('addElementJsonOnPage(), page = ', page);

    if (page[this.modelCase[type]] instanceof Array) {
      page[this.modelCase[type]].push(cpnElement);
    } else {
      if (page[this.modelCase[type]]) {
        const currentElem = page[this.modelCase[type]];
        page[this.modelCase[type]] = [currentElem, cpnElement];
      } else {
        page[this.modelCase[type]] = [cpnElement];
      }
    }

    if (cpnElement.subst) {
      this.updateInstances();
    }

    // this.eventService.send(Message.MODEL_CHANGED);
  }

  instaceForTransition(id, isRoot) {
    return !isRoot ? { _id: getNextId(), _trans: id } : { _id: getNextId(), _page: id };
  }

  /**
   * Correct Place types. It should be UNIT by default if empty
   */
  updatePlaceTypes() {
    const defPlaceType = this.settings.appSettings['type'];

    const allPlaces = this.getAllPlaces();
    for (const p of allPlaces) {
      if (p.type) {

        let text;
        if (typeof p.type.text === 'object') {
          text = p.type.text.__text || '';
        } else {
          text = p.type.text || '';
        }

        if (text === '') {
          p.type.text = getDefText(defPlaceType);
        }
      }
    }
  }

  updateBinders(rootInstanceId = null) {
    const cpnet = this.getCpn();

    cpnet.binders = {}; // binders;
  }

  updateInstances() {
    const cpnet = this.getCpn();
    const rootPages = this.getRootPages();

    const instances = [];

    let rootInstanceId;

    for (const p of rootPages) {
      if (!rootInstanceId) {
        rootInstanceId = p._id + 'itop';
      }

      const instance: any = {
        _id: p._id + 'itop',
        _page: p._id
      };

      const subinstances = this.getSubInstances(p);
      if (subinstances) {
        instance.instance = subinstances;
      }

      instances.push(instance);
    }

    if (instances.length > 1) {
      cpnet.instances = { instance: instances };
    } else if (instances.length === 1) {
      cpnet.instances = { instance: instances[0] };
    } else if (cpnet.instances) {
      delete cpnet.instances;
    }

    // this.updateBinders(rootInstanceId);

    this.updateMonitorInstances();
  }

  updateMonitorInstances(monitorblock = this.getCpn().monitorblock) {
    if (monitorblock) {

      // iterate all monitors
      for (const monitor of nodeToArray(monitorblock.monitor)) {

        // iterate all monitor nodes
        for (const node of nodeToArray(monitor.node)) {

          // if node refer to element
          if (node._idref) {

            // try to get page for element
            const nodePage = this.getPageByElementId(node._idref);

            // if page defined
            if (nodePage) {

              // try to get instance for page
              const inst = this.getInstance(nodePage._id);

              // if instance defined
              if (inst) {
                // set new instance id reference
                node._pageinstanceidref = inst._id;
              }
            }
          }
        }
      }

    }
  }

  /**
   * Find sub instances for page
   */
  getSubInstances(page) {
    console.log(this.constructor.name, 'getSubInstances(), page = ', page);

    if (!page) {
      return undefined;
    }

    const instances = [];

    for (const t of nodeToArray(page.trans)) {
      if (t && t.subst) {
        const instance: any = {
          _id: t._id + 'ia',
          _trans: t._id
        };

        const subpage = this.getPageById(t.subst._subpage);
        if (subpage) {
          const subinstances = this.getSubInstances(subpage);
          if (subinstances) {
            instance.instance = subinstances;
          }
        }

        instances.push(instance);
      }
    }

    if (instances.length === 0) {
      return undefined;
    }
    if (instances.length === 1) {
      return instances[0];
    }
    return instances;
  }

  getInstance(pageId, instances = this.getCpn().instances) {
    console.log(this.constructor.name, 'getInstance(), pageId, instances = ', pageId, instances);

    for (const inst of nodeToArray(instances)) {
      if (inst._page === pageId) {
        return inst;
      }

      if (inst._trans) {
        const trans = this.getTransById(inst._trans);
        if (trans && trans.subst && trans.subst._subpage === pageId) {
          return inst;
        }
      }

      if (inst.instance) {
        const inst2 = this.getInstance(pageId, inst.instance);
        if (inst2) {
          return inst2;
        }
      }
    }
    return undefined;
  }

  moveNonModelJsonElement(element, parent, target, index, type) {
    // console.log(this.constructor.name, 'moveNonModelJsonElement(), element = ', element);

    const addelemToEntry = (entry) => {
      if (target[entry]) {
        if (!(target[entry] instanceof Array)) {
          target[entry] = [target[entry]];
        }
        if (element instanceof Array) {
          for (const el of element) {
            target[entry].splice(++index, 0, el);
          }
        } else {
          target[entry].splice(index, 0, element);
        }
      } else if (element instanceof Array) {
        target[type] = element;
      } else {
        target[type] = [element];
      }
    };

    if (type === 'page') {
    } else if (!type) {
      if (target.block) {
        if (target.block instanceof Array) {
          target.block.splice(index, 0, element);
        } else {
          target.block = [target.block];
          target.block.splice(index, 0, element);
        }
      } else if (element instanceof Array) {
        target.block = element;
      } else {
        target.block = [element];
      }
      if (parent.block instanceof Array) {
        for (let i = 0; i < parent.block.length; i++) {
          if (parent.block[i]._id === element._id) {
            parent.block.splice(i, 1);
            break;
          }
        }
      } else {
        parent.block = [];
      }
    } else if (this.paramsTypes.includes(type)) {
      if (parent[type] instanceof Array && parent[type].length > 0) {
        for (let i = 0; i < parent[type].length; i++) {
          if (parent[type][i]._id === element._id) {
            parent[type].splice(i, 1);
            break;
          }
        }
      } else {
        delete parent[type];
      }
      addelemToEntry(type);
    } else {
      if (parent.block instanceof Array) {
        for (let i = 0; i < parent.block.length; i++) {
          if (parent.block[i]._id === element._id) {
            parent.block.splice(i, 1);
          }
        }
      } else {
        parent.block = [];
      }
      addelemToEntry('block');
    }
  }

  changeLabelText(label, text, pageId) {
    if (label && label.text) {
      label.text.__text = text;
    }
  }

  changePageName(pageId, name) {
    const changedPage = this.getPageById(pageId);
    if (changedPage) {
      changedPage.pageattr._name = name;
    }
  }

  createNewPage(page) {
    const cpnet = this.getCpn();

    if (cpnet.page instanceof Array) {
      cpnet.page.push(page);
    } else {
      cpnet.page = [cpnet.page, page];
    }

    this.updateInstances();
  }

  deleteElementInBlock(block, elementType, id) {
    // blcok[elementType] = blcok[elementType].filter(elem => elem._id !== id);
    if (!(block[elementType] instanceof Array)) {
      block[elementType] = [block[elementType]];
    }
    for (let i = 0; i < block[elementType].length; i++) {
      if (block[elementType][i]._id === id) {
        block[elementType].splice(i, 1);
        if (block[elementType].length === 0) {
          delete block[elementType];
        }
      }
    }
  }

  deleteMonitorInBlock(_block, _id) {
  }

  /**
   * Getters for new cpnElement
   */

  /**
   * Creating empty page cpnElement
   * @param name - name of new page
   * @returns - new page cpnElement
   */
  createCpnPage(name, id = undefined) {
    // const newPage = {
    //   pageattr: {
    //     _name: name
    //   },
    //   constraints: '',
    //   _id: id ? id : getNextId()
    // };

    const placeList = this.getAllPlaces();
    const pageList = this.getAllPages();

    const newPage = cloneObject(DEFAULT_PAGE);
    newPage.pageattr._name = name + ' ' + (pageList.length + 1);
    newPage._id = id || getNextId();

    // newPage.place._id = getNextId();
    // newPage.place.text = "P" + (placeList.length + 1);

    // this.updateInstances();
    return newPage;
  }


  /**
   * Creating empty block cpnElement
   * @param name - name of new block
   * @returns - new block cpnElement
   */
  createCpnBlock(name) {
    return {
      id: name,
      _id: getNextId()
    };
  }


  /**
   * Creating empty declaration cpnElement
   * @param layout - value of new declaration
   * @returns - new declaration cpnElement
   */
  createCpnDeclaration(layout) {
    return {
      layout: layout,
      _id: getNextId()
    };
  }

  // ------------------------------------------------
  // DC: 'Data collection',
  // MS: 'Marking size',
  // BP: 'Break point',
  // UD: 'User defined',
  // WIF: 'Write in file',
  // LLDC: 'List length data collection',
  // CTODC: 'Count transition occurence data collector',
  // PCBP: 'Place content break point',
  // TEBP: 'Transition enabled break point'
  // ------------------------------------------------

  getShapeNames(cpnElement) {
    let s = '';
    for (const e of nodeToArray(cpnElement)) {
      if (s.length > 0) {
        s += ', ';
      }
      s += e.text;
    }
    return s;
  }

  getMonitorNodeList(cpnElement) {
    const nodeList = [];

    for (const e of nodeToArray(cpnElement)) {
      const nodePage = this.getPageByElementId(e._id);
      const inst = this.getInstance(nodePage._id);

      nodeList.push({
        _idref: e._id,
        _pageinstanceidref: inst ? inst._id : ''
      });
    }
    if (nodeList.length === 0) {
      return undefined;
    }
    return nodeList.length === 1 ? nodeList[0] : nodeList;
  }

  createCpnMonitor(monitorType: string, cpnElementList, monitorDefaults) {

    // monitorDefaults
    // {
    //   "defaultInit": "string",
    //   "defaultObserver": "string",
    //   "defaultPredicate": "string",
    //   "defaultStop": "string",
    //   "defaultTimed": true
    // }

    let newMonitorCpnElement;
    switch (monitorType) {
      case this.monitorType.BP: newMonitorCpnElement = this.createCpnMonitorBP(cpnElementList, monitorDefaults); break;
      case this.monitorType.CTODC: newMonitorCpnElement = this.createMonitorCTODC(cpnElementList, monitorDefaults); break;
      case this.monitorType.DC: newMonitorCpnElement = this.createCpnMonitorDC(cpnElementList, monitorDefaults); break;
      case this.monitorType.LLDC: newMonitorCpnElement = this.createCpnMonitorLLDC(cpnElementList, monitorDefaults); break;
      case this.monitorType.MS: newMonitorCpnElement = this.createCpnMonitorMS(cpnElementList, monitorDefaults); break;
      case this.monitorType.PCBP: newMonitorCpnElement = this.createCpnMonitorPCBP(cpnElementList, monitorDefaults); break;
      case this.monitorType.TEBP: newMonitorCpnElement = this.createCpnMonitorTEBP(cpnElementList, monitorDefaults); break;
      case this.monitorType.UD: newMonitorCpnElement = this.createCpnMonitorUD(cpnElementList, monitorDefaults); break;
      case this.monitorType.WIF: newMonitorCpnElement = this.createCpnMonitorWIF(cpnElementList, monitorDefaults); break;
    }

    // this.updateInstances();

    return newMonitorCpnElement;
  }

  getMonitorDefaults(monitorDefaults, monitorTemplate: DataCollectionMonitorTemplate) {
    return {
      defaultInit: monitorDefaults && monitorDefaults.defaultInit ? monitorDefaults.defaultInit : monitorTemplate.defaultInit(),
      defaultObserver: monitorDefaults && monitorDefaults.defaultObserver ? monitorDefaults.defaultObserver : monitorTemplate.defaultObserver(),
      defaultPredicate: monitorDefaults && monitorDefaults.defaultPredicate ? monitorDefaults.defaultPredicate : monitorTemplate.defaultPredicate(),
      defaultStop: monitorDefaults && monitorDefaults.defaultStop ? monitorDefaults.defaultStop : monitorTemplate.defaultStop(),
      defaultTimed: monitorDefaults && monitorDefaults.defaultTimed ? monitorDefaults.defaultTimed : monitorTemplate.defaultTimed(),
      defaultLogging: monitorDefaults && monitorDefaults.defaultLogging ? monitorDefaults.defaultLogging : monitorTemplate.defaultLogging()
    };
  }

  createCpnMonitorDC(cpnElement, monitorDefaults) {
    console.log('createCpnMonitorDC(), cpnElement = ', cpnElement);
    const monitorTemplate = new DataCollectionMonitorTemplate();

    monitorDefaults = this.getMonitorDefaults(monitorDefaults, monitorTemplate);

    return {
      _id: getNextId(),
      _name: monitorTemplate.typeDescription() + ' monitor',
      _type: monitorTemplate.type(),
      _typedescription: monitorTemplate.typeDescription(),
      _disabled: 'false',
      node: this.getMonitorNodeList(cpnElement),
      declaration: [
        { _name: 'Predicate', ml: { _id: getNextId(), __text: monitorDefaults.defaultPredicate } },
        { _name: 'Observer', ml: { _id: getNextId(), __text: monitorDefaults.defaultObserver } },
        { _name: 'Init function', ml: { _id: getNextId(), __text: monitorDefaults.defaultInit } },
        { _name: 'Stop', ml: { _id: getNextId(), __text: monitorDefaults.defaultStop } },
      ],
      option: [
        { _name: 'Timed', _value: monitorDefaults.defaultTimed },
        { _name: 'Logging', _value: monitorDefaults.defaultLogging }
      ]
    };
  }

  createCpnMonitorBP(cpnElement, monitorDefaults) {
    console.log('createCpnMonitorBP(), cpnElement = ', cpnElement);
    const monitorTemplate = new BreakpointMonitorTemplate();

    monitorDefaults = this.getMonitorDefaults(monitorDefaults, monitorTemplate);

    return {
      _id: getNextId(),
      _name: monitorTemplate.typeDescription() + ' monitor',
      _type: monitorTemplate.type(),
      _typedescription: monitorTemplate.typeDescription(),
      _disabled: 'false',
      node: this.getMonitorNodeList(cpnElement),
      declaration: [
        { _name: 'Predicate', ml: { _id: getNextId(), __text: monitorDefaults.defaultPredicate } },
        { _name: 'Observer', ml: { _id: getNextId(), __text: monitorDefaults.defaultObserver } },
        { _name: 'Init function', ml: { _id: getNextId(), __text: monitorDefaults.defaultInit } },
        { _name: 'Stop', ml: { _id: getNextId(), __text: monitorDefaults.defaultStop } },
      ],
      option: [
        { _name: 'Timed', _value: monitorDefaults.defaultTimed },
        { _name: 'Logging', _value: monitorDefaults.defaultLogging }
      ]
    };
  }

  createCpnMonitorUD(cpnElement, monitorDefaults) {
    console.log('createCpnMonitorUD(), cpnElement = ', cpnElement);
    const monitorTemplate = new UserDefinedMonitorTemplate();

    monitorDefaults = this.getMonitorDefaults(monitorDefaults, monitorTemplate);

    return {
      _id: getNextId(),
      _name: monitorTemplate.typeDescription() + ' monitor',
      _type: monitorTemplate.type(),
      _typedescription: monitorTemplate.typeDescription(),
      _disabled: 'false',
      node: this.getMonitorNodeList(cpnElement),
      declaration: [
        { _name: 'Predicate', ml: { _id: getNextId(), __text: monitorDefaults.defaultPredicate } },
        { _name: 'Observer', ml: { _id: getNextId(), __text: monitorDefaults.defaultObserver } },
        { _name: 'Init function', ml: { _id: getNextId(), __text: monitorDefaults.defaultInit } },
        { _name: 'Stop', ml: { _id: getNextId(), __text: monitorDefaults.defaultStop } },
      ],
      option: [
        { _name: 'Timed', _value: monitorDefaults.defaultTimed },
        { _name: 'Logging', _value: monitorDefaults.defaultLogging }
      ]
    };
  }

  createCpnMonitorWIF(cpnElement, monitorDefaults) {
    console.log('createCpnMonitorWIF(), cpnElement = ', cpnElement);
    const monitorTemplate = new WriteInFileMonitorTemplate();

    monitorDefaults = this.getMonitorDefaults(monitorDefaults, monitorTemplate);

    return {
      _id: getNextId(),
      _name: monitorTemplate.typeDescription() + ' monitor',
      _type: monitorTemplate.type(),
      _typedescription: monitorTemplate.typeDescription(),
      _disabled: 'false',
      node: this.getMonitorNodeList(cpnElement),
      declaration: [
        { _name: 'Predicate', ml: { _id: getNextId(), __text: monitorDefaults.defaultPredicate } },
        { _name: 'Observer', ml: { _id: getNextId(), __text: monitorDefaults.defaultObserver } },
        { _name: 'Init function', ml: { _id: getNextId(), __text: monitorDefaults.defaultInit } },
        { _name: 'Stop', ml: { _id: getNextId(), __text: monitorDefaults.defaultStop } },
      ],
      option: [
        { _name: 'Timed', _value: monitorDefaults.defaultTimed },
        { _name: 'Logging', _value: monitorDefaults.defaultLogging }
      ]
    };
  }

  createCpnMonitorMS(cpnElement, monitorDefaults) {
    console.log('createCpnMonitorMS(), cpnElement = ', cpnElement);
    const monitorTemplate = new MarkingSizeMonitorTemplate();

    monitorDefaults = this.getMonitorDefaults(monitorDefaults, monitorTemplate);

    return {
      _id: getNextId(),
      _name: monitorTemplate.typeDescription() + ' monitor (' + this.getShapeNames(cpnElement) + ')',
      _type: monitorTemplate.type(),
      _typedescription: monitorTemplate.typeDescription(),
      _disabled: 'false',
      node: this.getMonitorNodeList(cpnElement),
      option: [
        { _name: 'Timed', _value: monitorDefaults.defaultTimed },
        { _name: 'Logging', _value: monitorDefaults.defaultLogging }
      ]
    };
  }

  createCpnMonitorLLDC(cpnElement, monitorDefaults) {
    console.log('createCpnMonitorLLDC(), cpnElement = ', cpnElement);
    const monitorTemplate = new ListLengthDataCollectionMonitorTemplate();

    monitorDefaults = this.getMonitorDefaults(monitorDefaults, monitorTemplate);

    return {
      _id: getNextId(),
      _name: monitorTemplate.typeDescription() + ' monitor (' + this.getShapeNames(cpnElement) + ')',
      _type: monitorTemplate.type(),
      _typedescription: monitorTemplate.typeDescription(),
      _disabled: 'false',
      node: this.getMonitorNodeList(cpnElement),
      option: [
        { _name: 'Timed', _value: monitorDefaults.defaultTimed },
        { _name: 'Logging', _value: monitorDefaults.defaultLogging }
      ]
    };
  }


  createMonitorCTODC(cpnElement, monitorDefaults): any {
    console.log('createMonitorCTODC(), cpnElement = ', cpnElement);
    const monitorTemplate = new CountTransitionOccurrencesMonitorTemplate();

    monitorDefaults = this.getMonitorDefaults(monitorDefaults, monitorTemplate);

    return {
      _id: getNextId(),
      _name: monitorTemplate.typeDescription() + ' monitor (' + this.getShapeNames(cpnElement) + ')',
      _type: monitorTemplate.type(),
      _typedescription: monitorTemplate.typeDescription(),
      _disabled: 'false',
      node: this.getMonitorNodeList(cpnElement),
      option: [
        { _name: 'Timed', _value: monitorDefaults.defaultTimed },
        { _name: 'Logging', _value: monitorDefaults.defaultLogging }
      ]
    };
  }

  createCpnMonitorPCBP(cpnElement, monitorDefaults) {
    console.log('createCpnMonitorPCBP(), cpnElement = ', cpnElement);
    const monitorTemplate = new PlaceContentBreakPointMonitorTemplate();

    monitorDefaults = this.getMonitorDefaults(monitorDefaults, monitorTemplate);

    return {
      _id: getNextId(),
      _name: monitorTemplate.typeDescription() + ' monitor (' + this.getShapeNames(cpnElement) + ')',
      _type: monitorTemplate.type(),
      _typedescription: monitorTemplate.typeDescription(),
      _disabled: 'false',
      node: this.getMonitorNodeList(cpnElement),
      option: [
        { _name: 'Timed', _value: monitorDefaults.defaultTimed },
        { _name: 'Logging', _value: monitorDefaults.defaultLogging }
      ]
    };
  }

  createCpnMonitorTEBP(cpnElement, monitorDefaults) {
    console.log('createCpnMonitorTEBP(), cpnElement = ', cpnElement);
    const monitorTemplate = new TransitionEnabledBreakPointMonitorTemplate();

    monitorDefaults = this.getMonitorDefaults(monitorDefaults, monitorTemplate);

    return {
      _id: getNextId(),
      _name: monitorTemplate.typeDescription() + ' monitor (' + this.getShapeNames(cpnElement) + ')',
      _type: monitorTemplate.type(),
      _typedescription: monitorTemplate.typeDescription(),
      _disabled: 'false',
      node: this.getMonitorNodeList(cpnElement),
      option: [
        { _name: 'Timed', _value: monitorDefaults.defaultTimed },
        { _name: 'Logging', _value: monitorDefaults.defaultLogging }
      ]
    };
  }

  /**
   * Convert cpn declaration element to string
   * @param cpnElement - declaration element
   */
  cpnDeclarationToString(cpnDeclarationType, cpnElement) {
    let layout = '';

    switch (cpnDeclarationType) {
      case 'globref':
        layout = this.cpnGlobrefToString(cpnElement);
        break;
      case 'color':
        layout = this.cpnColorToString(cpnElement);
        break;
      case 'var':
        layout = this.cpnVarToString(cpnElement);
        break;
      case 'ml':
        layout = this.cpnMlToString(cpnElement);
        break;
      default:
        return cpnElement.layout || JSON.stringify(cpnElement);
    }

    return layout;
  }

  /**
   * Convert cpn globref element to string
   * @param cpnElement - color(colset) cpn element
   */
  cpnGlobrefToString(cpnElement) {
    const str = 'globref ' + cpnElement.id + ' = ' + cpnElement.ml + ';';
    return str;
  }

  /**
   * Convert cpn color(colset) element to string
   * @param cpnElement - color(colset) cpn element
   */
  cpnColorToString(cpnElement) {
    let str = 'colset ' + cpnElement.id;

    const color = cpnElement;
    if (color.layout) {
      str = color.layout;
    } else {
      if (color.alias && color.alias.id) {
        str += ' = ' + color.alias.id;
      } else if (color.list && color.list.id) {
        str += ' = list ' + color.list.id;
      } else if (color.product && color.product.id) {
        str += ' = product ';
        if (color.product.id instanceof Array) {
          for (let i = 0; i < color.product.id.length; i++) {
            str += i === 0 ? color.product.id[i] : ' * ' + color.product.id[i];
          }
        } else {
          str += color.product.id;
        }
      } else {
        str += ' = ' + color.id.toLowerCase();
      }
      if ('timed' in color) {
        str += ' timed';
      }
      str += ';';
    }

    return str;
  }

  /**
   * Convert cpn var element to string
   * @param cpnElement - var cpn element
   */
  cpnVarToString(cpnElement) {
    let str = 'var ' + cpnElement.id;

    if (cpnElement.layout) {
      str = cpnElement.layout;
    } else {
      str = 'var ' + cpnElement.id + ': ' + cpnElement.type.id + ';';
    }

    return str;
  }

  /**
   * Convert cpn globref element to string
   * @param cpnElement - color(colset) cpn element
   */
  cpnMlToString(cpnElement) {
    const str = cpnElement.__text || cpnElement.layout;
    return str;
  }

  /**
   * Convert cpn declaration element to string
   * @param cpnElement
   * @param type
   */
  cpnDeclarationElementToString(cpnElement, type) {
    switch (type) {
      case 'globref':
        return this.cpnGlobrefToString(cpnElement);
      case 'color':
        return this.cpnColorToString(cpnElement);
      case 'var':
        return this.cpnVarToString(cpnElement);
      case 'ml':
        return this.cpnMlToString(cpnElement);
    }
  }


  /**
   * Parse declaration type from string
   */
  parseDeclarationTypeFromString(str) {
    const parser = str.match('^\\S+');
    let declarationType = '';

    if (parser) {
      declarationType = parser[0];
    }

    return ['var', 'colset', 'globref', 'ml', 'val', 'fun', 'local'].includes(declarationType) ? declarationType : 'ml';
  }

  trimChars(str, c) {
    str = str.trim();
    var re = new RegExp("^[" + c + "]+|[" + c + "]+$", "g");
    return str.replace(re, "");
  }

  /**
   * Convert string to cpn declaration element
   * @param cpnElement
   * @param str
   */
  stringToCpnDeclarationElement(cpnElement, str) {

    let resultCpnType = 'ml';
    let resultCpnElement: any = { _id: cpnElement._id };

    // const parser = str.match('^\\S+');
    // console.log('stringToCpnDeclarationElement(), parser = ', parser);

    // str = str.trim();
    // str = this.trimChars(str, ';');

    let resultDeclarationType = this.parseDeclarationTypeFromString(str);
    if (!resultDeclarationType) {
      resultDeclarationType = 'ml';
    }

    switch (resultDeclarationType) {
      case 'var':
        resultCpnType = 'var';
        let splitLayoutArray;
        resultCpnElement.layout = str;

        str = this.trimChars(str, ';');
        str = str.replace('var', '');
        splitLayoutArray = str.trim().split(':');
        for (let i = 0; i < splitLayoutArray.length; i++) {
          splitLayoutArray[i] = splitLayoutArray[i].replace(/\s+/g, '').split(',');
        }
        resultCpnElement.id = splitLayoutArray[0];
        if (!resultCpnElement.type) {
          resultCpnElement.type = {};
        }
        if (splitLayoutArray[1]) {
          resultCpnElement.type.id = splitLayoutArray[1][0];
        }
        break;

      case 'colset':   // TODO: отрефакторить
        resultCpnType = 'color';
        // cpnElement.layout = str;
        str = str.replace('colset', '');
        splitLayoutArray = str.split('=');

        if (splitLayoutArray[1]) {
          splitLayoutArray[1] = splitLayoutArray[1].split(' ').filter(e => e.trim() !== '');
          let testElem = splitLayoutArray[1][0].replace(/\s+/g, '');
          for (const key of Object.keys(resultCpnElement)) {
            if (key !== '_id' && key !== 'layout') {
              delete resultCpnElement[key];
            }
          }
          if (splitLayoutArray[1][splitLayoutArray[1].length - 1].replace(';', '') === 'timed') {
            resultCpnElement.timed = '';
            splitLayoutArray[1].length = splitLayoutArray[1].length - 1;
          }
          if (testElem === 'product') {
            const productList = splitLayoutArray[1].slice(1).filter(e => e.trim() !== '*');
            for (const i in productList) {
              productList[i] = this.trimChars(productList[i], ';');
              productList[i] = this.trimChars(productList[i], '*');
            }

            resultCpnElement.id = splitLayoutArray[0].replace(/\s+/g, '');
            resultCpnElement.product = { id: productList.length === 1 ? productList[0] : productList };
          } else if (testElem === 'list') {
            const productList = splitLayoutArray[1].slice(1).filter(e => e.trim() !== '*');
            for (const i in productList) {
              productList[i] = this.trimChars(productList[i], ';');
              productList[i] = this.trimChars(productList[i], '*');
            }

            resultCpnElement.id = splitLayoutArray[0].replace(/\s+/g, '');
            resultCpnElement.list = { id: productList.length === 1 ? productList[0] : productList };
          } else {
            testElem = testElem.replace(/\s+/g, '').replace(';', '');
            splitLayoutArray[1][0] = splitLayoutArray[1][0].replace(/\s+/g, '').replace(';', '');

            // console.log('stringToCpnDeclarationElement(), testElem = ', testElem);
            // console.log('stringToCpnDeclarationElement(), splitLayoutArray = ', splitLayoutArray);

            if (testElem.toLowerCase() === splitLayoutArray[1][0].toLowerCase()) {
              resultCpnElement.id = splitLayoutArray[0].trim();
              resultCpnElement[testElem.toLowerCase()] = '';
            } else {
              resultCpnElement.id = splitLayoutArray[0].trim();
              resultCpnElement.alias = { id: testElem };
            }
          }
        }
        break;

      case 'globref':
        resultCpnType = 'globref';
        splitLayoutArray = str.split(' ').filter(e => e.trim() !== '' && e.trim() !== '=');
        resultCpnElement.id = splitLayoutArray[1].replace(/\s+/g, '').replace(';', '');
        resultCpnElement.ml = splitLayoutArray[2].replace(/\s+/g, '').replace(';', '');
        // cpnElement.layout = str;
        break;

      // case 'ml':
      // case 'val':
      // case 'fun':
      // case 'local':
      default:
        resultCpnType = 'ml';
        resultDeclarationType = 'ml';
        resultCpnElement.layout = str;
        resultCpnElement.__text = str;
        break;

    }

    // console.log('stringToCpnDeclarationElement(), cpnType = ', cpnType);
    // console.log('stringToCpnDeclarationElement(), declarationType = ', declarationType);
    // console.log('stringToCpnDeclarationElement(), cpnElement = ', cpnElement);

    return { cpnType: resultCpnType, declarationType: resultDeclarationType, cpnElement: resultCpnElement };
  }

  updateDeclaration(declarationCpnElement, declarationCpnType, parentBlockCpnElement, layout) {
    const originalLayout = layout;

    console.log('updateDeclaration(), layout = ', layout);
    console.log('updateDeclaration(), declarationCpnElement = ', JSON.stringify(declarationCpnElement));

    const oldCpnDeclarartionType = declarationCpnType;

    // parse declaration layout
    let result = parseDeclarartion(layout);

    if (result && result.cpnElement) {
      let newDeclaration = result.cpnElement;
      const newCpnDeclarartionType = result.cpnDeclarationType;

      console.log('onUpdate(), oldCpnDeclarartionType = ', oldCpnDeclarartionType);
      console.log('onUpdate(), newCpnDeclarartionType = ', newCpnDeclarartionType);

      this.copyDeclaration(newDeclaration, declarationCpnElement)

      // move declaration cpn element from old declaration group to new, if needed
      if (newCpnDeclarartionType !== oldCpnDeclarartionType) {
        this.removeCpnElement(parentBlockCpnElement, declarationCpnElement, oldCpnDeclarartionType);
        this.addCpnElement(parentBlockCpnElement, declarationCpnElement, newCpnDeclarartionType);
      }
    }
  }

  copyDeclaration(fromDeclaration, toDeclaration) {
    for (const key in toDeclaration) {
      if (key !== '_id') {
        delete toDeclaration[key];
      }
    }
    for (const key in fromDeclaration) {
      if (key !== '_id') {
        toDeclaration[key] = fromDeclaration[key];
      }
    }
  }



  /**
   * Get all pages list
   */
  getAllPages() {
    const cpn = this.getCpn();
    if (!cpn) {
      return [];
    }
    const page = this.getCpn().page;
    if (!page) {
      return [];
    }
    return page instanceof Array ? page : [page];
  }

  getRootPages() {
    const subpageIdList = this.getSubPageIds();
    return this.getAllPages().filter(p => p && !subpageIdList.includes(p._id));
  }

  getSubPageIds() {
    const pageIdList = [];
    for (const t of this.getAllTrans()) {
      if (t && t.subst && t.subst._subpage) {
        pageIdList.push(t.subst._subpage);
      }
    }
    return pageIdList;
  }

  /**
   * Get page object from model by id
   * @param pageId
   */
  public getPageById(pageId) {
    return this.getAllPages().find(page => page && page._id === pageId);
  }

  /**
   * Checks if page is subpage
   * @param pageId - page id
   */
  public isSubpage(pageId) {
    const transList = this.getAllTrans().filter((trans) => { return trans.subst && trans.subst._subpage === pageId });
    // console.log(this.constructor.name, 'isSubpage(), pageId, transList = ', pageId, transList)
    return (transList && transList.length > 0) ? true : false;
  }

  /**
   * Find page by place or transitions id
   * @param id - place or transition id
   */
  public getPageByElementId(id) {
    const pages = this.getAllPages();

    for (const page of pages) {
      // search in transitions
      for (const t of nodeToArray(page.trans)) {
        if (t._id === id) {
          return page;
        }
      }
      // search in places
      for (const p of nodeToArray(page.place)) {
        if (p._id === id) {
          return page;
        }
      }
      // search in arcs
      for (const a of nodeToArray(page.arc)) {
        if (a._id === id) {
          return page;
        }
      }
    }

    return undefined;
  }

  /**
   * Find place or transitions by id
   * @param id - place or transition id
   */
  public getPlaceOrTransitionById(id) {
    const pages = this.getAllPages();

    for (const page of pages) {
      // search in transitions
      for (const t of nodeToArray(page.trans)) {
        if (t._id === id) {
          return { element: t, type: 'Transition' };
        }
      }
      // search in places
      for (const p of nodeToArray(page.place)) {
        if (p._id === id) {
          return { element: p, type: 'Place' };
        }
      }
    }

    return undefined;
  }

  public getTransById(id) {
    const pages = this.getAllPages();

    for (const page of pages) {
      // search in trans
      for (const trans of nodeToArray(page.trans)) {
        if (trans._id === id) {
          return trans;
        }
      }
    }

    return undefined;
  }

  public getArcById(id) {
    const pages = this.getAllPages();

    for (const page of pages) {
      // search in arcs
      for (const arc of nodeToArray(page.arc)) {
        if (arc._id === id) {
          return arc;
        }
      }
    }

    return undefined;
  }

  public getTransitionIncomeArcs(transId) {
    const arcs = [];
    const pages = this.getAllPages();
    for (const page of pages) {
      // search in arcs
      for (const arc of nodeToArray(page.arc)) {
        if (arc.transend._idref === transId && ['PtoT', 'BOTHDIR'].includes(arc._orientation)) {
          arcs.push(arc);
        }
      }
    }
    return arcs;
  }

  public getTransitionOutcomeArcs(transId, placeId = undefined) {
    const arcs = [];
    const pages = this.getAllPages();
    for (const page of pages) {
      // search in arcs
      for (const arc of nodeToArray(page.arc)) {
        if (arc.transend._idref === transId
          && (placeId === undefined || arc.placeend._idref === placeId)
          && ['TtoP', 'BOTHDIR'].includes(arc._orientation)) {
          arcs.push(arc);
        }
      }
    }
    return arcs;
  }


  /**
   * Get page id by name
   * @param pageName
   */
  getPageId(pageName) {
    const pageList = this.getAllPages();
    for (const p of pageList) {
      if (p.pageattr._name === pageName) {
        return p._id;
      }
    }
    return undefined;
  }

  /**
   * Get all places for model
   */
  getAllPlaces() {
    const allPlaces = [];
    const allPages = this.getAllPages();
    if (allPages && allPages.length > 0) {
      for (const page of allPages) {
        if (page) {
          const place = page.place instanceof Array ? page.place : [page.place];
          for (const p of place) {
            if (p) {
              allPlaces.push(p);
            }
          }
        }
      }
    }

    return allPlaces;
  }


  /**
   * Get all trans for model
   */
  getAllTrans() {
    const allTrans = [];
    const allPages = this.getAllPages();
    if (allPages && allPages.length > 0) {
      for (const page of allPages) {
        if (page) {
          const trans = page.trans instanceof Array ? page.trans : [page.trans];
          for (const t of trans) {
            if (t) {
              allTrans.push(t);
            }
          }
        }
      }
    }

    return allTrans;
  }


  /**
   * Get all acrs for model
   */
  getAllArcs() {
    const allArcs = [];

    for (const page of this.getAllPages()) {
      const arcs = page.arc instanceof Array ? page.arc : [page.arc];
      for (const a of arcs) {
        if (a) {
          allArcs.push(a);
        }
      }
    }

    return allArcs;
  }

  /**
   * Get all arcs, wich are connecting elements
   * @param cpnElements - array of elements
   */
  getArcsForElements(cpnElements) {
    const cpnElementIds = [];
    for (const e of cpnElements) {
      if (e._id) {
        cpnElementIds.push(e._id);
      }
    }
    if (cpnElementIds.length < 1) {
      return;
    }

    const arcs = [];
    for (const arc of this.getAllArcs()) {
      if (arc) {
        if (cpnElementIds.includes(arc.placeend._idref)
          && cpnElementIds.includes(arc.transend._idref)) {
          arcs.push(arc);
        }
      }
    }
    return arcs;
  }

  /**
   * Get all arcs, wich are connecting with elements but not between them
   * @param cpnElements - array of elements
   */
  getExternalArcsForElements(cpnElements) {
    const cpnElementIds = [];
    for (const e of cpnElements) {
      if (e._id) {
        cpnElementIds.push(e._id);
      }
    }
    if (cpnElementIds.length < 1) {
      return;
    }

    const arcs = [];
    for (const arc of this.getAllArcs()) {
      if (arc) {
        if (
          (cpnElementIds.includes(arc.placeend._idref)
            && !cpnElementIds.includes(arc.transend._idref))
          ||
          (!cpnElementIds.includes(arc.placeend._idref)
            && cpnElementIds.includes(arc.transend._idref))
        ) {
          arcs.push(arc);
        }
      }
    }
    return arcs;
  }


  /**
   * Move elements from page to page
   */
  moveElements(fromPageId, toPageId, elements) {

    const fromPage = this.getPageById(fromPageId);
    const toPage = this.getPageById(toPageId);

    if (!fromPage || !toPage) {
      return;
    }

    for (const element of elements) {

      // place element
      if (element.ellipse) {

        // remove place from old page
        this.removeCpnElement(fromPage, element, 'place');
        // add place to new page
        this.addCpnElement(toPage, element, 'place');

      } else

        // transition element
        if (element.box) {

          // remove trans from old page
          this.removeCpnElement(fromPage, element, 'trans');
          // add trans to new page
          this.addCpnElement(toPage, element, 'trans');

        } else

          // arc element
          if (element.transend) {

            // remove arc from old page
            this.removeCpnElement(fromPage, element, 'arc');
            // add arc to new page
            this.addCpnElement(toPage, element, 'arc');

          }

    }
  }



  /**
   * Get next page name
   */
  getNextPageName(pageName) {
    let n = 1;
    let newPageName = pageName ? pageName : this.settings.appSettings['page'] + ' ' + n;

    for (const page of this.getAllPages()) {
      if (newPageName === page.pageattr._name) {
        if (newPageName.includes(n.toString())) {
          newPageName = newPageName.replace(n.toString(), (++n).toString());
        } else {
          newPageName = newPageName + ' ' + n;
        }
      }
    }

    return newPageName;
  }

  /**
   * Create subpage for transition
   * @param transCpnElement
   * @param newPageName
   * @param newPageId
   */
  createSubpage(transCpnElement, newPageName, newPageId) {
    const pageName = this.getNextPageName(newPageName);
    const pageId = newPageId ? newPageId : getNextId();

    const subpageCpnElement = this.createCpnPage(pageName, pageId);
    transCpnElement.subst.subpageinfo._name = subpageCpnElement.pageattr._name;
    transCpnElement.subst._subpage = subpageCpnElement._id;

    this.createNewPage(subpageCpnElement);

    return subpageCpnElement;
  }

  /**
   * Create port object for place
   * @param cpnElement
   * @param portType
   */
  createPortObject(cpnElement, portType) {

    if (!cpnElement || !cpnElement.ellipse) {
      return undefined;
    }

    const x = Number(cpnElement.posattr._x);
    const y = Number(cpnElement.posattr._y);
    const w = Number(cpnElement.ellipse._w);
    const h = Number(cpnElement.ellipse._h);

    return {
      fillattr: { _colour: 'White', _pattern: 'Solid', _filled: 'false' },
      lineattr: { _colour: 'Black', _thick: '0', _type: 'Solid' },
      posattr: { _x: (x).toString(), _y: (y - h / 2).toString() },
      textattr: { _colour: 'Black', _bold: 'false' },
      text: portType,
      _id: cpnElement._id + 'e',
      _type: portType === 'In/Out' ? 'I/O' : portType
    };
  }

  /**
   * Create subst object for transition
   * @param cpnElement
   * @param name
   * @param pageId
   */
  createSubstObject(cpnElement, name, pageId) {

    if (!cpnElement || !cpnElement.box) {
      return undefined;
    }

    const x = Number(cpnElement.posattr._x);
    const y = Number(cpnElement.posattr._y);
    const w = Number(cpnElement.box._w);
    const h = Number(cpnElement.box._h);

    return {
      subpageinfo: {
        fillattr: { _colour: 'White', _pattern: 'Solid', _filled: 'false' },
        lineattr: { _colour: 'Black', _thick: '0', _type: 'Solid' },
        posattr: { _x: (x).toString(), _y: (y - h / 2).toString() },
        textattr: { _colour: 'Black', _bold: 'false' },
        _id: cpnElement._id + 'e',
        _name: name
      },
      _portsock: '',
      _subpage: pageId
    };
  }

  /**
   * Find end place and transition for arc
   */
  getArcEnds(cpnElement) {
    const allPlaces = this.getAllPlaces();
    const allTrans = this.getAllTrans();

    const placeEnd = allPlaces.find(p => p._id === cpnElement.placeend._idref);
    const transEnd = allTrans.find(t => t._id === cpnElement.transend._idref);

    return { place: placeEnd, trans: transEnd, orient: cpnElement._orientation };
  }

  /**
   * Getting all port places for transition
   * @param cpnElement
   * @param transEnd
   */
  getAllPorts(cpnElement, transEnd) {
    const ports = [];
    // console.log('getAllPorts(), transEnd = ', transEnd);

    if (transEnd.subst) {
      const page = this.getPageById(transEnd.subst._subpage);
      if (page && page.place) {
        // console.log('getAllPorts(), page = ', page);

        for (const place of page.place) {
          // console.log('getAllPorts(), place = ', place);
          // console.log('getAllPorts(), place.port = ', place.port);
          if (place.port
            && (place.port._type === 'I/O'
              || place.port._type === (cpnElement._orientation === 'TtoP' ? 'Out' : 'In'))) {
            ports.push(place);
          }
        }
      }
    }
    return ports;
  }

  /**
   * Get place name by id
   */
  getPortNameById(pageId, id) {
    const page = this.getPageById(pageId);
    if (page) {
      const port = page.place.find(e => e._id === id);
      return port.text;
    }
  }

  /**
   * Get port place id by name
   * @param pageId
   * @param text
   * @param orient
   */
  getPortIdByName(pageId, text, orient) {
    const page = this.getPageById(pageId);
    if (page && text !== '') {
      const port = page.place.find(e => e.text === text && (e.port._type === 'I/O' || e.port._type === (orient === 'TtoP' ? 'Out' : 'In')));
      return port._id;
    } else {
      return undefined;
    }
  }

  /**
   * Create new declaration
   *
   * @param parentBlock
   * @param declaration
   * @param declarationType
   */
  newDeclaration(parentBlock, declarationType) {
    if (parentBlock && declarationType) {
      let parentCpnElement = parentBlock;

      let newLayout = this.settings.appSettings['declaration'];
      switch (declarationType) {
        case 'globref':
          newLayout = this.settings.appSettings['globref'];
          break;
        case 'color':
          newLayout = this.settings.appSettings['color'];
          break;
        case 'var':
          newLayout = this.settings.appSettings['var'];
          break;
        case 'fun':
          newLayout = this.settings.appSettings['fun'];
          break;
      }

      if (newLayout) {
        // parse declaration layout
        let result = parseDeclarartion(newLayout);
        // console.log(this.constructor.name, 'onNewDeclaration(), result = ', result);

        if (result && result.cpnElement) {
          let newDeclaration = result.cpnElement;
          let newCpnDeclarartionType = result.cpnDeclarationType;

          // set new id value
          newDeclaration._id = getNextId();

          // add declaration cpn element to declaration group
          this.addCpnElement(parentCpnElement, newDeclaration, newCpnDeclarartionType);

          return newDeclaration;
        }
      }
    }
    return undefined;
  }

  /**
   * Add cpn element to parent
   * @param cpnParentElement
   * @param cpnElement
   * @param cpnType - new cpn type where cpn element should be placed
   */
  addCpnElement(cpnParentElement, cpnElement, cpnType, insertAfterElement = undefined) {
    try {
      if (!cpnParentElement) {
        throw 'Undefined cpnParentElement element';
      }
      if (!cpnElement) {
        throw 'Undefined cpnElement element';
      }
      if (!cpnType) {
        throw 'Undefined cpnType';
      }

      const nodeList = nodeToArray(cpnParentElement[cpnType]);
      nodeList.push(cpnElement);

      cpnParentElement[cpnType] = nodeList.length === 1 ? nodeList[0] : nodeList;
    } catch (ex) {
      console.error(this.constructor.name, 'addCpnElement(). ERROR: ', ex);
    }

    console.log(this.constructor.name, 'addCpnElement(), cpnParentElement, cpnElement = ', cpnParentElement, cpnElement);
  }

  /**
   * Update cpn element in it's parent
   * @param cpnParentElement
   * @param cpnElement
   * @param cpnType - new cpn type where cpn element should be placed
   */
  updateCpnElement(cpnParentElement, cpnElement, cpnType) {
    try {
      if (!cpnParentElement) {
        throw 'Undefined cpnParentElement element';
      }
      if (!cpnElement) {
        throw 'Undefined cpnElement element';
      }
      if (!cpnType) {
        throw 'Undefined cpnType';
      }

      if (cpnParentElement[cpnType] instanceof Array) {
        for (let i = 0; i < cpnParentElement[cpnType].length; i++) {
          if (cpnParentElement[cpnType][i]._id === cpnElement._id) {
            cpnParentElement[cpnType][i] = cpnElement;
          }
        }
      } else {
        cpnParentElement[cpnType] = cpnElement;
      }
    } catch (ex) {
      console.error(this.constructor.name, 'updateCpnElement(). ERROR: ', ex);
    }
  }

  /**
   * Remove cpn element from it's parent
   * @param cpnParentElement
   * @param cpnElement
   * @param cpnType - old cpn type from where cpn element should be removed
   */
  removeCpnElement(cpnParentElement, cpnElement, cpnType) {
    try {
      if (!cpnParentElement) {
        throw 'Undefined cpnParentElement element';
      }
      if (!cpnElement) {
        throw 'Undefined cpnElement element';
      }
      if (!cpnType) {
        throw 'Undefined cpnType';
      }
      if (!cpnParentElement[cpnType]) {
        throw 'Undefined cpnParentElement[cpnType] element';
      }

      let nodeList = nodeToArray(cpnParentElement[cpnType]);
      nodeList = nodeList.filter((e) => { return e._id !== cpnElement._id; });

      if (!nodeList || nodeList.length === 0) {
        delete cpnParentElement[cpnType];
      } else {
        cpnParentElement[cpnType] = nodeList.length === 1 ? nodeList[0] : nodeList;
      }
    } catch (ex) {
      console.error(this.constructor.name, 'removeCpnElement(). ERROR: ', ex);
    }
  }

  /**
   * Move cpn element up or down in it's parent array
   * @param cpnParentElement
   * @param cpnElement
   * @param cpnType
   * @param direction - direction how to move: ['up','down']
   */
  moveCpnElement(cpnParentElement, cpnElement, cpnType, direction) {
    try {
      if (!cpnParentElement) {
        throw 'Undefined cpnParentElement element';
      }
      if (!cpnElement) {
        throw 'Undefined cpnElement element';
      }
      if (!cpnType) {
        throw 'Undefined cpnType';
      }
      if (!cpnParentElement[cpnType]) {
        throw 'Undefined cpnParentElement[cpnType] element';
      }
      if (!direction || !['up', 'down'].includes(direction)) {
        throw 'Direction should be "up" or "down"';
      }

      let fromIndex = 0, nodeList = nodeToArray(cpnParentElement[cpnType]);

      for (let i = 0; i < nodeList.length; i++) {
        if (nodeList[i]._id === cpnElement._id) {
          fromIndex = i;
          break;
        }
      }
      let toIndex = undefined;
      switch (direction) {
        case 'up': {
          toIndex = fromIndex - 1;
        } break;
        case 'down': {
          toIndex = fromIndex + 1;
        } break;
      }
      console.log(this.constructor.name, 'moveCpnElement(). fromIndex, toIndex = ', fromIndex, toIndex);
      if (toIndex !== undefined && toIndex >= 0 && toIndex < nodeList.length) {
        arrayMove(nodeList, fromIndex, toIndex);
      }

      cpnParentElement[cpnType] = nodeList.length === 1 ? nodeList[0] : nodeList;
    } catch (ex) {
      console.error(this.constructor.name, 'moveUpCpnElement(). ERROR: ', ex);
    }
  }


  /**
   * Returns monitor node list with names of elements and pages
   * @param cpnElement = monitor cpn element
   */
  getMonitorNodeNamesList(cpnElement) {
    console.log('getMonitorNodeNamesList(), cpnElement = ', cpnElement);

    if (!cpnElement || !cpnElement.node) {
      return [];
    }

    const nodes = nodeToArray(cpnElement.node);

    const nodeList = [];
    for (const node of nodes) {
      const page = this.getPageByElementId(node._idref);
      const element = this.getPlaceOrTransitionById(node._idref);
      if (element) {
        nodeList.push({
          page: page,
          element: element.element,
          elementType: element.type,
          instanceId: node._pageinstanceidref
        });
      }
    }
    return nodeList;
  }



}



