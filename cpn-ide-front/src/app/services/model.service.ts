import {Injectable} from '@angular/core';
import * as X2JS from './../../x2js/xml2json.js';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {EventService} from './event.service';
import {Message} from '../common/message';
import {ProjectService} from '../services/project.service';
/**
 * Common service for getting access to project data from all application
 */
/**
 * Common service for getting access to project data from all application
 */
@Injectable()
export class ModelService {

  private isLoaded = false;
  public modelName = '';
  public projectData = undefined;
  private backupModel = [];
  private redoBackupModel;
  private modelCase = [];
  subPages;
  pageId;
  countNewItems = 0;
  labelsEntry = {trans: ['time', 'code', 'priority', 'edit', 'cond'], place: ['initmark', 'edit', 'type'], arc:  ['annot'], label: ['edit']}
  paramsTypes = ['ml', 'color', 'var', 'globref'];

  constructor(private eventService: EventService, private http: HttpClient, private projectService: ProjectService) {
    console.log('ModelService instance CREATED!');

    this.eventService.on(Message.PROJECT_FILE_OPEN, (data) => {
      this.markNewModel();
      this.loadProjectData(data.project);
      this.modelCase['cpn:Place'] = 'place';
      this.modelCase['cpn:Transition'] = 'trans';
      this.modelCase['bpmn:SequenceFlow'] = 'arc';
      this.modelCase['bpmn:Process'] = 'trans';
      this.modelCase['place'] = 'place';
      this.modelCase['trans'] = 'trans';
      this.modelCase['arc'] = 'arc';
      this.modelCase['label'] = 'label';
    });

    this.eventService.on(Message.PROJECT_LOAD, (data) => {
      this.loadProjectData(data.project);
    });

    this.eventService.on(Message.PAGE_OPEN, (data) => {
      this.subPages =  data.subPages;
      this.pageId = data.pageObject._id;
    });

  }

  markNewModel() {
    this.isLoaded  = false;
  }

  markOpenedModel() {
    this.isLoaded = true;
  }

  isLooadModel() {
    return this.isLoaded;
  }

  loadProjectData(project: any) {
    this.projectData = project.data;
    this.modelName = project.name;
  }

  saveBackup(model, pageId) {
    this.redoBackupModel = [];
    console.log('Save data....')
    let modelCopy = JSON.parse(JSON.stringify(model));//Object.assign({}, model);
    this.backupModel.push({project: modelCopy, page: pageId ? pageId : this.pageId});//unshift({project: modelCopy, page: pageId});
  }

  cancelModelChanges(command) {
    let stackPop;
    let stackPush;
    if(command === 'redo') {
      stackPop = 'redoBackupModel';
      stackPush = 'backupModel';
    } else {
      stackPop = 'backupModel';
      stackPush = 'redoBackupModel';
    }
    let modelState = this[stackPop].pop()
    this[stackPush].push({project: JSON.parse(JSON.stringify(this.projectData)), page: this.pageId})
    this.projectData =  modelState.project;
    let sending = { project: {data: this.projectData, name: this.modelName}}
    this.markOpenedModel();
    this.eventService.send(Message.PROJECT_LOAD,   sending);
    if(modelState.page)  this.eventService.send(Message.PAGE_OPEN,   {pageObject: this.getPageById(modelState.page), subPages: this.subPages});
  }



  getModelCase(labelType) {
    return this.modelCase[labelType];
  }

  public getProjectData() {
    return this.projectData;
  }

  public getPageById(id): any {
    return this.projectData.workspaceElements.cpnet.page.length ? this.projectData.workspaceElements.cpnet.page.find(page => page._id === id) : this.projectData.workspaceElements.cpnet.page ;
  }

 /* getJsonElemetOnPage(pageId, id, type){
    try {
      return this.getPageById(pageId)[this.modelCase[type]].length ? this.getPageById(pageId)[this.modelCase[type]].find(elem => elem._id === id) : this.getPageById(pageId)[this.modelCase[type]];
    } catch(e) {
      return undefined;
    }
  }*/


  getJsonElemetOnPage(pageId, element, type){
    try {
      let page = this.getPageById(pageId);
      let entry;
      if(type ==='label') {
        if (element.labelTarget && element.labelTarget.parent){
          entry  = this.modelCase[element.labelTarget.type];
          return page[entry].length ? page[entry].find(elem => elem._id === element.labelTarget.id)[element.labelType] : page[entry][element.labelType];
        } else {
          return page['Aux'].length ? page['Aux'].find(elem => elem._id === element.labelNodeId) : page['Aux'];
        }
      } else {
        entry  = this.modelCase[type];
        return page[entry].length ? page[entry].find(elem => elem._id === element) : page[entry];
      }
    } catch(e) {
      return undefined;
    }
  }

