import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {Constants} from '../common/constants';
import TextRenderer from '../../../cpn-js/lib/draw/TextRenderer';
import {Message} from '../common/message';
import {EventService} from '../services/event.service';
import {ProjectService} from '../services/project.service';
import {ModelService} from '../services/model.service';
import {element} from 'protractor';

@Component({
  selector: 'app-properties-panel',
  templateUrl: './properties-panel.component.html',
  styleUrls: ['./properties-panel.component.scss']
})
export class PropertiesPanelComponent implements OnInit, OnDestroy {

  private title = '';

  // private commonNodes = [];
  // private nodes = [];

  // labels
  // private type = [];
  // private initmark = [];
  // private cond = [];
  // private code = [];
  // private time = [];
  // private priority = [];
  // private annot = [];

  private isPlace = false;
  private isTrans = false;
  private isArc = false;
  private cpnElement;
  private elementType;
  private currentProjectModel: any;
  private pageInModel;
  private shapeObject;
  private pageId;
  private selectedElement;

  private tables = [];

  private tableMapNames;



  /*
  // Fucia
  // Maroon  #800000ff
  // Yellow  #ffff00ff
  //  White  #ffffffff
  // Red #ff0000ff
  Silver #c0c0c0ff
  Teal #008080ff
  Navy #000080ff
  Aqua #00ffffff
  Black #000000ff
  Olive #808000ff
  Lime #00ff00ff
  Gray #808080ff
  Purple #800080ff
  Green #008000ff
  Blue #0000ffff
  // */


  commonNodesOrder = {
    place : {
      Name: 1,
      type: 2,
      initmark: 3,
      Stroke: 4
    },
    trans: {
      Name: 1,
      cond: 2,
      time: 3,
      priority: 4,
      code: 5,
      Stroke: 6
    }
  };

  constructor(private eventService: EventService, private projectService: ProjectService, private modelService: ModelService) {
  }

  ngOnInit() {
    this.tableMapNames = {
      Name: 'Name',
      type: 'Colorset',
      initmark: 'Initial marking',
      Stroke: 'Stroke',
      strokeWidth: 'Stroke width',
      cond: 'Guard',
      code: 'Action',
      time: 'Time',
      priority: 'Priority',
      annot: 'Annot',
      invert: {}

    };
    this.tableMapNames['invert']['Colorset'] = 'type';
    this.tableMapNames['invert']['Initial marking'] = 'initmark';
    this.tableMapNames['invert']['troke width'] = 'strokeWidth';
    this.tableMapNames['invert']['Guard'] = 'cond';
    this.tableMapNames['invert']['Action'] = 'code';
    this.tableMapNames['invert']['Time'] = 'time';
    this.tableMapNames['invert']['Priority'] = 'priority';
    this.tableMapNames['invert']['Annot'] = 'annot';

    this.tables = [
      {id: 'commonNodes', name: '', data: [], visible: false},
      {id: 'nodes', name: '', data: [], visible: false},
      {id: 'type', name: 'Type', data: [], visible: false},
      {id: 'initmark', name: 'Initmark', data: [], visible: false},
      {id: 'cond', name: 'Condition', data: [], visible: false},
      {id: 'code', name: 'Code', data: [], visible: false},
      {id: 'time', name: 'Time', data: [], visible: false},
      {id: 'priority', name: 'Priority', data: [], visible: false},
      {id: 'annot', name: 'Annotation', data: [], visible: false},
    ];

    this.subscribeToProject();
  }

  ngOnDestroy() {
  }

  getFieldValue(id, name, value) {
    let retrunValue = value;
    // console.log('id name value: ' + id + ' ' + name + ' ' + value);
    if (value === '  ') {   retrunValue =  this.projectService.getAppSettings()[id]; }
    return retrunValue;
  }


  getContentType(itemName) {
    if (itemName === 'Stroke') {
      return 'color';
    } else {
      return 'text';
    }
  }

  getFieldName(name) {
    return this.tableMapNames[name] || name;
  }

