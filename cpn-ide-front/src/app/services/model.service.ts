import { Injectable } from '@angular/core';
import { EventService } from './event.service';
import { Message } from '../common/message';
import { AccessCpnService } from './access-cpn.service';
import { SettingsService } from '../services/settings.service';
import { ValidationService } from './validation.service';
import { keyframes } from '@angular/animations';

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
  }

  getUndoCount() {
    // console.log('getUndoCount()');
    return this.undoHistory.length;
  }

  getRedoCount() {
    return this.redoHistory.length;
  }

  saveBackupBak(model, pageId = undefined) {
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


  deleteElementFromPageJson(pageId, id, type) {
    this.saveBackupBak(this.projectData, pageId);

    const jsonPageObject = this.getPageById(pageId);

    if (!jsonPageObject[this.modelCase[type]] ||
      !jsonPageObject[this.modelCase[type]].length ||
      jsonPageObject[this.modelCase[type]].length === 1) {

      jsonPageObject[this.modelCase[type]] = [];
    } else {
      jsonPageObject[this.modelCase[type]] = jsonPageObject[this.modelCase[type]].filter(elem => elem._id !== id);
    }
  }

  deleteLabelJsonByCPNElem(CPNElem, index, typeElem, pageId) {
    this.saveBackupBak(this.projectData, pageId);
    const jsonPageObject = this.getPageById(pageId);
    try {
      if (jsonPageObject[typeElem] instanceof Array) {
        jsonPageObject[typeElem].find(elem => elem._id === CPNElem.id)[CPNElem.labels[index].labelType].text.__text = undefined;
      } else {
        jsonPageObject[typeElem][CPNElem.labels[index].labelType].text.__text = undefined;
      }
    } catch (err) {
      console.error(`deleteLabelJsonByCPNElem() - an exeption occured: ${err}`);
    }
  }

  deleteFromModel(cpnElement) {
    const id = cpnElement._id;

    const e = this.getCpnElementById(undefined, this.projectData, id);

    console.log('deleteFromModel(), e = ', e);

    if (e) {
      if (e.cpnParentElement instanceof Array) {
        e.cpnParentElement.splice(e.cpnParentElement.indexOf(e.cpnElement), 1);
      } else if (e.cpnParentElement instanceof Object) {
        this.deleteFromObject(e.cpnParentElement, e.cpnElement);
      }
    }
  }

  deleteFromObject(cpnParentElement, cpnElement) {
    if (cpnParentElement instanceof Object) {
      for (const key of Object.keys(cpnParentElement)) {
        if (cpnParentElement[key] === cpnElement) {
          delete cpnParentElement[key];
        }
      }
    }
  }

  getCpnElementById(cpnParentElement, cpnElement, id) {
    if (cpnElement instanceof Object || cpnElement instanceof Array) {
      console.log('getCpnElementById(), cpnElement = ', cpnElement);

      if (cpnElement._id === id) {
        return { cpnParentElement: cpnParentElement, cpnElement: cpnElement };
      }

      for (const key of Object.keys(cpnElement)) {
        const e = this.getCpnElementById(cpnElement, cpnElement[key], id);
        if (e) {
          return { cpnParentElement: e.cpnParentElement, cpnElement: e.cpnElement };
        }
      }
    }
    return undefined;
  }

  addElementJsonOnPage(cpnElement, pageId, type) {
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

    this.eventService.send(Message.MODEL_CHANGED);
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
              subPageTrans._id = 'ID' + new Date().getTime();
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
            if (subPageTrans) { break; }
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
      if (target) {
        if (target instanceof Array) {
          target.splice(index, 0, element);
        } else {
          target = [target];
          target.splice(index, 0, element);
        }
      } else if (element instanceof Array) {
        target = element;
      } else {
        target = [element];
      }
      if (parent instanceof Array) {
        for (let i = 0; i < parent.length; i++) {
          if (parent[i]._id === element._id) {
            parent.splice(i, 1);
            break;
          }
        }
      } else {
        parent = [];
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
      addelemToEntry('block');
      if (parent.block instanceof Array) {
        for (let i = 0; i < parent.block.length; i++) {
          if (parent.block[i]._id === element._id) {
            parent.block.splice(i, 1);
          }
        }
      } else {
        parent.block = [];
      }
    }
  }


  applyPageChanges(pageId, placeShapes, textRenderer, transShapes, arcShapes) {
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

    if (this.projectData.workspaceElements.cpnet.page instanceof Array) {
      this.projectData.workspaceElements.cpnet.page.push(page);
    } else {
      this.projectData.workspaceElements.cpnet.page = [this.projectData.workspaceElements.cpnet.page, page];
    }
  }

  deletePage(pageId) {
    this.saveBackupBak(this.projectData, pageId);

    if (!(this.projectData.workspaceElements.cpnet.page instanceof Array)) {
      this.projectData.workspaceElements.cpnet.page = [this.projectData.workspaceElements.cpnet.page];
    }
    this.projectData.workspaceElements.cpnet.page = this.projectData.workspaceElements.cpnet.page.filter(x => x._id !== pageId);
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
        if (block[elementType].length === 0) { delete block[elementType]; }
      }
    }
  }

  deleteMonitorInBlock(block, id) {
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
          _id: 'ID' + new Date().getTime()
        };
        break;
      case 'color':
        return {
          id: this.settings.getAppSettings()[elementType] + (++this.countNewItems),
          timed: '',
          name: this.settings.getAppSettings()[elementType],
          _id: 'ID' + new Date().getTime()
        };
        break;
      case 'ml':
        return {
          _id: 'ID' + new Date().getTime(), __text: this.settings.getAppSettings()[elementType], toString() {
            return (this.__text != null ? this.__text : '');
          }
        };
        break;
      case 'globref':
        return {
          id: this.settings.getAppSettings()[elementType] + (++this.countNewItems),
          ml: this.settings.getAppSettings()[elementType],
          _id: 'ID' + new Date().getTime()
        };
        break;
      default:

    }
  }


  /**
   * Parse variables Layout string and create object this variable
   * @param layout - declaration string
   * @param elem - changing variable object
   * @param blockType - type variable (color, var, ml, gkobref)
   */
  parseVariableLayout(layout, elem, blockType) {
    this.saveBackupBak(this.projectData, undefined);
    switch (blockType) {
      case 'var':
        let splitLayoutArray;
        elem.layout = blockType + ' ' + layout;
        layout = layout.replace('var', '');
        splitLayoutArray = layout.trim().split(':');
        for (let i = 0; i < splitLayoutArray.length; i++) {
          splitLayoutArray[i] = splitLayoutArray[i].replace(/\s+/g, '').split(',');
        }
        elem.id = splitLayoutArray[0];
        elem.type.id = splitLayoutArray[1][0];
        break;
      case 'ml':
        elem.layout = layout;
        elem.__text = layout;
        break;
      case 'color':   // *****отрефакторить*****
        elem.layout = layout;
        layout = layout.replace('colset', '');
        splitLayoutArray = layout.split('=');
        splitLayoutArray[1] = splitLayoutArray[1].split(' ').filter(e => e.trim() !== '');
        let testElem = splitLayoutArray[1][0].replace(/\s+/g, '');
        for (const key of Object.keys(elem)) {
          if (key !== '_id' && key !== 'layout') {
            delete elem[key];
          }
        }
        if (splitLayoutArray[1][splitLayoutArray[1].length - 1].replace(';', '') === 'timed') {
          elem.timed = '';
          splitLayoutArray[1].length = splitLayoutArray[1].length - 1;
        }
        if (testElem === 'product') {
          const productList = splitLayoutArray[1].slice(1).filter(e => e.trim() !== '*');
          elem.id = splitLayoutArray[0].replace(/\s+/g, '');
          elem.product = { id: productList };
        } else if (testElem === 'list') {
          const productList = splitLayoutArray[1].slice(1).filter(e => e.trim() !== '*');
          elem.id = splitLayoutArray[0].replace(/\s+/g, '');
          elem.list = { id: productList };
        } else {
          testElem = testElem.replace(/\s+/g, '').replace(';', '');
          splitLayoutArray[0] = splitLayoutArray[0].replace(/\s+/g, '').replace(';', '');
          if (testElem.toLowerCase() === splitLayoutArray[0].toLowerCase()) {
            elem.id = splitLayoutArray[0];
            elem[testElem.toLowerCase()] = '';
          } else {
            elem.id = splitLayoutArray[0];
            elem.alias = { id: testElem };
          }
        }
        break;
      case 'globref':
        splitLayoutArray = layout.split(' ').filter(e => e.trim() !== '' && e.trim() !== '=');
        elem.id = splitLayoutArray[1].replace(/\s+/g, '').replace(';', '');
        elem.ml = splitLayoutArray[2].replace(/\s+/g, '').replace(';', '');
        elem.layout = blockType + ' ' + layout;
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

  getRelations(id: string, elem: string): Array<string> {
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
      _id: id ? id : 'ID' + new Date().getTime()
    };

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
      _id: 'ID' + new Date().getTime()
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
      _id: 'ID' + new Date().getTime()
    };
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
      case 'globref': return this.cpnGlobrefToString(cpnElement);
      case 'color': return this.cpnColorToString(cpnElement);
      case 'var': return this.cpnVarToString(cpnElement);
      case 'ml': return this.cpnMlToString(cpnElement);
    }
  }


  /**
   * Parse declaration type from string
   */
  parseDeclarationTypeFromString(str) {
    let parser = str.match('^\\S+');

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

    let parser = str.match('^\\S+');
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
            splitLayoutArray[0] = splitLayoutArray[0].replace(/\s+/g, '').replace(';', '');
            if (testElem.toLowerCase() === splitLayoutArray[0].toLowerCase()) {
              cpnElement.id = splitLayoutArray[0];
              cpnElement[testElem.toLowerCase()] = '';
            } else {
              cpnElement.id = splitLayoutArray[0];
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

  /**
   * Get page object from model by id
   * @param id
   */
  getPageById(id): any {
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
   * Get all acrs for model
   */
  getAllArcs() {
    const allArcs = [];

    for (const page of this.getAllPages()) {
      const arcs = page.arc instanceof Array ? page.arc : [page.arc];
      for (const arc of arcs) {
        allArcs.push(arc);
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
      if (cpnElementIds.includes(arc.placeend._idref)
        && cpnElementIds.includes(arc.transend._idref)) {
        arcs.push(arc);
      }
    }
    return arcs;
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
    let pageName = this.getNextPageName(newPageName);
    let pageId = newPageId ? newPageId : 'ID' + new Date().getTime();

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
    const page = this.getAllPages().find(p => {
      return p.arc.find(pl => {
        return pl._id === cpnElement._id;
      });
    });
    for (const entry of ['place', 'trans']) {
      if (!(page[entry] instanceof Array)) {
        page[entry] = [page[entry]];
      }
    }
    let placeEnd;
    placeEnd = page.place.find(el => {
      return el._id === cpnElement.placeend._idref;
    });
    let transEnd;
    transEnd = page.trans.find((tr) => cpnElement.transend._idref === tr._id);
    return { place: placeEnd, trans: transEnd, orient: cpnElement._orientation };
  }




  /**
   * Getting all port places for transition
   * @param cpnElement
   * @param transEnd
   */
  getAllPorts(cpnElement, transEnd) {
    const ports = [];
    console.log('getAllPorts(), transEnd = ', transEnd);

    if (transEnd.subst) {
      const page = this.getPageById(transEnd.subst._subpage);
      if (page && page.place) {
        console.log('getAllPorts(), page = ', page);

        for (const place of page.place) {
          console.log('getAllPorts(), place = ', place);
          console.log('getAllPorts(), place.port = ', place.port);
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
    } else { return undefined; }
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

}