  getcpnet() {
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


  ////ChangeModelActions



  deleteElementFromPageJson(pageId, id, type){
    this.saveBackup(this.projectData, pageId)
    let jsonPageObject = this.getPageById(pageId);
    if (!jsonPageObject[this.modelCase[type]].length || jsonPageObject[this.modelCase[type]].length === 1) jsonPageObject[this.modelCase[type]] = [];
    else
      jsonPageObject[this.modelCase[type]] = jsonPageObject[this.modelCase[type]].filter(elem => elem._id !== id);
  }

  deleteLabelJsonByCPNElem(CPNElem, index, typeElem, pageId) {
    this.saveBackup(this.projectData, pageId)
    let jsonPageObject = this.getPageById(pageId);
    try {
      if( jsonPageObject[typeElem] instanceof Array)
        jsonPageObject[typeElem].find( elem => elem._id === CPNElem.id)[CPNElem.labels[index].labelType].text.__text = undefined;
      else jsonPageObject[typeElem][CPNElem.labels[index].labelType].text.__text = undefined;
    } catch (err) {
      console.log('!!!!!!!!!' + err + '!!!!!!!!!!');
    }
  }


  addElementJsonOnPage(element, pageId, type) {
    this.saveBackup(this.projectData, pageId)
    let jsonPageObject = this.getPageById(pageId);
    if( jsonPageObject[this.modelCase[type]] instanceof Array) {
      jsonPageObject[this.modelCase[type]].push(element);
    } else {
      if(jsonPageObject[this.modelCase[type]]) {
        let curentElem =  jsonPageObject[this.modelCase[type]];
        jsonPageObject[this.modelCase[type]] = [curentElem, element];
      } else {
        jsonPageObject[this.modelCase[type]] =  [element];
      }
    }
  }

  //send changes

  changeSubPageTransitionName(subpage){
    this.eventService.send(Message.CHANGE_NAME_PAGE,  {id: subpage.subpageid, name: subpage.name, changedElement : 'tran'});
  }


  sendChangingElementToDeclarationPanel(node, elementType, action, id, blockId, state) {
    if (elementType === 'Declarations' || elementType === 'block') {
      this.eventService.send(Message.CHANGE_EXPLORER_TREE, {
        node: action === 'rename' ? node : undefined,
        action: action,
        element: 'tab',
        target: blockId,//this.getCurrentBlock(node).id,
        id: id,
        state: state //this.treeComponent.treeModel.getState()
      });
    } else if (elementType === 'ml') {
      this.eventService.send(Message.CHANGE_EXPLORER_TREE, {
        node: action === 'rename' ? node : undefined,
        action: action,
        element: elementType,
        target: blockId,//this.getCurrentBlock(node).id,
        id: id,
        state: state//this.treeComponent.treeModel.getState()
      });
    } else if (elementType === 'color') {
      this.eventService.send(Message.CHANGE_EXPLORER_TREE, {
        node: action === 'rename' ? node : undefined,
        action: action,
        element: elementType,
        target: blockId,//this.getCurrentBlock(node).id,
        id: id,
        state: state//this.treeComponent.treeModel.getState()
      });
    } else if (elementType === 'var') {
      this.eventService.send(Message.CHANGE_EXPLORER_TREE, {
        node: action === 'rename' ? node : undefined,
        action: action,
        element: elementType,
        target: blockId,//this.getCurrentBlock(node).id,
        id: id,
        state: state //this.treeComponent.treeModel.getState()
      });
    } else if (elementType === 'globref') {
      this.eventService.send(Message.CHANGE_EXPLORER_TREE, {
        node: action === 'rename' ? node : undefined,
        action: action,
        element: elementType,
        target: blockId, //this.getCurrentBlock(node).id,
        id: id,
        state: state //this.treeComponent.treeModel.getState()
      });
    } else if (this.paramsTypes.includes(id)) {
      this.eventService.send(Message.CHANGE_EXPLORER_TREE, {
        node: action === 'rename' ? node : undefined,
        action: action,
        target: blockId,//this.getCurrentBlock(node).id,
        id: id,
        state: state//this.treeComponent.treeModel.getState()
      });
    }
  }


  /*for refact*/
  shapeResizeJsonSaver(event, pageId) {
    this.saveBackup(this.projectData, pageId)
    let page = this.getPageById(pageId);
    let form = event.shape.type === 'cpn:Place' ? 'ellipse' : 'box';
    let jsonMovingElement = this.getJsonElemetOnPage(pageId, event.shape.type === 'label' ? event.shape : event.shape.id, event.shape.type);
    jsonMovingElement[form]._w = event.shape.width;
    jsonMovingElement[form]._h = event.shape.height;
    jsonMovingElement.posattr._x = event.shape.x + jsonMovingElement[form]._w / 2;
    jsonMovingElement.posattr._y = -1 * event.shape.y - jsonMovingElement[form]._h / 2;

    for(let labelType of this.labelsEntry[this.modelCase[event.shape.type]]) {
      if(labelType !== 'edit') {
        if (((event.context.direction === 'ne' || event.context.direction === 'nw') && labelType !== 'type' && labelType !== 'code' && labelType !== 'priority')
          || ((event.context.direction === 'se' || event.context.direction === 'sw') && labelType !== 'initmark' && labelType !== 'time' && labelType !== 'cond')) {

          jsonMovingElement[labelType].posattr._y = parseFloat(jsonMovingElement[labelType].posattr._y) + event.context.delta.y;
        }
        if (((event.context.direction === 'sw' || event.context.direction === 'nw') && labelType !== 'type' && labelType !== 'initmark' && labelType !== 'time' && labelType !== 'code')
          || ((event.context.direction === 'se' || event.context.direction === 'ne') && labelType !== 'cond' && labelType !== 'priority')) {
          jsonMovingElement[labelType].posattr._x = parseFloat(jsonMovingElement[labelType].posattr._x) + event.context.delta.x;
        }
      }
    }



    this.eventService.send(Message.SHAPE_SELECT, {element: event.shape, pageJson: page});
  }

  shapeMoveJsonSaver(event, pageId, arcShapes){
    this.saveBackup(this.projectData, pageId)
    let page = this.getPageById(pageId);
    let jsonMovingElement = this.getJsonElemetOnPage(pageId, event.shape.type === 'label'? event.shape : event.shape.id, event.shape.type);
    this.moveElementInJson(jsonMovingElement, event.shape.type, {x: event.dx, y: -1 * event.dy}, event.shape);
    if(event.shape.type !== 'bpmn:SequenceFlow') {
      if (page.arc instanceof Array) {
        for (let arc of page.arc) {
          if (arc.placeend._idref === event.shape.id || arc.transend._idref === event.shape.id) {
            let placeEnd = this.getJsonElemetOnPage(pageId, arc.placeend._idref, 'cpn:Place');
            let transEnd = this.getJsonElemetOnPage(pageId, arc.transend._idref, 'cpn:Transition');
            let modelElem = arcShapes.find(modelArc => modelArc.id === arc._id );
            if(placeEnd && transEnd && modelElem)
              this.moveElementInJson(arc, 'bpmn:SequenceFlow', {x: -1*(parseFloat(arc.annot.posattr._x) - (parseFloat(placeEnd.posattr._x) + parseFloat(transEnd.posattr._x))/2) + 6 , y: -1*(parseFloat(arc.annot.posattr._y) - (parseFloat(placeEnd.posattr._y) + parseFloat(transEnd.posattr._y))/2)}, modelElem);
          }
        }
      }
    }

    this.eventService.send(Message.SHAPE_SELECT, {element: event.shape, pageJson: page });
   /* switch(event.shape.type){
      case 'cpn:Place':
        if(page.place.length) {
          page.place.forEach(movingXmlElement => {
            if (movingXmlElement._id === event.shape.id) {
              movingXmlElement.posattr._x = parseFloat(movingXmlElement.posattr._x) + (event.dx);
              movingXmlElement.posattr._y = parseFloat(movingXmlElement.posattr._y) + (-1 * event.dy);
              movingXmlElement.type.posattr._x = parseFloat(movingXmlElement.type.posattr._x) + (event.dx);
              movingXmlElement.type.posattr._y = parseFloat(movingXmlElement.type.posattr._y) + (-1 * event.dy);
              movingXmlElement.initmark.posattr._x = parseFloat(movingXmlElement.initmark.posattr._x) + (event.dx);
              movingXmlElement.initmark.posattr._y = parseFloat(movingXmlElement.initmark.posattr._y) + (-1 * event.dy);
            }
          })
        } else {
          page.place.posattr._x = parseFloat(page.place.posattr._x) + (event.dx);
          page.place.posattr._y = parseFloat(page.place.posattr._y) + (-1 * event.dy);
          page.place.type.posattr._x = parseFloat(page.place.type.posattr._x) + (event.dx);
          page.place.type.posattr._y = parseFloat(page.place.type.posattr._y) + (-1 * event.dy);
          page.place.initmark.posattr._x = parseFloat(page.place.initmark.posattr._x) + (event.dx);
          page.place.initmark.posattr._y = parseFloat(page.place.initmark.posattr._y) + (-1 * event.dy);
        }
        break;
      case 'cpn:Transition':
        if(page.trans.length)
          page.trans.forEach(movingXmlElement => {
            if (movingXmlElement._id === event.shape.id) {
              movingXmlElement.posattr._x = parseFloat(movingXmlElement.posattr._x) + (event.dx );
              movingXmlElement.posattr._y = parseFloat(movingXmlElement.posattr._y) + (-1 * event.dy);
              movingXmlElement.cond.posattr._x = parseFloat(movingXmlElement.cond.posattr._x) + (event.dx );
              movingXmlElement.cond.posattr._y = parseFloat(movingXmlElement.cond.posattr._y) + (-1 * event.dy);
              movingXmlElement.priority.posattr._x = parseFloat(movingXmlElement.priority.posattr._x) + (event.dx );
              movingXmlElement.priority.posattr._y = parseFloat(movingXmlElement.priority.posattr._y) + (-1 * event.dy );
              movingXmlElement.time.posattr._x = parseFloat(movingXmlElement.time.posattr._x) + (event.dx );
              movingXmlElement.time.posattr._y = parseFloat(movingXmlElement.time.posattr._y) + (-1 * event.dy );
              movingXmlElement.code.posattr._x = parseFloat(movingXmlElement.code.posattr._x) + (event.dx );
              movingXmlElement.code.posattr._y = parseFloat(movingXmlElement.code.posattr._y) + (-1 * event.dy );
            }
          }); else {
          page.trans.posattr._x = parseFloat(page.trans.posattr._x) + (event.dx );
          page.trans.posattr._y = parseFloat(page.trans.posattr._y) + (-1 * event.dy);
          page.trans.cond.posattr._x = parseFloat(page.trans.cond.posattr._x) + (event.dx );
          page.trans.cond.posattr._y = parseFloat(page.trans.cond.posattr._y) + (-1 * event.dy);
          page.trans.priority.posattr._x = parseFloat(page.trans.priority.posattr._x) + (event.dx );
          page.trans.priority.posattr._y = parseFloat(page.trans.priority.posattr._y) + (-1 * event.dy );
          page.trans.time.posattr._x = parseFloat(page.trans.time.posattr._x) + (event.dx );
          page.trans.time.posattr._y = parseFloat(page.trans.time.posattr._y) + (-1 * event.dy );
          page.trans.code.posattr._x = parseFloat(page.trans.code.posattr._x) + (event.dx );
          page.trans.code.posattr._y = parseFloat(page.trans.code.posattr._y) + (-1 * event.dy );
        }
        break;
      case 'bpmn:SequenceFlow':
        if(page.arc.length)
          page.arc.forEach(movingXmlElement => {
            if (movingXmlElement._id === event.shape.id) {
              movingXmlElement.annot.posattr._x = parseFloat(movingXmlElement.annot.posattr._x) + (event.dx );
              movingXmlElement.annot.posattr._y = parseFloat(movingXmlElement.annot.posattr._y) + (-1 * event.dy);
            }
          }); else {
          page.arc.annot.posattr._x = parseFloat(page.arc.annot.posattr._x) + (event.dx );
          page.arc.annot.posattr._y = parseFloat(page.arc.annot.posattr._y) + (-1 * event.dy);
        }
        break;
      default:
    }
    // this.applyPageChanges();
    // let element = event.shape;
    this.eventService.send(Message.SHAPE_SELECT, {element: event.shape, pageJson: page });
    */
  }


  moveElementInJson(jsonElem, elemntType, delta, modelElem) {

    for(let movingElement of this.labelsEntry[this.modelCase[elemntType]]) {
      if(movingElement !== 'edit') {
        jsonElem[movingElement].posattr._x = parseFloat(jsonElem[movingElement].posattr._x) + delta.x;
        jsonElem[movingElement].posattr._y = parseFloat(jsonElem[movingElement].posattr._y) + delta.y;
      } else {
        jsonElem.posattr._x = parseFloat(jsonElem.posattr._x) + delta.x;
        jsonElem.posattr._y = parseFloat(jsonElem.posattr._y) + delta.y;
      }
      if(elemntType === 'bpmn:SequenceFlow') {
        jsonElem.bendpoint = [];
        let addToWay = 'push'; //jsonElem._orientation  === 'TtoP' ?  'push' : 'unshift'
        for (let updWayPoint of modelElem.waypoints) {
          if (!updWayPoint.original) {
            jsonElem.bendpoint[addToWay]({
                fillattr: {
                  _colour: 'White',
                  _pattern: 'Solid',
                  _filled: 'false'
                },
                lineattr: {
                  _colour: 'Black',
                  _thick: '0',
                  _type: 'Solid'
                },
                posattr: {
                  _x: updWayPoint.x,
                  _y: -1 * updWayPoint.y
                },
                textattr: {
                  _colour: 'Black',
                  _bold: 'false'
                },
                _id: 'ID' + new Date().getTime(),
                _serial: '1'
            });
          }
        }
      }
    }
  }


  applyPageChanges(pageId, placeShapes, textRenderer, transShapes, arcShapes) {
    this.saveBackup(this.projectData, pageId)
    let page = this.getPageById(pageId);
    //console.log('actual data -------' + JSON.stringify(page.place[0]));
    // console.log('moddifi data -------' + JSON.stringify(this.placeShapes[page.place[0]._id]));

    // console.log(JSON.stringify(this.transShapes));
    //  console.log( JSON.stringify(this.arcShapes));
    var bounds;
    let updatedPlace;
    if (page.place && !(page.place.length === 0 && !page.place._id)) {
      for (let place of page.place) {
        updatedPlace = placeShapes[place._id];
        place.posattr._x = updatedPlace.x + place.ellipse._w / 2;
        place.posattr._y = -1 * updatedPlace.y - place.ellipse._h / 2;
        place.ellipse._w = updatedPlace.width;
        place.ellipse._h = updatedPlace.height;
        place.lineattr._colour = updatedPlace.stroke;
        place.lineattr._thick = updatedPlace.strokeWidth;
        place.text = updatedPlace.name;

        for (let label of placeShapes[place._id].labels) {
          if (label.labelNodeId === place.type._id) {
            bounds = {
              width: 200, // 90,
              height: 30,
              x: place.type.posattr._x,
              y: place.type.posattr._y
            };
            bounds = textRenderer.getExternalLabelBounds(bounds, place.type.text.__text ? place.type.text.__text : '');
            place.type.lineattr._colour = label.stroke;
            place.type.posattr._x = label.x + Math.round(bounds.width) / 2;
            place.type.posattr._y = -1 * label.y - Math.round(bounds.height) / 2;
            place.type.text.__text = label.text;
          }
          if (label.labelNodeId === place.initmark._id) {
            bounds = {
              width: 200, // 90,
              height: 30,
              x: place.initmark.posattr._x,
              y: place.initmark.posattr._y
            };
            bounds = textRenderer.getExternalLabelBounds(bounds, place.initmark.text.__text ? place.initmark.text.__text : '');
            place.initmark.lineattr._colour = label.stroke;
            place.initmark.posattr._x = label.x + Math.round(bounds.width) / 2;
            place.initmark.posattr._y = -1 * label.y - Math.round(bounds.height) / 2;
            place.initmark.text.__text = label.text;
          }
        }
      }
    }
    if (page.trans && !(page.trans.length === 0 && !page.trans._id) ) {
      let updatedTran;
      if (page.trans.length) {
        for (let tran of page.trans) {
          updatedTran = transShapes[tran._id];
          tran.posattr._x = updatedTran.x + tran.box._w / 2;
          tran.posattr._y = -1 * updatedTran.y - tran.box._h / 2;
          tran.box._w = updatedTran.width;
          tran.box._h = updatedTran.height;
          tran.lineattr._colour = updatedTran.stroke;
          tran.lineattr._thick = updatedTran.strokeWidth;
          tran.text = updatedTran.name;

          for (let label of transShapes[tran._id].labels) {
            if (label.labelNodeId === tran.cond._id) {
              bounds = {
                width: 200, // 90,
                height: 30,
                x: tran.cond.posattr._x,
                y: tran.cond.posattr._y
              };
              bounds = textRenderer.getExternalLabelBounds(bounds, tran.cond.text.__text ? tran.cond.text.__text : '');
              tran.cond.lineattr._colour = label.stroke;
              tran.cond.posattr._x = label.x + Math.round(bounds.width) / 2;
              tran.cond.posattr._y = -1 * label.y - Math.round(bounds.height) / 2;
              tran.cond.text.__text = label.text;
            }
            if (label.labelNodeId === tran.time._id) {
              bounds = {
                width: 200, // 90,
                height: 30,
                x: tran.time.posattr._x,
                y: tran.time.posattr._y
              };
              bounds = textRenderer.getExternalLabelBounds(bounds, tran.time.text.__text ? tran.time.text.__text : '');
              tran.time.lineattr._colour = label.stroke;
              tran.time.posattr._x = label.x + Math.round(bounds.width) / 2;
              tran.time.posattr._y = -1 * label.y - Math.round(bounds.height) / 2;
              tran.time.text.__text = label.text;
            }
            if (label.labelNodeId === tran.code._id) {
              bounds = {
                width: 200, // 90,
                height: 30,
                x: tran.time.posattr._x,
                y: tran.code.posattr._y
              };
              bounds = textRenderer.getExternalLabelBounds(bounds, tran.code.text.__text ? tran.code.text.__text : '');
              tran.code.lineattr._colour = label.stroke;
              tran.code.posattr._x = label.x + Math.round(bounds.width) / 2;
              tran.code.posattr._y = -1 * label.y - Math.round(bounds.height) / 2;
              tran.code.text.__text = label.text;
            }
            if (label.labelNodeId === tran.priority._id) {
              bounds = {
                width: 200, // 90,
                height: 30,
                x: tran.priority.posattr._x,
                y: tran.priority.posattr._y
              };
              bounds = textRenderer.getExternalLabelBounds(bounds, tran.priority.text.__text ? tran.priority.text.__text : '');
              tran.priority.lineattr._colour = label.stroke;
              tran.priority.posattr._x = label.x + Math.round(bounds.width) / 2;
              tran.priority.posattr._y = -1 * label.y - Math.round(bounds.height) / 2;
              tran.priority.text.__text = label.text;
            }
          }
        }
      } else {
        let tran = page.trans;
        updatedTran = transShapes[tran._id];
        tran.posattr._x = updatedTran.x + tran.box._w / 2;
        tran.posattr._y = -1 * updatedTran.y - tran.box._h / 2;
        tran.box._w = updatedTran.width;
        tran.box._h = updatedTran.height;
        tran.lineattr._colour = updatedTran.stroke;
        tran.lineattr._thick = updatedTran.strokeWidth;
        tran.text = updatedTran.name;

        for (let label of transShapes[tran._id].labels) {
          if (label.labelNodeId === tran.cond._id) {
            bounds = {
              width: 200, // 90,
              height: 30,
              x: tran.cond.posattr._x,
              y: tran.cond.posattr._y
            };
            bounds = textRenderer.getExternalLabelBounds(bounds, tran.cond.text.__text ? tran.cond.text.__text : '');
            tran.cond.lineattr._colour = label.stroke;
            tran.cond.posattr._x = label.x + Math.round(bounds.width) / 2;
            tran.cond.posattr._y = -1 * label.y - Math.round(bounds.height) / 2;
            tran.cond.text.__text = label.text;
          }
          if (label.labelNodeId === tran.time._id) {
            bounds = {
              width: 200, // 90,
              height: 30,
              x: tran.time.posattr._x,
              y: tran.time.posattr._y
            };
            bounds = textRenderer.getExternalLabelBounds(bounds, tran.time.text.__text ? tran.time.text.__text : '');
            tran.time.lineattr._colour = label.stroke;
            tran.time.posattr._x = label.x + Math.round(bounds.width) / 2;
            tran.time.posattr._y = -1 * label.y - Math.round(bounds.height) / 2;
            tran.time.text.__text = label.text;
          }
          if (label.labelNodeId === tran.code._id) {
            bounds = {
              width: 200, // 90,
              height: 30,
              x: tran.time.posattr._x,
              y: tran.code.posattr._y
            };
            bounds = textRenderer.getExternalLabelBounds(bounds, tran.code.text.__text ? tran.code.text.__text : '');
            tran.code.lineattr._colour = label.stroke;
            tran.code.posattr._x = label.x + Math.round(bounds.width) / 2;
            tran.code.posattr._y = -1 * label.y - Math.round(bounds.height) / 2;
            tran.code.text.__text = label.text;
          }
          if (label.labelNodeId === tran.priority._id) {
            bounds = {
              width: 200, // 90,
              height: 30,
              x: tran.priority.posattr._x,
              y: tran.priority.posattr._y
            };
            bounds = textRenderer.getExternalLabelBounds(bounds, tran.priority.text.__text ? tran.priority.text.__text : '');
            tran.priority.lineattr._colour = label.stroke;
            tran.priority.posattr._x = label.x + Math.round(bounds.width) / 2;
            tran.priority.posattr._y = -1 * label.y - Math.round(bounds.height) / 2;
            tran.priority.text.__text = label.text;
          }
        }

      }
    }
    if (page.arc && !(page.arc.length === 0 && !page.arc._id) ) {
      let uodatedCon;
      for (let arc of page.arc) {
        for (let modelArc of arcShapes) {
          if (modelArc.id === arc._id) {
            uodatedCon = modelArc;
          }
        }
        arc.bendpoint = [];
        let addToWay = 'push'; //arc._orientation  === 'TtoP' ?  'push' : 'unshift'
        for (let updWayPoint of uodatedCon.waypoints) {
          if (!updWayPoint.original){
            arc.bendpoint[addToWay](
              {
                fillattr: {
                  _colour: 'White',
                  _pattern: 'Solid',
                  _filled: 'false'
                },
                lineattr: {
                  _colour: 'Black',
                  _thick: '0',
                  _type: 'Solid'
                },
                posattr: {
                  _x: updWayPoint.x,
                  _y: -1 * updWayPoint.y
                },
                textattr: {
                  _colour: 'Black',
                  _bold: 'false'
                },
                _id: 'ID' + new Date().getTime(),
                _serial: '1'
              }
            );
          }
        }



        // if (arc.bendpoint) {
        //   if (arc.bendpoint.length) {
        //     for (let point of arc.bendpoint) {
        //       for (let updWayPoint of uodatedCon.waypoints) {
        //         if (point._id === updWayPoint.id) {
        //           point.posattr._x = updWayPoint.x;
        //           point.posattr._y = -1 * updWayPoint.y;
        //         }
        //       }
        //     }
        //   } else {
        //     for (let updWayPoint of uodatedCon.waypoints) {
        //       if (arc.bendpoint._id === updWayPoint.id) {
        //         arc.bendpoint.posattr._x = updWayPoint.x;
        //         arc.bendpoint.posattr._y = -1 * updWayPoint.y;
        //       }
        //     }
        //   }
        // }
        arc.lineattr._colour = uodatedCon.stroke;
        arc.lineattr._thick = uodatedCon.strokeWidth;
        for (let label of uodatedCon.labels) {
          if (label.labelNodeId === arc.annot._id) {
            bounds = {
              width: 200, // 90,
              height: 30,
              x: arc.annot.posattr._x,
              y: arc.annot.posattr._y
            };
            bounds = textRenderer.getExternalLabelBounds(bounds, arc.annot.text.__text ? arc.annot.text.__text : '');
            arc.annot.lineattr._colour = label.stroke;
            arc.annot.posattr._x = label.x + Math.round(bounds.width) / 2;
            arc.annot.posattr._y = -1 * label.y - Math.round(bounds.height) / 2;
            arc.annot.__text = label.text;
            arc.annot.text.__text = label.text;
          }

        }

      }
    }

    this.eventService.send(Message.MODEL_UPDATE, {pageObject: page});
    // this.eventService.send(Message.MODEL_UPDATE, {pageObject:  page});
    //EmitterService.getAppMessageEmitter().emit(
    //  {
    //    id: Constants.ACTION_MODEL_UPDATE,
    //    pageObject: page
    //  });
    return page;
  }




  changeLabelText(label, text, pageId) {
    this.saveBackup(this.projectData, pageId)
    if (label && label.text) label.text.__text =  text;
  }

  changePageName(pageId, name){
    this.saveBackup(this.projectData, pageId)
    const changedPage = this.getPageById(pageId);
    if (changedPage) {
      changedPage.pageattr._name = name;
    }
  }

  createNewPage(page) {
    this.saveBackup(this.projectData, page._id);
    if ( this.projectData.workspaceElements.cpnet.length) {
      this.projectData.workspaceElements.cpnet.page.push(page);
    } else {
      this.projectData.workspaceElements.cpnet.page = [this.projectData.workspaceElements.cpnet.page];
      this.projectData.workspaceElements.cpnet.page.push(page);
    }
  }

  deletePage(pageId) {
    this.saveBackup(this.projectData, pageId);
    if (this.projectData.workspaceElements.cpnet.page.length) {
      this.projectData.workspaceElements.cpnet.page = this.projectData.workspaceElements.cpnet.page.filter(x => x._id !== pageId);
    } else {
      this.projectData.workspaceElements.cpnet.page = [];
    }
  }



  updateModel(updatedData) {
    this.saveBackup(this.projectData, undefined);
    const project = this.projectData;
    if (project.workspaceElements.cpnet.page.length) {
      for (let page of project.workspaceElements.cpnet.page) {
        if (page.pageattr._name === updatedData.pageObject.pageattr._name) {
          page = updatedData.pageObject;

          // EmitterService.getAppMessageEmitter().emit({
          //   id: Constants.ACTION_XML_UPDATE, // id: Constants.ACTION_PROJECT_LOAD_DATA,
          //   project: {data: project, name: this.modelName}
          // });

          this.eventService.send(Message.XML_UPDATE, {project: {data: project, name: this.modelName}});
        }
      }
    } else {
      let page = project.workspaceElements.cpnet.page;
      if (page.pageattr._name === updatedData.pageObject.pageattr._name) {
        page = updatedData.pageObject;

        // EmitterService.getAppMessageEmitter().emit({
        //   id: Constants.ACTION_XML_UPDATE, // id: Constants.ACTION_PROJECT_LOAD_DATA,
        //   project: {data: project, name: this.modelName}
        // });

        this.eventService.send(Message.XML_UPDATE, {project: {data: project, name: this.modelName}});
      }
    }
    //  console.log('Get data fromPAge ----' + JSON.stringify(updatedData.pageObject));
    // console.log('actual data -------' + JSON.stringify(proj.workspaceElements.cpnet.page));
  }


  createNewBlock(block, targetBlock) {
    this.saveBackup(this.projectData, undefined);
    if(targetBlock) {
      if(targetBlock.block && targetBlock.block instanceof Array) {
        targetBlock.block.push(block);
      } else {
        if(targetBlock.block)
          targetBlock.block = [targetBlock.block];
        else targetBlock.block = []
        targetBlock.block.push(block);
      }
    } else {
      this.getcpnet().globbox.block.push(block);
    }
  }


  clearDefaultLabelValues(pageId){
    let page = this.getPageById(pageId);
    for(let entry of ['place', 'trans', 'arc']) {
      if(page[entry] instanceof Array) {
        for(let jsonElem of page[entry]) {
          for(let labelType of this.labelsEntry[entry]) {
            if(jsonElem[labelType] && jsonElem[labelType].text && jsonElem[labelType].text.__text && Object.values(this.projectService.appSettings).includes(jsonElem[labelType].text.__text))
              jsonElem[labelType].text.__text = null;
          }
        }
      } else {
          for(let labelType of this.labelsEntry[entry]) {
            if(page[entry] && page[entry][labelType] && page[entry][labelType].text && page[entry][labelType].text.__text && Object.values(this.projectService.appSettings).includes(page[entry][labelType].text.__text))
              page[entry][labelType].text.__text = null;
          }
        }
      }
  }

  deleteBlock(id) {
    this.saveBackup(this.projectData, undefined);
    let cpnet = this.getcpnet();
    cpnet.globbox.block = cpnet.globbox.block.filter(e => e.id !== id);
  }

  deleteElementInBlock(blcok, elementType, id) {
    this.saveBackup(this.projectData, undefined);
    blcok[elementType] = blcok[elementType].filter(elem => elem._id !== id);
  }


  addItemToBlock(block, elementGroup): any {
    this.saveBackup(this.projectData, undefined);
    let newNode;
    if (!block[elementGroup]) {
      newNode = this.newElemetn(elementGroup);
      block[elementGroup] = [newNode];
      //////create new elemenetType whith
    } else {
      newNode = this.newElemetn(elementGroup);
      block[elementGroup].push(newNode);
    }
    return newNode;
  }

  newElemetn(elementType): any {
    this.saveBackup(this.projectData, undefined);
    switch (elementType) {
      case 'var':
        return {id: this.projectService.getAppSettings()[elementType] + (++this.countNewItems), type: {id: this.projectService.getAppSettings()[elementType]}, _id: 'ID' + new Date().getTime()};
        break;
      case 'color':
        return {id: this.projectService.getAppSettings()[elementType] + (++this.countNewItems), timed: '', name: this.projectService.getAppSettings()[elementType], _id: 'ID' + new Date().getTime()};
        break;
      case 'ml':
        return {
          _id: 'ID' + new Date().getTime(), __text: this.projectService.getAppSettings()[elementType], toString() {
            return (this.__text != null ? this.__text : '');
          }
        };
        break;
      case 'globref':
        return {id: this.projectService.getAppSettings()[elementType] + (++this.countNewItems), ml: this.projectService.getAppSettings()[elementType], _id: 'ID' + new Date().getTime()}
        break;
      default:

    }
  }



  /**
   *  Parse variables Layout string and create object this variable
   * @param layout - declaration string
   * @param elem - changing variable object
   * @param blockType - type variable (color, var, ml, gkobref)
   */
  parseVariableLayout(layout, elem, blockType) {
    this.saveBackup(this.projectData, undefined);
    switch(blockType) {
      case 'var':
        let splitLayoutArray;
        elem.layout = blockType + ' ' + layout;
        layout = layout.replace('var', '');
        splitLayoutArray =  layout.trim().split(':');
        for (let i = 0; i < splitLayoutArray.length; i++ ) {
          splitLayoutArray[i] = splitLayoutArray[i].replace(/\s+/g, '').split(',');
        }
        elem.id = splitLayoutArray[0];
        elem.type.id = splitLayoutArray[1][0];
        break;
      case 'ml':
        elem.layout = layout;
        elem.__text =  layout;
        break;
      case 'color':   //*****отрефакторить*****
        elem.layout = blockType + ' ' + layout;
        layout = layout.replace('colset', '');
        splitLayoutArray =  layout.split('=');
        splitLayoutArray[1] = splitLayoutArray[1].split(' ').filter(e => e.trim() !== '' );
        let testElem = splitLayoutArray[1][0].replace(/\s+/g, '')
        for(let key of Object.keys(elem)) {
          if(key !== '_id' && key !== 'layout') delete elem[key];
        }
        if(splitLayoutArray[1][splitLayoutArray[1].length - 1].replace(';', '') === 'timed') {
          elem.timed = '';
          splitLayoutArray[1].length =  splitLayoutArray[1].length - 1;
        }
        if (testElem === 'product') {
          let productList = splitLayoutArray[1].slice(1).filter(e => e.trim() !== '*')
          elem.id = splitLayoutArray[0].replace(/\s+/g, '');
          elem.product = { id: productList};
        }  else if (testElem === 'list') {
          let productList = splitLayoutArray[1].slice(1).filter(e => e.trim() !== '*')
          elem.id = splitLayoutArray[0].replace(/\s+/g, '');
          elem.list = { id: productList};
        } else {
          testElem = testElem.replace(/\s+/g, '').replace(';', '');
          splitLayoutArray[0] = splitLayoutArray[0].replace(/\s+/g, '').replace(';', '');
          if(testElem.toLowerCase() === splitLayoutArray[0].toLowerCase()) {
            elem.id = splitLayoutArray[0];
            elem[testElem.toLowerCase()] = '';
          } else {
            elem.id = splitLayoutArray[0];
            elem.alias = { id: testElem};
          }
        }
        break;
      case 'globref':
        splitLayoutArray =  layout.split(' ').filter(e => e.trim() !== '' && e.trim() !== '=' );
        elem.id = splitLayoutArray[1].replace(/\s+/g, '').replace(';', '');
        elem.ml = splitLayoutArray[2].replace(/\s+/g, '').replace(';', '');
        elem.layout =  blockType + ' ' + layout;
        break;
      default:

    }

    //return result;
  }




}