  tableOnChange() {
    const commonNodes = this.getTable('commonNodes').data;
    const nodes = this.getTable('nodes').data;

    const htmlElement: HTMLElement = <HTMLElement>event.target;
    if (htmlElement && htmlElement.nodeName === 'TD' || htmlElement.nodeName === 'INPUT') {
      if (htmlElement.offsetParent && (htmlElement.offsetParent['offsetParent'])) {
        const htmlTableElement: HTMLTableElement = <HTMLTableElement>document.getElementById(htmlElement.offsetParent['offsetParent'].id);
        if(htmlElement.nodeName === 'INPUT') {
          let updatedfield = htmlElement.parentNode.parentNode.childNodes[0].textContent;
          updatedfield = this.tableMapNames['invert'][updatedfield] ?  this.tableMapNames['invert'][updatedfield] : updatedfield;
          const newValue = htmlElement['value'];
          let table = this.getTable(htmlElement.offsetParent['offsetParent'].id);
          this.modelService.setDescendantProp(this.cpnElement, this.setValueForTableByIdandReturnPath(newValue, table, updatedfield).replace('cpnElement.', ''), newValue );
          const emiterData = {
            id: Constants.ACTION_PROPERTY_UPDATE,
            labels: [],
            elementid: this.cpnElement._id,
            type: this.elementType,
            pagename: this.modelService.getPageById(this.pageId).pageattr._name
          };
          this.eventService.send(Message.PROPERTY_UPDATE, emiterData);
        }
       /* if (htmlTableElement.id === 'commonNodes') {
          this.updateProperties(commonNodes, htmlTableElement);
        } else if (htmlTableElement.id === 'nodes') {
          this.updateProperties(nodes, htmlTableElement);
        } else {
          // update labels
          const t = this.getTable(htmlTableElement.id);
          if (t) {
            this.updateProperties(t.data, htmlTableElement);
          }
        }*/

        // let tableDataSource;
        // switch (htmlTableElement.id) {
        //   case 'nodes':
        //     tableDataSource = this.nodes;
        //     break;
        //   case 'typeTable':
        //     tableDataSource = this.type;
        //     break;
        //   case 'initmarkTable':
        //     tableDataSource = this.initmark;
        //     break;
        //   case 'condTable':
        //     tableDataSource = this.cond;
        //     break;
        //   case 'codeTable':
        //     tableDataSource = this.code;
        //     break;
        //   case 'timeTable':
        //     tableDataSource = this.time;
        //     break;
        //   case 'priorityTable':
        //     tableDataSource = this.priority;
        //     break;
        //   case 'annotTable':
        //     tableDataSource = this.annot;
        //     break;
        //   case 'commonNodes':
        //     tableDataSource = this.commonNodes;
        //     break;
        //   default:
        //     return;
        //
        // }
        // this.updateProperties(tableDataSource, htmlTableElement);
      }
    }
  }



  setValueForTableByIdandReturnPath(value, table, name): string{
    for(let i = 0; i < table.data.length; i++){
      if(table.data[i].name === name) {table.data[i].value =  value; return table.data[i].path; }
    }
  }



  /**
   * The listener waits for pressing the input button in the panel and determines which property in which table has been changed.
   * @param event - Keyboard event
   */

