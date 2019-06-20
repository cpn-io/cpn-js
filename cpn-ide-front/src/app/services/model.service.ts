import { Injectable } from '@angular/core';
import { EventService } from './event.service';
import { Message } from '../common/message';
import { AccessCpnService } from './access-cpn.service';
import { SettingsService } from '../services/settings.service';
import { ValidationService } from './validation.service';
import { keyframes } from '@angular/animations';

import {
  getNextId,
  getDefText
} from '../../lib/cpn-js/features/modeling/CpnElementFactory';


/**
 * Common service for getting access to project data from all application
 */
@Injectable()
export class ModelService {

  private isLoaded = false;

  public project = undefined;
  public projectData = undefined;
  public projectName = '';

  private backupModel = [];
  private redoBackupModel;
  private modelCase = [];
  subPages;
  pageId;
  countNewItems = 0;
  labelsEntry = {
    trans: ['time', 'code', 'priority', 'edit', 'cond'],
    place: ['initmark', 'edit', 'type'],
    arc: ['annot'],
    label: ['edit']
  };
  paramsTypes = ['ml', 'color', 'var', 'globref'];


  undoHistory = [];
  redoHistory = [];
  skipBackup = false;

  backupBusy = false;
  undoRedoBusy = false;

  constructor(private eventService: EventService,
    private accessCpnService: AccessCpnService,
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
      }
    });
    this.eventService.on(Message.MODEL_RELOAD, () => {
      this.loadProject(this.getProject());
    });

    this.eventService.on(Message.PAGE_OPEN, (data) => {
      this.subPages = data.subPages;
      this.pageId = data.pageObject._id;
    });

    this.eventService.on(Message.MODEL_UPDATE, (data) => {
      this.updateModel(data);
    });

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

  saveBackupBak(_model, _pageId = undefined) {
  }

  saveBackup(model) {
    if (this.backupBusy) {
      return;
    }
    this.backupBusy = true;

    // console.log('BACKUP, saveBackup(), model, this.skipBackup = ', model, this.skipBackup);

    if (Object.keys(model).length > 0) {
      // if (!this.skipBackup) {
      this.undoHistory.push(model);
      this.redoHistory = [];

      if (this.undoHistory.length > 100) {
        this.undoHistory.splice(0, 1);
      }

      console.log('BACKUP, saveBackup2(), this.modelHistory.length = ', this.undoHistory.length);
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

    this.eventService.send(Message.MODEL_CHANGED);
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

    this.eventService.send(Message.MODEL_CHANGED);
  }

  getLabelEntry() {
    return this.labelsEntry;
  }

  getModelCase(labelType) {
    return this.modelCase[labelType];
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
    return cpnet;
  }


  //// ChangeModelActions

  public deleteSubPageTrans(pageId) {
    const allTrans = this.getAllTrans();

    // console.log(this.constructor.name, 'deleteSubPageTrans(), pageId = ', pageId);

    if (allTrans) {
      for (const trans of allTrans) {
        // console.log(this.constructor.name, 'deleteSubPageTrans(), trans (0) = ', trans);

        if (trans && trans.subst && trans.subst._subpage === pageId) {
          // console.log(this.constructor.name, 'deleteSubPageTrans(), trans (1) = ', trans);

          this.deleteInstance(trans._id);
          delete trans.subst;

          // console.log(this.constructor.name, 'deleteSubPageTrans(), trans (1) = ', trans);
        }
      }
    }
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

    this.saveBackupBak(this.projectData, pageId);

    const jsonPageObject = this.getPageById(pageId);
    console.log('addElementJsonOnPage(), jsonPageObject = ', jsonPageObject);

    if (jsonPageObject[this.modelCase[type]] instanceof Array) {
      jsonPageObject[this.modelCase[type]].push(cpnElement);
    } else {
      if (jsonPageObject[this.modelCase[type]]) {
        const currentElem = jsonPageObject[this.modelCase[type]];
        jsonPageObject[this.modelCase[type]] = [currentElem, cpnElement];
      } else {
        jsonPageObject[this.modelCase[type]] = [cpnElement];
      }
    }

    if (cpnElement.subst) {
      this.updateInstances();
    }

    this.eventService.send(Message.MODEL_CHANGED);
  }

  instaceForTransition(id, isRoot) {
    return !isRoot ? { _id: getNextId(), _trans: id } : { _id: getNextId(), _page: id };
  }

  /**
   * Correct Place types. It should be UNIT by default if empty
   */
  updatePlaceTypes() {
    const defPlaceType = this.settings.getAppSettings()['type'];

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

    // const binders = {
    //   cpnbinder: {
    //     sheets: {
    //       cpnsheet: {
    //         zorder: {
    //           position: {
    //             _value: '0'
    //           }
    //         },
    //         _id: getNextId(),
    //         _panx: '0.000000',
    //         _pany: '0.000000',
    //         _zoom: '1.000000',
    //         _instance: rootInstanceId
    //       }
    //     },
    //     zorder: {
    //       position: {
    //         _value: '0'
    //       }
    //     },
    //     _id: getNextId(),
    //     _x: '300',
    //     _y: '50',
    //     _width: '1200',
    //     _height: '600'
    //   }
    // };

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
  }

  getSubInstances(page) {
    console.log(this.constructor.name, 'getSubInstances(), page = ', page);

    if (!page) {
      return undefined;
    }

    const instances = [];

    if (page.trans) {
      const transArray = page.trans instanceof Array ? page.trans : [page.trans];
      for (const t of transArray) {
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
    }

    if (instances.length === 0) {
      return undefined;
    }
    if (instances.length === 1) {
      return instances[0];
    }
    return instances;
  }

  searchPageForInstace(instance, objId, self, parent) {
    if (instance._trans === objId || instance._page === objId) {
      return { inst: instance, parent: parent };
    } else if (instance.instance) {
      if (instance.instance instanceof Array) {
        return instance.instance.map(function (e) {
          if (self) { return self.searchPageForInstace(e, objId, self, instance); } else { return undefined; }
        }).filter(function (element) {
          return element !== undefined;
        })[0];
      } else { return self.searchPageForInstace(instance.instance, objId, self, instance); }
    }
  }

  deleteInstance(objId) {
    const cpn = this.getCpn();
    const self = this;
    const entry = this.searchPageForInstace(cpn.instances, objId, self, undefined);
    if (entry && entry.inst) {
      let forDelete;
      if (entry.parent) {
        forDelete = entry.parent;
      } else {
        if (cpn.instances && cpn.instances.instance) {
          forDelete = cpn.instances;
        }
      }
      if ((forDelete.instance instanceof Array) && forDelete.instance.length > 1) {
        forDelete.instance = forDelete.instance.filter(e => e._id !== entry.inst._id);
      } else {
        delete forDelete.instance;
      }
    }
  }

  // send changes

  changeSubPageTransitionName(subpage) {
    this.eventService.send(Message.CHANGE_NAME_PAGE, { id: subpage.subpageid, name: subpage.name, changedElement: 'tran' });
  }


  moveNonModelJsonElement(element, parent, target, index, type) {

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
      const swapSubPageTrans = (tran, subPageTrans) => {
        if (tran.subst && tran.subst._subpage === element._id) {
          subPageTrans = Object.assign({}, tran);
          delete tran['subst'];
          if (target.trans) {
            if (target.trans instanceof Array) {
              subPageTrans._id = getNextId();
              target.trans.push(subPageTrans);
            } else {
              target.trans = [subPageTrans, target.trans];
            }
          } else {
            target.trans = [subPageTrans];
          }
        }
      };
      const subPageTrans = {};
      if (parent) {
        if (parent.trans instanceof Array) {
          for (let i = 0; i < parent.trans.length; i++) {
            swapSubPageTrans(parent.trans[i], subPageTrans);
            if (subPageTrans) {
              break;
            }
          }
        } else {
          swapSubPageTrans(parent.trans, subPageTrans);
        }
      }

      this.eventService.send(Message.SUBPAGE_CREATE, {
        name: element.pageattr._name,
        id: element._id,
        parentid: target._id,
        event: event,
        state: undefined, // this.treeComponent.treeModel.getState(),
        object: subPageTrans
      });

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


  applyPageChanges(pageId, _placeShapes, _textRenderer, _transShapes, _arcShapes) {
    this.saveBackupBak(this.projectData, pageId);

    const page = this.getPageById(pageId);

    // this.eventService.send(Message.MODEL_UPDATE, {pageObject: page});
    return page;
  }


  changeLabelText(label, text, pageId) {
    this.saveBackupBak(this.projectData, pageId);
    if (label && label.text) {
      label.text.__text = text;
    }
  }

  changePageName(pageId, name) {
    this.saveBackupBak(this.projectData, pageId);
    const changedPage = this.getPageById(pageId);
    if (changedPage) {
      changedPage.pageattr._name = name;
    }
  }

  createNewPage(page) {
    this.saveBackupBak(this.projectData, page._id);

    const cpnet = this.getCpn();

    if (cpnet.page instanceof Array) {
      cpnet.page.push(page);
    } else {
      cpnet.page = [cpnet.page, page];
    }

    this.updateInstances();
  }

  deletePage(pageId) {
    this.saveBackupBak(this.projectData, pageId);
    if (this.projectData.workspaceElements.cpnet.page) {
      if (!(this.projectData.workspaceElements.cpnet.page instanceof Array)) {
        this.projectData.workspaceElements.cpnet.page = [this.projectData.workspaceElements.cpnet.page];
      }
      this.projectData.workspaceElements.cpnet.page = this.projectData.workspaceElements.cpnet.page.filter(x => x._id !== pageId);
    }

    this.updateInstances();
  }

  updateModel(updatedData) {
    this.saveBackupBak(this.projectData, undefined);
    const project = this.projectData;
    if (project.workspaceElements.cpnet.page.length) {
      for (let page of project.workspaceElements.cpnet.page) {
        if (page.pageattr._name === updatedData.pageObject.pageattr._name) {
          page = updatedData.pageObject;

          this.eventService.send(Message.XML_UPDATE, { project: { data: project, name: this.projectName } });
        }
      }
    } else {
      let page = project.workspaceElements.cpnet.page;
      if (page.pageattr._name === updatedData.pageObject.pageattr._name) {
        page = updatedData.pageObject;

        this.eventService.send(Message.XML_UPDATE, { project: { data: project, name: this.projectName } });
      }
    }
  }


  createNewBlock(block, targetBlock) {
    this.saveBackupBak(this.projectData, undefined);
    if (targetBlock) {
      if (targetBlock.block && targetBlock.block instanceof Array) {
        targetBlock.block.push(block);
      } else {
        if (targetBlock.block) {
          targetBlock.block = [targetBlock.block];
        } else {
          targetBlock.block = [];
        }
        targetBlock.block.push(block);
      }
    } else {
      this.getCpn().globbox.block.push(block);
    }
  }


  clearDefaultLabelValues(pageId) {
    const page = this.getPageById(pageId);
    for (const entry of ['place', 'trans', 'arc']) {
      if (page[entry] instanceof Array) {
        for (const jsonElem of page[entry]) {
          for (const labelType of this.labelsEntry[entry]) {
            if (jsonElem[labelType]
              && jsonElem[labelType].text
              && jsonElem[labelType].text.__text
              && Object.values(this.settings.getAppSettings()).includes(jsonElem[labelType].text.__text)) {
              jsonElem[labelType].text.__text = null;
            }
          }
        }
      } else {
        for (const labelType of this.labelsEntry[entry]) {
          if (page[entry]
            && page[entry][labelType]
            && page[entry][labelType].text
            && page[entry][labelType].text.__text
            && Object.values(this.settings.getAppSettings()).includes(page[entry][labelType].text.__text)) {
            page[entry][labelType].text.__text = null;
          }
        }
      }
    }
  }


  deleteBlock(id) {
    this.saveBackupBak(this.projectData, undefined);
    const cpnet = this.getCpn();
    cpnet.globbox.block = cpnet.globbox.block.filter(e => e.id !== id);
  }

  deleteElementInBlock(block, elementType, id) {
    this.saveBackupBak(this.projectData, undefined);
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
    // this.saveBackup(this.projectData, undefined);
    // //blcok[elementType] = blcok[elementType].filter(elem => elem._id !== id);
    // if (!(block[elementType] instanceof Array)){
    //   block[elementType] = [block[elementType]];
    // }
    // for (var i = 0; i < block[elementType].length; i++) {
    //   if (block[elementType][i]._id === id) {
    //     block[elementType].splice(i, 1);
    //     if(block[elementType].length === 0) delete block[elementType];
    //   }
    // }
  }

  deleteMonitorBlock(id) {
    this.saveBackupBak(this.projectData, undefined);
    const cpnet = this.getCpn();
    cpnet.monitorblock.monitor = cpnet.monitorblock.monitor.filter(e => e._id !== id);
  }

  addItemToBlock(block, elementGroup): any {
    this.saveBackupBak(this.projectData, undefined);
    let newNode;
    if (!block[elementGroup]) {
      newNode = this.newElemetn(elementGroup);
      block[elementGroup] = [newNode];
      ////// create new elemenetType with
    } else {
      newNode = this.newElemetn(elementGroup);
      block[elementGroup].push(newNode);
    }
    return newNode;
  }

  newElemetn(elementType): any {
    this.saveBackupBak(this.projectData, undefined);
    switch (elementType) {
      case 'var':
        return {
          id: this.settings.getAppSettings()[elementType] + (++this.countNewItems),
          type: { id: this.settings.getAppSettings()[elementType] },
          _id: getNextId()
        };
        break;
      case 'color':
        return {
          id: this.settings.getAppSettings()[elementType] + (++this.countNewItems),
          timed: '',
          name: this.settings.getAppSettings()[elementType],
          _id: getNextId()
        };
        break;
      case 'ml':
        return {
          _id: getNextId(),
          __text: this.settings.getAppSettings()[elementType], toString() {
            return (this.__text != null ? this.__text : '');
          }
        };
        break;
      case 'globref':
        return {
          id: this.settings.getAppSettings()[elementType] + (++this.countNewItems),
          ml: this.settings.getAppSettings()[elementType],
          _id: getNextId()
        };
        break;
      default:

    }
  }


  /**
   * Parse variables Layout string and create object this variable
   * @param layoutStr - declaration string
   * @param cpnElement - changing variable object
   * @param blockType - type variable (color, var, ml, gkobref)
   */
  parseVariableLayout(layoutStr, cpnElement, blockType) {
    this.saveBackupBak(this.projectData, undefined);
    switch (blockType) {
      case 'var':
        let splitLayoutArray;
        cpnElement.layout = blockType + ' ' + layoutStr;
        layoutStr = layoutStr.replace('var', '');
        splitLayoutArray = layoutStr.trim().split(':');
        for (let i = 0; i < splitLayoutArray.length; i++) {
          splitLayoutArray[i] = splitLayoutArray[i].replace(/\s+/g, '').split(',');
        }
        cpnElement.id = splitLayoutArray[0];
        cpnElement.type.id = splitLayoutArray[1][0];
        break;
      case 'ml':
        cpnElement.layout = layoutStr;
        cpnElement.__text = layoutStr;
        break;
      case 'color':   // *****отрефакторить*****
        cpnElement.layout = layoutStr;
        layoutStr = layoutStr.replace('colset', '');
        splitLayoutArray = layoutStr.split('=');
        splitLayoutArray[1] = splitLayoutArray[1].split(' ').filter(e => e.trim() !== '');
        let testElem = splitLayoutArray[1][0].replace(/\s+/g, '');
        for (const key of Object.keys(cpnElement)) {
          if (key !== '_id' && key !== 'layout') {
            delete cpnElement[key];
          }
        }
        if (splitLayoutArray[1][splitLayoutArray[1].length - 1].replace(';', '') === 'timed') {
          cpnElement.timed = '';
          splitLayoutArray[1].length = splitLayoutArray[1].length - 1;
        }
        if (testElem === 'product') {
          const productList = splitLayoutArray[1].slice(1).filter(e => e.trim() !== '*');
          cpnElement.id = splitLayoutArray[0].replace(/\s+/g, '');
          cpnElement.product = { id: productList };
        } else if (testElem === 'list') {
          const productList = splitLayoutArray[1].slice(1).filter(e => e.trim() !== '*');
          cpnElement.id = splitLayoutArray[0].replace(/\s+/g, '');
          cpnElement.list = { id: productList };
        } else {
          testElem = testElem.replace(/\s+/g, '').replace(';', '');
          splitLayoutArray[0] = splitLayoutArray[0].replace(/\s+/g, '').replace(';', '');
          if (testElem.toLowerCase() === splitLayoutArray[0].toLowerCase()) {
            cpnElement.id = splitLayoutArray[0];
            cpnElement[testElem.toLowerCase()] = '';
          } else {
            cpnElement.id = splitLayoutArray[0];
            cpnElement.alias = { id: testElem };
          }
        }
        break;
      case 'globref':
        splitLayoutArray = layoutStr.split(' ').filter(e => e.trim() !== '' && e.trim() !== '=');
        cpnElement.id = splitLayoutArray[1].replace(/\s+/g, '').replace(';', '');
        cpnElement.ml = splitLayoutArray[2].replace(/\s+/g, '').replace(';', '');
        cpnElement.layout = blockType + ' ' + layoutStr;
        break;
      default:

    }

    // return result;
  }


  setDescendantProp(obj, desc, value) {
    if (desc) {
      const arr = desc.split('.');
      while (arr.length > 1) {
        obj = obj[arr.shift()];
      }
      obj[arr[0]] = value;
    }
  }

  getRelations(_id: string, elem: string): Array<string> {
    const result = [];
    switch (elem) {
      case 'Place': {
        this.getProjectData();
        break;
      }
      case 'Transition': {
        break;
      }
    }
    return result;

  }

  /**
   * Getters for new cpnElement
   */

  /**
   * Creating empty page cpnElement
   * @param name - name of new page
   * @returns - new page cpnElement
   */
  createCpnPage(name, id) {
    const newPage = {
      pageattr: {
        _name: name
      },
      // place: [],
      // trans: [],
      // arc: [],
      constraints: '',
      _id: id ? id : getNextId()
    };

    // this.addInstanceInJson(this.instaceForTransition(newPage._id, true), undefined, newPage);

    this.updateInstances();

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

  createCpnMonitorBP(_cpnElement) {

  }

  // <monitor id="ID1438426776"
  //   name="Count_trans_occur_Customer&apos;place_                    order_1"
  //   type="6"
  //   typedescription="Count transition occurrence data collection"
  //   disabled="false">
  //   <node idref="ID1437019464"
  //   pageinstanceidref="ID1437019576"/>
  //   <option name="Logging"
  //   value="true"/>
  // </monitor>
  createMonitorCTODC(cpnElement: any): any {
    console.log('createMonitorCTODC(), cpnElement = ', cpnElement);
    return {
      _id: getNextId(),
      _name: 'Count_trans_occur_PAGENAME_' + cpnElement.text, // TODO add page name: 'Count_trans_occur_' + PAGENAME + '_' + cpnElement.text
      _type: '6',
      _typedescription: 'Count transition occurrence data collection',
      _disabled: 'false',
      node: {
        _idref: cpnElement.id,
        _pageinstanceidref: 'PAGEINSTANCEID' // TODO add page instance ID
      },
      option: {
        _name: 'Logging',
        _value: 'false'
      }
    };
  }

  // <monitor id="ID1437510504"
  //   name="Throughput times order size 3"
  //   type="3"
  //   typedescription="Data collection"
  //   disabled="true">
  //   <node idref="ID1437019470"
  //   pageinstanceidref="ID1437019576"/>
  //   <declaration name="Predicate">
  //   <ml id="ID1437510512">fun pred (bindelem) =
  //   let
  //   fun predBindElem (Customer&apos;consume (1, {its,oid,s})) = true
  //   | predBindElem _ = false
  //   in
  //   predBindElem bindelem
  // end
  // <layout>fun pred (bindelem) =
  //   let
  // fun predBindElem (Customer&apos;consume (1, {its,oid,s})) = true
  //   | predBindElem _ = false
  //   in
  //   predBindElem bindelem
  // end</layout>
  // </ml>
  // </declaration>
  // <declaration name="Observer">
  // <ml id="ID1437510516">fun obs (bindelem) =
  //   let
  // fun obsBindElem (Customer&apos;consume (1, {its,oid,s})) = 0
  //   | obsBindElem _ = ~1
  //   in
  //   obsBindElem bindelem
  // end
  // <layout>fun obs (bindelem) =
  //   let
  // fun obsBindElem (Customer&apos;consume (1, {its,oid,s})) = 0
  //   | obsBindElem _ = ~1
  //   in
  //   obsBindElem bindelem
  // end</layout>
  // </ml>
  // </declaration>
  // <declaration name="Init function">
  // <ml id="ID1437510520">fun init () =
  //   NONE
  //   <layout>fun init () =
  //   NONE</layout>
  //   </ml>
  //   </declaration>
  //   <declaration name="Stop">
  // <ml id="ID1437510524">fun stop () =
  //   NONE
  //   <layout>fun stop () =
  //   NONE</layout>
  //   </ml>
  //   </declaration>
  //   <option name="Timed"
  // value="false"/>
  // <option name="Logging"
  // value="false"/>
  // </monitor>
  createCpnMonitorDC(cpnElement) {

    let predicate: string;
    if (cpnElement.cpnType === 'cpn:Place') {
      predicate =
        'fun pred (PAGENAME&apos;SHAPETEXT_1_mark : U ms) = ' +
        '  true';
    } else {
      predicate =
        'fun pred (bindelem) =\n' +
        '  let\n' +
        '  fun predBindElem (PAGENAME&apos;SHAPETEXT (1, {x,y})) = true\n' + // TODO here
        '    | predBindElem _ = false\n' +
        'in\n' +
        '  predBindElem bindelem\n' +
        'end';
    }
    return {
      _id: getNextId(),
      _name: '',
      _type: '3',
      _typedescription: 'Data collection',
      _disabled: 'false',
      node: {
        _idref: cpnElement.id,
        _pageinstanceidref: 'PAGEINSTANCEID' // TODO add page instance ID
      },
      declaration: [
        {
          _name: 'Predicate',
          ml: {
            _id: 'ID' + new Date().getTime(),
            layout: predicate
          }
        },
        {
          _name: 'Observer',
          ml: {
            _id: 'ID' + new Date().getTime(),
            layout:
              'fun obs (bindelem) =\n' +
              '  let\n' +
              'fun obsBindElem (PAGENAME&apos;SHAPETEXT (1, {x,y})) = 0\n' + // TODO here
              '  | obsBindElem _ = ~1\n' +
              ' in\n' +
              '  obsBindElem bindelem\n' +
              'end'
          }
        },
        {
          _name: 'Init function',
          ml: {
            _id: 'ID' + new Date().getTime(),
            layout: 'fun init () =\n' +
              'NONE'
          }
        },
        {
          _name: 'Stop',
          ml: {
            _id: 'ID' + new Date().getTime(),
            layout: 'fun stop () =' +
              'NONE'
          }
        },
      ],
      option: [
        {
          _name: 'Timed',
          _value: 'false'
        },
        {
          _name: 'Logging',
          _value: 'false'
        }
      ]
    };
  }

  createCpnMonitorLLDC(_cpnElement) {

  }

  // <monitor id="ID1438122141"
  //   name="Marking_size_BurgerHeaven&apos;C busy_1"
  //   type="0"
  //   typedescription="Marking size"
  //   disabled="true">
  //   <node idref="ID1438112416"
  //   pageinstanceidref="ID1437053129"/>
  //   <node idref="ID1438118761"
  //   pageinstanceidref="ID1437053129"/>
  //   <node idref="ID1437052949"
  //   pageinstanceidref="ID1437053129"/>
  //   <option name="Logging"
  //   value="true"/>
  // </monitor>
  createCpnMonitorMS(cpnElement) {
    return {
      _id: 'ID' + new Date().getTime(),
      _name: 'Marking_size_PAGENAME_' + cpnElement.text, // TODO add page name: 'Count_trans_occur_' + PAGENAME + '_' + cpnElement.text
      _type: '0',
      _typedescription: 'Marking size',
      _disabled: 'false',
      node: [
        {
          _idref: 'IDREF', // TODO
          _pageinstanceidref: 'PAGEINSTANCEID' // TODO
        },
        {
          _idref: 'IDREF', // TODO
          _pageinstanceidref: 'PAGEINSTANCEID' // TODO
        },
        {
          _idref: 'IDREF', // TODO
          _pageinstanceidref: 'PAGEINSTANCEID' // TODO
        }
      ],
      option: {
        _name: 'Logging',
        _value: 'true'
      }
    };
  }

  createCpnMonitorPCBP(_cpnElement) {

  }

  createCpnMonitorTEBP(_cpnElement) {

  }

  createCpnMonitorUD(_cpnElement) {

  }

  createCpnMonitorWIF(_cpnElement) {

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
            str += i === 0 ? color.product.id[i] + ' ' : '* ' + color.product.id[i];
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

    if (parser) {
      return parser[0];
    }

    return undefined;
  }

  /**
   * Convert string to cpn declaration element
   * @param cpnElement
   * @param str
   */
  stringToCpnDeclarationElement(cpnElement, str) {

    cpnElement = { _id: cpnElement._id };

    const parser = str.match('^\\S+');
    // console.log('stringToCpnDeclarationElement(), parser = ', parser);

    const declarationType = this.parseDeclarationTypeFromString(str);

    if (!declarationType) {
      return;
    }

    let cpnType;

    switch (declarationType) {
      case 'var':
        cpnType = 'var';
        let splitLayoutArray;
        cpnElement.layout = str;
        str = str.replace('var', '');
        splitLayoutArray = str.trim().split(':');
        for (let i = 0; i < splitLayoutArray.length; i++) {
          splitLayoutArray[i] = splitLayoutArray[i].replace(/\s+/g, '').split(',');
        }
        cpnElement.id = splitLayoutArray[0];
        if (!cpnElement.type) {
          cpnElement.type = {};
        }
        if (splitLayoutArray[1]) {
          cpnElement.type.id = splitLayoutArray[1][0];
        }
        break;
      case 'ml':
      case 'val':
      case 'fun':
      case 'local':
        cpnType = 'ml';
        cpnElement.layout = str;
        cpnElement.__text = str;
        break;
      case 'colset':   // ***** отрефакторить *****
        cpnType = 'color';
        cpnElement.layout = str;
        str = str.replace('colset', '');
        splitLayoutArray = str.split('=');

        if (splitLayoutArray[1]) {
          splitLayoutArray[1] = splitLayoutArray[1].split(' ').filter(e => e.trim() !== '');
          let testElem = splitLayoutArray[1][0].replace(/\s+/g, '');
          for (const key of Object.keys(cpnElement)) {
            if (key !== '_id' && key !== 'layout') {
              delete cpnElement[key];
            }
          }
          if (splitLayoutArray[1][splitLayoutArray[1].length - 1].replace(';', '') === 'timed') {
            cpnElement.timed = '';
            splitLayoutArray[1].length = splitLayoutArray[1].length - 1;
          }
          if (testElem === 'product') {
            const productList = splitLayoutArray[1].slice(1).filter(e => e.trim() !== '*');
            cpnElement.id = splitLayoutArray[0].replace(/\s+/g, '');
            cpnElement.product = { id: productList };
          } else if (testElem === 'list') {
            const productList = splitLayoutArray[1].slice(1).filter(e => e.trim() !== '*');
            cpnElement.id = splitLayoutArray[0].replace(/\s+/g, '');
            cpnElement.list = { id: productList };
          } else {
            testElem = testElem.replace(/\s+/g, '').replace(';', '');
            splitLayoutArray[1][0] = splitLayoutArray[1][0].replace(/\s+/g, '').replace(';', '');

            // console.log('stringToCpnDeclarationElement(), testElem = ', testElem);
            // console.log('stringToCpnDeclarationElement(), splitLayoutArray = ', splitLayoutArray);

            if (testElem.toLowerCase() === splitLayoutArray[1][0].toLowerCase()) {
              cpnElement.id = splitLayoutArray[0].trim();
              cpnElement[testElem.toLowerCase()] = '';
            } else {
              cpnElement.id = splitLayoutArray[0].trim();
              cpnElement.alias = { id: testElem };
            }
          }
        }
        break;
      case 'globref':
        cpnType = 'globref';
        splitLayoutArray = str.split(' ').filter(e => e.trim() !== '' && e.trim() !== '=');
        cpnElement.id = splitLayoutArray[1].replace(/\s+/g, '').replace(';', '');
        cpnElement.ml = splitLayoutArray[2].replace(/\s+/g, '').replace(';', '');
        cpnElement.layout = str;
        break;
    }

    console.log('stringToCpnDeclarationElement(), cpnType = ', cpnType);
    console.log('stringToCpnDeclarationElement(), declarationType = ', declarationType);
    console.log('stringToCpnDeclarationElement(), cpnElement = ', cpnElement);

    return { cpnType: cpnType, declarationType: declarationType, cpnElement: cpnElement };
  }


  /**
   * Get all pages list
   */
  getAllPages() {
    const page = this.getCpn().page;
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
   * @param id
   */
  getPageById(id) {
    return this.getAllPages().find(page => page._id === id);
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



  getNextPageName(pageName) {
    let n = 1;
    let newPageName = pageName ? pageName : this.settings.getAppSettings()['page'] + ' ' + n;

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

  getPortNameById(pageId, id) {
    const page = this.getPageById(pageId);
    if (page) {
      const port = page.place.find(e => e._id === id);
      return port.text;
    }
  }

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
   * Add cpn element to parent
   * @param cpnParentElement
   * @param cpnElement
   * @param cpnType - new cpn type where cpn element should be placed
   */
  addCpnElement(cpnParentElement, cpnElement, cpnType) {
    if (!cpnParentElement) {
      console.error(this.constructor.name, 'addCpnElement(). ERROR: Undefined cpnParentElement element.');
      return cpnParentElement;
    }
    if (!cpnElement) {
      console.error(this.constructor.name, 'addCpnElement(). ERROR: Undefined cpnElement element.');
      return cpnParentElement;
    }
    if (!cpnType) {
      console.error(this.constructor.name, 'addCpnElement(). ERROR: Undefined cpnType.');
      return cpnParentElement;
    }

    if (cpnParentElement[cpnType] instanceof Array) {
      cpnParentElement[cpnType].push(cpnElement);
    } else if (cpnParentElement[cpnType]) {
      cpnParentElement[cpnType] = [cpnParentElement[cpnType], cpnElement];
    } else {
      cpnParentElement[cpnType] = cpnElement;
    }

    console.log(this.constructor.name, 'addCpnElement(), cpnParentElement, cpnElement = ', cpnParentElement, cpnElement);

    return cpnParentElement;
  }

  /**
   * Update cpn element in it's parent
   * @param cpnParentElement
   * @param cpnElement
   * @param cpnType - new cpn type where cpn element should be placed
   */
  updateCpnElement(cpnParentElement, cpnElement, cpnType) {
    if (!cpnParentElement) {
      console.error(this.constructor.name, 'updateCpnElement(). ERROR: Undefined cpnParentElement element.');
      return;
    }
    if (!cpnElement) {
      console.error(this.constructor.name, 'updateCpnElement(). ERROR: Undefined cpnElement element.');
      return;
    }
    if (!cpnType) {
      console.error(this.constructor.name, 'updateCpnElement(). ERROR: Undefined cpnType.');
      return;
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
    return cpnParentElement;
  }

  /**
   * Remove cpn element from it's parent
   * @param cpnParentElement
   * @param cpnElement
   * @param cpnType - old cpn type from where cpn element should be removed
   */
  removeCpnElement(cpnParentElement, cpnElement, cpnType) {
    if (!cpnParentElement) {
      console.error(this.constructor.name, 'removeCpnElement(). ERROR: Undefined cpnParentElement element.');
      return;
    }
    if (!cpnElement) {
      console.error(this.constructor.name, 'removeCpnElement(). ERROR: Undefined cpnElement element.');
      return;
    }
    if (!cpnType) {
      console.error(this.constructor.name, 'removeCpnElement(). ERROR: Undefined cpnType.');
      return;
    }

    if (cpnParentElement[cpnType]) {
      if (cpnParentElement[cpnType] instanceof Array) {
        cpnParentElement[cpnType] = cpnParentElement[cpnType].filter((e) => {
          return e._id !== cpnElement._id;
        });
        if (cpnParentElement[cpnType].length === 0) {
          cpnParentElement[cpnType] = undefined;
        }
      } else {
        cpnParentElement[cpnType] = undefined;
      }
    }
    return cpnParentElement;
  }




  getParentPageForTrans(cpnElement) {
    const page = this.getAllPages().find(p => {
      let trans;
      if (!(p.trans instanceof Array)) {
        trans = [p.trans];
      } else {
        trans = p.trans;
      }
      return trans.includes(cpnElement);
    });
    return page;
  }

}