  /* @HostListener('window:keydown', ['$event'])
   keyEvent(event: KeyboardEvent) {

     if (event.keyCode === 13) {
       console.log(this.constructor.name, 'keyEvent(), event.keyCode === 13');

       const commonNodes = this.getTable('commonNodes').data;
       const nodes = this.getTable('nodes').data;

       const htmlElement: HTMLElement = <HTMLElement>event.target;
       if (htmlElement && htmlElement.nodeName === 'TD' || htmlElement.nodeName === 'INPUT') {
         if (htmlElement.offsetParent && (htmlElement.offsetParent['offsetParent'])) {
           const htmlTableElement: HTMLTableElement = <HTMLTableElement>document.getElementById(htmlElement.offsetParent['offsetParent'].id);

           if (htmlTableElement.id === 'commonNodes') {
             this.updateProperties(commonNodes, htmlTableElement);
           } else if (htmlTableElement.id === 'nodes') {
             this.updateProperties(nodes, htmlTableElement);
           } else {
             // update labels
             const t = this.getTable(htmlTableElement.id);
             if (t) {
               this.updateProperties(t.data, htmlTableElement);
             }
           }

           // let tableDataSource;
           // switch (htmlTableElement.id) {
           //   case 'nodes':
           //     tableDataSource = this.nodes;
           //     break;
           //   case 'typeTable':
           //     tableDataSource = this.type;
           //     break;
           //   case 'initmarkTable':
           //     tableDataSource = this.initmark;
           //     break;
           //   case 'condTable':
           //     tableDataSource = this.cond;
           //     break;
           //   case 'codeTable':
           //     tableDataSource = this.code;
           //     break;
           //   case 'timeTable':
           //     tableDataSource = this.time;
           //     break;
           //   case 'priorityTable':
           //     tableDataSource = this.priority;
           //     break;
           //   case 'annotTable':
           //     tableDataSource = this.annot;
           //     break;
           //   case 'commonNodes':
           //     tableDataSource = this.commonNodes;
           //     break;
           //   default:
           //     return;
           //
           // }
           // this.updateProperties(tableDataSource, htmlTableElement);
         }
       }
     }
   }*/

  getTable(id) {
    console.log(this.constructor.name, 'getLabelTable(), id = ', id);

    for (const t of this.tables) {
      if (t.id === id) {
        return t;
      }
    }
    return undefined;
  }

  hideColapseTable(table, event) {
    console.log(this.constructor.name, 'hideColapseTable(), table = ', table);
    table.visible = !table.visible;

    // const table: HTMLTableElement = <HTMLTableElement>document.getElementById(tableId);
    // // table.hidden = table.hidden ? false : true;
    // table.hidden = !this.tables[tableId].visible;

    // const caret = event.target.getElementById('caret');
    // caret.target.innerHTML =
    //   table.hidden ?
    //     '<i class="fas fa-caret-right"></i>' :
    //     '<i class="fas fa-caret-down"></i>';


    // if (!table.hidden) {
    //   event.target.innerText = event.target.innerText.replace('Layout', 'Details');
    // } else {
    //   event.target.innerText = event.target.innerText.replace('Details', 'Layout');
    // }
  }

  /**
   * The function collects data from the modified htmlTableElement,
   * forms from them js object of the model element and emit this to the  model-editor.component
   * @param tableDataSource - data source
   * @param htmlTableElement - html htmlTableElement element
   */
  updateProperties(tableDataSource, htmlTableElement) {
    const rows = htmlTableElement.rows.length;

    for (let i = 0; i < rows; i += 1) {
      const input = htmlTableElement.rows[i].cells[1].children[0].value;
      tableDataSource[i].value = Object.values(this.projectService.getAppSettings()).includes(input) ? ' ' : input;

      console.log(this.constructor.name, 'ENTER on property field' + tableDataSource[i]);
    }
    if (htmlTableElement.id === 'commonNodes') {
      this.applyChangesFromCommonElementTable();
    }
    this.updateModel();

  }

  applyChangesFromCommonElementTable() {
    const commonNodes = this.getTable('commonNodes').data;
    const nodes = this.getTable('nodes').data;

    for (const cmNode of commonNodes) {
      if (cmNode.name === 'Name') {
        nodes[1].value = cmNode.value;
      }
      if (cmNode.name === 'Stroke') {
        nodes[7].value = cmNode.value;
      }

      // labels
      for (const t of this.tables) {
        if (cmNode.name === t.id) {
          t.data[6].value = cmNode.value;
        }
      }

      // labels
      // if (cmNode.name === 'type') {
      //   this.type[6].value = cmNode.value;
      // }
      // if (cmNode.name === 'initmark') {
      //   this.initmark[6].value = cmNode.value;
      // }
      // if (cmNode.name === 'cond') {
      //   this.cond[6].value = cmNode.value;
      // }
      // if (cmNode.name === 'code') {
      //   this.code[6].value = cmNode.value;
      // }
      // if (cmNode.name === 'time') {
      //   this.time[6].value = cmNode.value;
      // }
      // if (cmNode.name === 'priority') {
      //   this.priority[6].value = cmNode.value;
      // }
      // if (cmNode.name === 'annot') {
      //   this.annot[6].value = cmNode.value;
      // }

    }

  }


  findLabelById(id) {
    return this.shapeObject.labels.find(e => e.labelNodeId === id);
  }

  updateModel() {
    console.log(this.constructor.name, 'updateModel()');

    const nodes = this.getTable('nodes').data;

    // this.shapeObject.id =  this.nodes[0].value;
    this.shapeObject.name = nodes[1].value;
    if (this.shapeObject.type !== 'cpn:Connection') {
      this.shapeObject.x = parseInt(nodes[3].value, 10);
    }
    if (this.shapeObject.type !== 'cpn:Connection') {
      this.shapeObject.y = parseInt(nodes[4].value, 10);
    }
    this.shapeObject.width = parseInt(nodes[5].value, 10);
    this.shapeObject.height = parseInt(nodes[6].value, 10);
    this.shapeObject.stroke = nodes[7].value;

    this.shapeObject.strokeWidth = parseInt(nodes[8].value, 10);
    this.shapeObject.businessObject.name = this.shapeObject.name;
    let labelElem;

    this.shapeObject.cpnElement.lineattr._colour = this.shapeObject.stroke;
    this.shapeObject.cpnElement.lineattr._thick = this.shapeObject.strokeWidth;

    for (const label of this.shapeObject.labels) {

      // labelElem = this.getLabelProperties(label);

      const t = this.getTable(label.labelType);
      if (t) {
        labelElem = t.data;
        label.labelNodeId = labelElem[0].value;
        label.x = parseInt(labelElem[2].value, 10);
        label.y = parseInt(labelElem[3].value, 10);
        label.width = parseInt(labelElem[4].value, 10);
        label.height = parseInt(labelElem[5].value, 10);
        label.text = labelElem[6].value;
        label.stroke = labelElem[7].value;
      }
    }

    const emiterData = {
      id: Constants.ACTION_PROPERTY_UPDATE,
      element: this.shapeObject,
      labels: [],
      pagename: this.modelService.getPageById(this.pageId).pageattr._name
    };

    for (const t of this.tables) {
      console.log(this.constructor.name, 'updateModel(), t = ', t);

      if (!['nodes', 'commonNodes'].includes(t.id)) {
        if (t.data[6] && t.data[6].value !== '  ' && !this.findLabelById(t.data[0].value)) {
          emiterData.labels.push(t.data);
        }
      }
    }

    // if (this.isPlace) {
    //   if (this.type[6].value !== '  ' && !this.shapeObject.labels.find(element => {
    //     return element.labelNodeId === this.type[0].value;
    //   })) {
    //     emiterData.labels.push(this.type);
    //   }
    //   if (this.initmark[6].value !== '  ' && !this.shapeObject.labels.find(element => {
    //     return element.labelNodeId === this.initmark[0].value;
    //   })) {
    //     emiterData.labels.push(this.initmark);
    //   }
    //
    // } else if (this.isTrans) {
    //   if (this.cond[6].value !== '  ' && !this.shapeObject.labels.find(element => {
    //     return element.labelNodeId === this.cond[0].value;
    //   })) {
    //     emiterData.labels.push(this.cond);
    //   }
    //   if (this.time[6].value !== '  ' && !this.shapeObject.labels.find(element => {
    //     return element.labelNodeId === this.time[0].value;
    //   })) {
    //     emiterData.labels.push(this.time);
    //   }
    //   if (this.code[6].value !== '  ' && !this.shapeObject.labels.find(element => {
    //     return element.labelNodeId === this.code[0].value;
    //   })) {
    //     emiterData.labels.push(this.code);
    //   }
    //   if (this.priority[6].value !== '  ' && !this.shapeObject.labels.find(element => {
    //     return element.labelNodeId === this.priority[0].value;
    //   })) {
    //     emiterData.labels.push(this.priority);
    //   }
    //
    // } else if (this.isArc) {
    //   if (this.annot[6].value !== '  ' && !this.shapeObject.labels.find(element => {
    //     return element.labelNodeId === this.annot[0].value;
    //   })) {
    //     emiterData.labels.push(this.annot);
    //   }
    // }

    // EmitterService.getAppMessageEmitter().emit(emiterData);
    this.eventService.send(Message.PROPERTY_UPDATE, emiterData);
  }


  clearData() {
    this.title = '';

    for (const t of this.tables) {
      t.data = [];
      // t.visible = false;
      // t.visible = this.selectedElement === t.id;
      if (this.selectedElement === t.id) {
        t.visible = true;
      }
    }
  }

  /**
   * Subscriber is awaiting data from other components
   */
  subscribeToProject() {
    this.eventService.on(Message.PROJECT_FILE_OPEN, (data) => {
      this.clearData();
      this.currentProjectModel = data.project;
    });

    this.eventService.on(Message.PROJECT_LOAD, (data) => {
      this.clearData();
      this.currentProjectModel = data.project;
    });

    this.eventService.on(Message.PAGE_OPEN, (data) => {
      console.log(this.constructor.name, 'Message.PAGE_OPEN, data = ', data);

      this.showPageAttrs(data.pageObject);
      // this.pageInModel = this.currentProjectModel.data.workspaceElements.cpnet.page.length ?
      //   this.currentProjectModel.data.workspaceElements.cpnet.page.find(e => {
      //     return e._id === data.pageObject.id;
      //   }) :
      //   this.currentProjectModel.data.workspaceElements.cpnet.page;
    });

    this.eventService.on(Message.SHAPE_SELECT, (data) => {
      console.log(this.constructor.name, 'Message.SHAPE_SELECT, data = ', data);

      if (data.pageJson) {
        // this.pageInModel = data.pageJson;
        console.log(this.constructor.name, 'Message.SHAPE_SELECT, data.pageJson = ', data.pageJson);
      }

      const selectedElement = data.element.type === 'cpn:Label' ? data.element.labelType : '';

      if (selectedElement !== '' && selectedElement !== this.selectedElement) {
        this.selectedElement = selectedElement;

        for (const t of this.tables) {
          t.visible = this.selectedElement === t.id;
        }
      }
      this.cpnElement = data.cpnElement;
      this.showShapeAttrs(data.element.type === 'cpn:Label' ? data.element.parent : data.element, data.cpnElement, data.type);
    });
  }


  /**
   * Forms a type of model attributes convenient for display on a component.
   * @param pageObject - model page object
   */
  showPageAttrs(pageObject) {
    console.log(this.constructor.name, 'showPageAttrs(), pageObject = ', pageObject);

    this.clearData();

    this.title = 'Page' + ' (id = ' + pageObject._id + ')';
    this.pageId = pageObject._id;

    const nodes = this.getTable('nodes').data;

    nodes.push({
      name: 'Page id',
      // value: pageObject['@attributes'].id
      value: pageObject._id
    });

    nodes.push({
      name: 'Page name',
      // value: pageObject.pageattr['@attributes'].name
      value: pageObject.pageattr._name
    });
  }

  /**
   * get Type of Label and use it for get label dataset
   * @param label - model label object
   */
  // getLabelProperties(label): any {
  //   let labelElem;
  //
  //   labelElem = this[label.labelType];
  //
  //   // switch (label.labelType) {
  //   //   case 'type':
  //   //     labelElem = this.type;
  //   //     break;
  //   //   case 'initmark':
  //   //     labelElem = this.initmark;
  //   //     break;
  //   //   case 'cond':
  //   //     labelElem = this.cond;
  //   //     break;
  //   //   case 'time':
  //   //     labelElem = this.time;
  //   //     break;
  //   //   case 'code':
  //   //     labelElem = this.code;
  //   //     break;
  //   //   case 'priority':
  //   //     labelElem = this.priority;
  //   //     break;
  //   //   case 'annot':
  //   //     labelElem = this.annot;
  //   //     break;
  //   //   default:
  //   // }
  //
  //   return labelElem;
  // }


  /**
   * function that fills the data setd for fields in the properties panel
   * @param shapeObject - model shape object
   */
  showShapeAttrs(shapeObject, cpnElement, elementType) {
    console.log(this.constructor.name, 'showShapeAttrs(), shapeObject = ', shapeObject, cpnElement);
    this.elementType = elementType;
    this.clearData();

    this.shapeObject = shapeObject;
    let type = elementType;///shapeObject.type.replace(/^bpmn:/, '');
    type = type.replace(/^cpn:/, '');

    // this.title = type;
    this.title = type + ' (id = ' + shapeObject.id + ')';

    // this.nodes = [];
    // this.commonNodes = [];

    this.isPlace = shapeObject.type === 'cpn:Place';
    this.isTrans = shapeObject.type === 'cpn:Transition';
    this.isArc = shapeObject.type === 'cpn:Connection';

    const commonNodes = this.getTable('commonNodes').data;
    const nodes = this.getTable('nodes').data;

    // // // clear label tables
    // for (const t of this.tables) {
    //   // t.visible = this.selectedElement === t.id;
    // }

    // if (!this.pageInModel) {
    //   this.pageInModel = this.currentProjectModel.data.workspaceElements.cpnet.page.length
    //     ?
    //     this.currentProjectModel.data.workspaceElements.cpnet.page.find(e => {
    //       return e._id === this.pageId;
    //     })
    //     :
    //     this.currentProjectModel.data.workspaceElements.cpnet.page;
    // }
    const pageInModel = this.modelService.getPageById(this.pageId);

    // let pageInModel =  this.pageInModel;
    // let pageInModel = this.currentProjectModel.data.workspaceElements.cpnet.page.length ?
    //   this.currentProjectModel.data.workspaceElements.cpnet.page.find(element => {
    //   return element._id === this.pageId;
    // }) : this.currentProjectModel.data.workspaceElements.cpnet.page;

    //  this.pageInModel = pageInModel;
    let  elementShape = undefined;
    if(elementType !== 'cpn:Connection') {
      elementShape = elementType === 'cpn:Transition' ? 'box' : 'ellipse';
    }
    nodes.push({name: 'Id', value: cpnElement._id, hide: true, path:  'cpnElement._id' });
    nodes.push({name: 'Name', value: cpnElement.text, path:  'cpnElement.text' });
    nodes.push({name: 'Type', value: elementType, hide: true});
    nodes.push({name: 'X', value: cpnElement.posattr._x, path:  'cpnElement.posattr._x' });
    nodes.push({name: 'Y', value: cpnElement.posattr._y, path:  'cpnElement.posattr._y' });
    nodes.push({name: 'Width', value: elementShape  ? cpnElement[elementShape]._w :  ' - ', path:  elementShape ? 'cpnElement' + elementShape + '._w' : undefined });
    nodes.push({name: 'Height', value: elementShape ?  cpnElement[elementShape]._h : ' - ' , path:  elementShape ? 'cpnElement' + elementShape + '._h' : undefined });
    nodes.push({name: 'Stroke', value: cpnElement.lineattr._colour, path:  'cpnElement.lineattr._colour' });
    nodes.push({name: 'strokeWidth', value: cpnElement.lineattr._thick, path:  'cpnElement.lineattr._thick' });
    nodes.push({name: 'BackGround', value: cpnElement.fillattr._colour, path:  'cpnElement.fillattr._colour' });
    commonNodes.push( {name: 'Name', value: cpnElement.text, path: 'cpnElement.text'} );


    /*nodes.push({name: 'Id', value: type === 'cpn:Label' ? shapeObject.labelNodeId : shapeObject.id, hide: true});
    nodes.push(type === 'cpn:Label' ? {name: 'Text', value: shapeObject.text} : {name: 'Name', value: shapeObject.name});
    nodes.push({name: 'Type', value: type === 'cpn:Label' ? shapeObject.labelType : type, hide: true});
    nodes.push({name: 'X', value: shapeObject.x});
    nodes.push({name: 'Y', value: shapeObject.y});
    nodes.push({name: 'Width', value: shapeObject.width});
    nodes.push({name: 'Height', value: shapeObject.height});
    nodes.push({name: 'Stroke', value: shapeObject.stroke});
    nodes.push({name: 'strokeWidth', value: shapeObject.strokeWidth});
    commonNodes.push(type === 'cpn:Label' ? {name: 'Text', value: shapeObject.text} : {name: 'Name', value: shapeObject.name});*/
    let labelElem;

    // labels
    // this.initmark = [];
    // this.type = [];
    // this.cond = [];
    // this.time = [];
    // this.code = [];
    // this.priority = [];
    // this.annot = [];
    for (const label of this.modelService.getLabelEntry()[this.modelService.getModelCase(elementType)]) {
      // labelElem = this.getLabelProperties(label);

      const t = this.getTable(label);
      if (t) {
        labelElem = t.data;
        labelElem.push({name: 'Id', value: cpnElement[label]._id, hide: true, path:  'cpnElement.' + label + '._id'});
        labelElem.push({name: 'Type', value: type, hide: true});
        labelElem.push({name: 'X', value: cpnElement[label].posattr._x,  path:  'cpnElement.' + label + '.posattr._x'});
        labelElem.push({name: 'Y', value: cpnElement[label].posattr._y,  path:  'cpnElement.' + label + '.posattr._y'});
        //labelElem.push({name: 'Width', value: label.width});
        //labelElem.push({name: 'Height', value: label.height});
        labelElem.push({name: 'Text', value: cpnElement[label].text.__text ? cpnElement[label].text.__text : this.projectService.appSettings[label], path:  'cpnElement.' + label + '.text.__text'});
        labelElem.push({name: 'Stroke', value: cpnElement[label].lineattr._colour, path:  'cpnElement.' + label + '.lineattr._colou'});
        labelElem.push({name: 'strokeWidth', value: cpnElement[label].lineattr._thick,  path:  'cpnElement.' + label + '.lineattr._thick'});
        labelElem.push({name: 'BackGround', value: cpnElement[label].fillattr._colour,  path:  'cpnElement.' + label + '.fillattr._colour'});
        commonNodes.push({name: label, value: cpnElement[label].text.__text ? cpnElement[label].text.__text : this.projectService.appSettings[label],  path:  'cpnElement.' + label + '.text.__text'});
      }
    }
    commonNodes.push({name: 'Stroke', value: cpnElement.lineattr._colour, path: 'cpnElement.lineattr._colour' });
    /*for (const label of shapeObject.labels) {
      // labelElem = this.getLabelProperties(label);

      const t = this.getTable(label.labelType);
      if (t) {
        labelElem = t.data;
        labelElem.push({name: 'Id', value: label.labelNodeId, hide: true});
        labelElem.push({name: 'Type', value: label.labelType, hide: true});
        labelElem.push({name: 'X', value: label.x});
        labelElem.push({name: 'Y', value: label.y});
        labelElem.push({name: 'Width', value: label.width});
        labelElem.push({name: 'Height', value: label.height});
        labelElem.push({name: 'Text', value: label.text});
        labelElem.push({name: 'Stroke', value: label.stroke});
        commonNodes.push({name: label.labelType, value: label.text});
      }
    }
    commonNodes.push({name: 'Stroke', value: shapeObject.stroke});

    let labelInModel;
    if (this.isPlace) {
      labelInModel = pageInModel.place.length ? pageInModel.place.find(function (e) {
        return e._id === shapeObject.id;
      }) : pageInModel.place;

      if (labelInModel) {
        // if (this.initmark.length === 0) {
        //   this.setEmptyLabels(this.initmark, labelInModel.initmark, 'initmark');
        // }
        // if (this.type.length === 0) {
        //   this.setEmptyLabels(this.type, labelInModel.type, 'type');
        // }
        this.setEmptyLabels('initmark', labelInModel.initmark);
        this.setEmptyLabels('type', labelInModel.type);
      }
    } else if (this.isTrans) {
      labelInModel = pageInModel.trans.length ? pageInModel.trans.find(function (e) {
        return e._id === shapeObject.id;
      }) : pageInModel.trans;

      if (labelInModel) {
        // if (this.cond.length === 0) {
        //   this.setEmptyLabels(this.cond, labelInModel.cond, 'cond');
        // }
        // if (this.time.length === 0) {
        //   this.setEmptyLabels(this.time, labelInModel.time, 'time');
        // }
        // if (this.code.length === 0) {
        //   this.setEmptyLabels(this.code, labelInModel.code, 'code');
        // }
        // if (this.priority.length === 0) {
        //   this.setEmptyLabels(this.priority, labelInModel.priority, 'priority');
        // }
        this.setEmptyLabels('cond', labelInModel.cond);
        this.setEmptyLabels('time', labelInModel.time);
        this.setEmptyLabels('code', labelInModel.code);
        this.setEmptyLabels('priority', labelInModel.priority);
      }
    } else if (this.isArc) {
      labelInModel = pageInModel.arc.length ? pageInModel.arc.find(function (e) {
        return e._id === shapeObject.id;
      }) : pageInModel.arc;

      // if (labelInModel) {
      //   this.setEmptyLabels(this.annot, labelInModel.annot, 'annot');
      // }

      this.setEmptyLabels('annot', labelInModel.annot);
    }

    const commonNodesOrder = this.commonNodesOrder;
    const typeElem = this.isTrans ? 'trans' : 'place';
    commonNodes.sort(function (a, b) {
      const keyA: any = commonNodesOrder[typeElem][a.name] ? commonNodesOrder[typeElem][a.name] : 0;
      const keyB: any = commonNodesOrder[typeElem][b.name] ? commonNodesOrder[typeElem][b.name] : 0;
      return keyA - keyB;
    });
    console.log(this.constructor.name, 'showShapeAttrs(), commonNodes = ', commonNodes);

    console.log(this.constructor.name, 'showShapeAttrs(), this.tables = ', this.tables);*/
  }

  /**
   * function to fill in empty labels
   * @param labelElem - label model-editor element
   * @param content - label from source json
   * @param type - label type
   */

  setEmptyLabels(id, content) {
    console.log(this.constructor.name, 'setEmptyLabels(), id = ', id);

    const t = this.getTable(id);

    if (t.data.length === 0) {
      let bounds = {
        width: 200, // 90,
        height: 30,
        x: content.posattr._x,
        y: content.posattr._y
      };
      const textRend = new TextRenderer();
      bounds = textRend.getExternalLabelBounds(bounds, '');
      t.data.push({name: 'Id', value: content._id, hide: true});
      t.data.push({name: 'Type', value: id, hide: true});
      t.data.push({name: 'X', value: 1 * content.posattr._x + Math.round(bounds.width) / 2});
      t.data.push({name: 'Y', value: -1 * content.posattr._y - Math.round(bounds.height) / 2});
      t.data.push({name: 'Width', value: 0});
      t.data.push({name: 'Height', value: 0});
      // t.data.push({name: 'Text', value: '  '});
      t.data.push({name: 'Text', value: '  '});
      t.data.push({name: 'Stroke', value: 'Black'});
    }
  }

  // setEmptyLabels(labelElem, content, type) {
  //   console.log(this.constructor.name, 'setEmptyLabels(), labelElem = ', labelElem);
  //
  //   let bounds = {
  //     width: 200, // 90,
  //     height: 30,
  //     x: content.posattr._x,
  //     y: content.posattr._y
  //   };
  //   const textRend = new TextRenderer();
  //   bounds = textRend.getExternalLabelBounds(bounds, '');
  //   labelElem.push({name: 'Id', value: content._id, hide: true});
  //   labelElem.push({name: 'Type', value: type, hide: true});
  //   labelElem.push({name: 'X', value: 1 * content.posattr._x + Math.round(bounds.width) / 2});
  //   labelElem.push({name: 'Y', value: -1 * content.posattr._y - Math.round(bounds.height) / 2});
  //   labelElem.push({name: 'Width', value: 0});
  //   labelElem.push({name: 'Height', value: 0});
  //   labelElem.push({name: 'Text', value: '  '});
  //   labelElem.push({name: 'Stroke', value: 'Black'});
  // }


}
