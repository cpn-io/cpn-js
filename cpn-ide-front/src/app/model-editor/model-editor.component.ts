import { Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';

import { assign } from 'min-dash';
import Diagram from 'diagram-js';
import CpnDiagramModule from '../../lib/cpn-js/core';

import { EmitterService } from '../services/emitter.service';
import { HttpClient } from '@angular/common/http';
import { Message } from '../common/message';
import { EventService } from '../services/event.service';
import { ModelService } from '../services/model.service';

import { importCpnPage } from '../../lib/cpn-js/import/Importer';


@Component({
  selector: 'app-model-editor',
  templateUrl: './model-editor.component.html',
  styleUrls: ['./model-editor.component.scss']
})
export class ModelEditorComponent implements OnInit {

  constructor(private eventService: EventService,
    private emitterService: EmitterService,
    private http: HttpClient,
    private modelService: ModelService) {
  }

  @ViewChild('container') containerElementRef: ElementRef;
  @Input() id: string;


  diagram: Diagram;
  elementFactory;
  canvas;
  dragging;
  modeling;
  labelEditingProvider;
  textRenderer;

  jsonPageObject;
  // subscription: Subscription;
  subpages = [];
  placeShapes = [];
  transShapes = [];
  arcShapes = [];
  curentElement;
  pageId;
  transCount = 0;

  correctColor = {
    'Fucia': '#f0f'
  };

  ngOnInit() {
    this.subscripeToAppMessage();


    // this.diagram = new Diagram({
    //   container: this.containerElementRef.nativeElement
    // });

    this.diagram = new Diagram({
      canvas: {
        container: this.containerElementRef.nativeElement
      },
      modules: [
        CpnDiagramModule,
      ]
    });

    const eventBus = this.diagram.get('eventBus');

    // eventBus.on('element.hover', (event) => {
    //   if (event.element.type === 'cpn:Transition' ||
    //     event.element.type === 'cpn:Place') {
    //     this.eventService.send(Message.SHAPE_HOVER, {element: event.element});
    //   }
    // });
    // eventBus.on('element.out', (event) => {
    //   if (event.element.type === 'cpn:Transition' ||
    //     event.element.type === 'cpn:Place') {
    //     this.eventService.send(Message.SHAPE_OUT, {element: event.element});
    //   }
    // });

    eventBus.on('element.click', (event) => {
     /* if(event.element.type === 'cpn:Place') {
        this.emitterService.getMarking(event.element.id).subscribe(
          (data: any) => {
            let dlog = data;
            console.log('daTA ', dlog);
          })
      } else {
        this.emitterService.makeStep( event.element.id).subscribe(
          (data: any) => {
            let datalog = data;
            console.log('daTA ', datalog);
          })
      }*/

      this.emitterService.getMarking(undefined).subscribe(
        (data: any) => {
          let dlog = data;
          console.log('daTA ', dlog);
        })
      // this.emitterService.getEnableTransitions(event.element.id).subscribe(
      //   (data: any) => {
      //     let datalog = data;
      //     console.log('daTA ', datalog);
      //   })
      // console.log('click on, event = ', event);
      this.fireSelectionEvent(event);
    });

    // eventBus.on('drag.init', (event) => {
    //   // console.log('click on, event = ', event);
    //   this.fireAllEvents(event);
    // });
    // eventBus.on('autoPlace', (event) => {
    //   // console.log('click on, event = ', event);
    //   this.fireAllEvents(event);
    // });
    // eventBus.on('element.mousedown', (event) => {
    //   // console.log('click on, event = ', event);
    //   this.fireAllEvents(event);
    // });
    // eventBus.on('popupMenu.open', (event) => {
    //   // console.log('click on, event = ', event);
    //   this.fireAllEvents(event);
    // });
    // eventBus.on('canvas.viewbox.changing', (event) => {

    //   // console.log('click on, event = ', event);
    //   this.fireAllEvents(event);
    // });


    // eventBus.on('shape.move.end', (event) => {
    //   console.log('shape.move.end event fired');
    //   this.shapeMoveJsonSaver(event);
    // });
    // eventBus.on(['create.end', 'autoPlace'], (event, context) => {
    //   if (event.type === 'autoPlace') {
    //     event.shape.x = event.source.x + 1.8 * event.source.width;
    //     event.shape.y = event.source.y;
    //   }
    //   if (event.shape.type === 'cpn:Transition') {
    //     this.createTransitionInModel(event.shape);
    //   } else {
    //     this.createPlaceInModel(event.shape);
    //   }

    // });

    // eventBus.on('modelEditor.deleteElement', (event, element, connection) => {
    //   console.log(element);
    //   console.log(connection);
    //   switch (element.type) {
    //     case 'cpn:Place':
    //       if (!this.jsonPageObject.place.length || this.jsonPageObject.place.length === 1) {
    //         this.jsonPageObject.place = [];
    //       } else {
    //         this.jsonPageObject.place = this.jsonPageObject.place.filter(elem => elem._id !== element.id);
    //       }
    //       delete this.placeShapes[element.id];
    //       break;
    //     case 'cpn:Transition':
    //       if (!this.jsonPageObject.trans.length || this.jsonPageObject.trans.length === 1) {
    //         this.jsonPageObject.trans = [];
    //       } else {
    //         this.jsonPageObject.trans = this.jsonPageObject.trans.filter(elem => elem._id !== element.id);
    //       }
    //       delete this.transShapes[element.id];
    //       break;
    //     case 'cpn:Connection':
    //       if (!this.jsonPageObject.arc.length || this.jsonPageObject.arc.length === 1) {
    //         this.jsonPageObject.arc = [];
    //       } else {
    //         this.jsonPageObject.arc = this.jsonPageObject.arc.filter(elem => elem._id !== element.id);
    //       }
    //       this.arcShapes = this.arcShapes.filter(arc => arc.id !== element.id);
    //       break;
    //     default:

    //   }
    //   connection.forEach(conid => {
    //     if (!this.jsonPageObject.arc.length || this.jsonPageObject.arc.length === 1) {
    //       this.jsonPageObject.arc = [];
    //     } else {
    //       this.jsonPageObject.arc = this.jsonPageObject.arc.filter(elem => elem._id !== conid);
    //     }
    //     this.arcShapes = this.arcShapes.filter(arc => arc.id !== conid);
    //   });
    // });

    // eventBus.on('commandStack.connection.create.execute', (event) => {
    //   // this.createPlaceInModel(event.shape);
    //   // this.createTransitionInModel(event.shape);
    //   console.log('created arcs');
    //   if (!this.jsonPageObject.arc.find(element => element._id === event.context.connection.id)) {
    //     this.createArcsInModel(event.context);
    //   }

    // });


    // eventBus.on('directEditing.cancel', (event) => {
    //   if (event.active.element.type === 'cpn:Transition' && event.active.element.hierar === 'subPage') {
    //     const subp = this.subpages.find(sp => sp.tranid === event.active.element.id);
    //     if (subp && subp.name !== event.active.element.name) {
    //       subp.name = event.active.element.name;
    //       this.changeSubPageName(subp);
    //     }
    //   }
    //   this.modelUpdate();
    // });

    // eventBus.on('directEditing.Enter', (event) => {
    //   // console.log('click on, event = ', event);
    //   console.log('ENTER!!!!!!!!');
    // });
    // eventBus.on('ContextPadProvider.createlabel', (event, element, context) => {
    //   console.log('GET EVENT ADD LABEL = ', event);
    //   this.addLabelEvent(event, element, context);
    // });


    // this.eventService.on(Message.CHANGE_NAME_PAGE, (data) => {
    //   if (data.changedElement === 'page' && data.parentPage === this.jsonPageObject.pageattr._name) {
    //     const tran = this.transShapes[this.subpages.find(e => e.subpageid = data.id).tranid];
    //     if (tran) {
    //       tran.name = data.name;
    //       // tran.businessObject.name =  tran.name;
    //       this.canvas.removeShape(tran);
    //       this.canvas.addShape(tran, this.canvas.getRootElement());
    //       for (const lab of tran.labels) {
    //         this.canvas.removeShape(lab);
    //         if (lab.text) {
    //           this.canvas.addShape(lab, tran);
    //         }
    //       }
    //       this.applyPageChanges();
    //     }
    //   }
    // });

    // this.eventService.on(Message.SUBPAGE_CREATE, (data) => {
    //   let attrs;
    //   let shape;
    //   if (data.parentid === this.pageId) {
    //     if (data.object) {
    //       attrs = this.getTransShapeAttrs(data.object);
    //       shape = this.elementFactory.createShape(attrs);
    //       shape.cpnElement = data.object;
    //       shape = this.canvas.addShape(shape, this.canvas.getRootElement());
    //       this.subpages.push({ subpageid: data.id, tranid: shape.id, name: data.name });
    //       this.transShapes[attrs.id] = shape;
    //     } else {
    //       /***create trasition***/
    //       const bounds = this.canvas.viewbox();
    //       attrs = {
    //         type: 'cpn:Transition',
    //         // id: obj["@attributes"].id,
    //         id: 'ID' + new Date().getTime(),
    //         x: bounds.x + bounds.width / 2,
    //         y: bounds.y + bounds.height / 2,
    //         width: 100,
    //         height: 80,
    //         name: data.name,
    //         stroke: 'Black',
    //         strokeWidth: 1,
    //         hierar: 'subPage'
    //         // businessObject: {
    //         //   text: obj.text,
    //         // }
    //       };

    //       shape = this.elementFactory.createShape(attrs);
    //       shape = this.canvas.addShape(shape, this.canvas.getRootElement());
    //       this.subpages.push({ subpageid: data.id, tranid: shape.id, name: data.name });
    //       this.transShapes[attrs.id] = shape;
    //       this.createTransitionInModel(shape);
    //     }
    //   }
    // });


    // this.eventService.on(Message.DELETE_PAGE, (data) => {  /// {id: node.id, parent: node.parent.data.name}
    //   if (data.parent === this.jsonPageObject.pageattr._name) {
    //     const tran = this.transShapes[this.subpages.find(e => e.subpageid = data.id).tranid];
    //     if (tran) {
    //       if (!this.jsonPageObject.trans.length || this.jsonPageObject.trans.length === 1) {
    //         this.jsonPageObject.trans = [];
    //       } else {
    //         this.jsonPageObject.trans = this.jsonPageObject.trans.filter(elem => elem._id !== tran.id);
    //       }
    //       delete this.transShapes[tran.id];
    //       this.canvas.removeShape(tran);
    //     }
    //   } else if (this.jsonPageObject._id === data.id) {
    //     this.canvas._clear();
    //   }
    // });

    const that = this;
    // this.diagram.createDiagram(function () {
    //   // that.loadTestModel();
    // });

    this.elementFactory = this.diagram.get('elementFactory');
    this.dragging = this.diagram.get('dragging');
    this.canvas = this.diagram.get('canvas');
    this.modeling = this.diagram.get('modeling');
    this.labelEditingProvider = this.diagram.get('labelEditingProvider');
    this.textRenderer = this.diagram.get('textRenderer');

    this.modeling.setDefaultValue('type', 'UINT');
    this.modeling.setDefaultValue('initmark', 'INIT MARK');

    this.modeling.setDefaultValue('cond', '[]');
    this.modeling.setDefaultValue('time', '@+');
    this.modeling.setDefaultValue('code', 'input();\noutput();\naction();\n');
    this.modeling.setDefaultValue('priority', 'P_NORMAL');

    this.modeling.setDefaultValue('annot', 'expr');
  }

  subscripeToAppMessage() {
    // this.subscription = EmitterService.getAppMessageEmitter().subscribe((data: any) => {
    //   if (data && data.id && !this.jsonPageObject) {
    //     if (data.id === Constants.ACTION_PROJECT_LOAD_DATA) {
    //       console.log('TESTTTEMIT');
    //       if (data.project) {
    //         this.jsonPageObject = data.project;
    //         console.log(data.project);
    //       }
    //     }
    //   } else if (data && data.id === Constants.ACTION_PROPERTY_UPDATE) {
    //     this.applyPropertyUpdateChanges(data);
    //   }
    // });

    // Subscribe on project load eventelement.height
    /*this.eventService.on(Message.PROJECT_LOAD, (data) => {
      if (data.project) {
        this.jsonPageObject = data.project;
        // console.log(data.project);
      }
    });*/

    // Subscribe on property update event
    this.eventService.on(Message.PROPERTY_UPDATE, (data) => {

      console.log('PROPERTY_UPDATE, data = ', data);

      const element = this.modeling.getElementByCpnElement(data.cpnElement);
      console.log('PROPERTY_UPDATE, element = ', element);

      this.modeling.updateElement(element);

      this.modelUpdate();

      // if (data.pagename === this.modelService.getPageById(this.pageId).pageattr._name) {
      // let testElem;
      /*for (let elem of data.element.labels) {
        testElem = data.labels.find(lab => elem.id === lab[0].value);
        if (testElem)  break;
      }*/
      /*  const testElem = data.element.labels.find(elem => data.labels.find(lab => elem.labelNodeId === lab[0].value));
      /  if (!testElem) {
          this.applyPropertyUpdateChanges(data);
        }*/
      // let element = this.modeling.getElementByCpnElement(data.cpnElement);
      // console.log('PROPERTY_UPDATE, element = ', element);

      // // let entry;
      // let attrs;
      // if (data.type === 'cpn:Place') {
      //   // entry = this.placeShapes;
      //   // element = entry[data.elementid];
      //   attrs = this.getPlaceShapeAttrs(element.cpnElement);
      // } else if (data.type === 'cpn:Transition') {
      //   // entry = this.transShapes;
      //   // element = entry[data.elementid];
      //   attrs = this.getTransShapeAttrs(element.cpnElement);
      // } else if (data.type === 'cpn:Connection') {
      //   // entry = this.arcShapes;
      //   // element = entry.find(elem => elem.id === data.elementid);
      //   attrs = this.getConnectionAttrs(element.cpnElement, this.modelService.getPageById(this.pageId));
      // }
      // // this.diagram.get('eventBus').fire('elements.changed', { elements: [element] });

      // // this.canvas.removeShape(element);
      // // let shape;
      // // if (data.type !== 'cpn:Connection') {
      // //   shape = this.elementFactory.createShape(attrs);
      // //   shape.cpnElement = element.cpnElement;
      // //   shape = this.canvas.addShape(shape, this.canvas.getRootElement());
      // // } else {
      // //   shape = this.modeling.connect(attrs.source, attrs.target, attrs.attrs, null);
      // // }
      // // for (let label of this.modelService.getLabelEntry()[this.modelService.getModelCase(data.type)]) {
      // //   this.addShapeLabel(shape, element.cpnElement[label], label);
      // // }

      // // if (entry instanceof Array) {
      // //   entry.push(shape);
      // // } else {
      // //   entry[attrs.id] = shape;
      // // }

      // // this.addShapeLabel(shape, place.type, 'type');
      // // this.addShapeLabel(shape, place.initmark, 'initmark');
      // // this.eventService.send(Message.SHAPE_SELECT, { element: element, cpnElement: element.cpnElement, type: element.type });
      // }
    });

    this.eventService.on(Message.MODEL_ERROR, (data) => {
      if (data) {
        let shape;

        const placeShapes = this.placeShapes;
        const transShapes = this.transShapes;
        const canvas = this.canvas;

        // Object.keys(placeShapes).forEach(function (key) {
        //   shape = placeShapes[key];
        //   if (shape.iserror) {
        //     shape.iserror = false;
        //     canvas.removeShape(shape);
        //     canvas.addShape(shape, canvas.getRootElement());
        //     for (const lab of shape.labels) {
        //       canvas.removeShape(lab);
        //       if (lab.text) {
        //         canvas.addShape(lab, shape);
        //       }
        //     }
        //   }
        // });
        // Object.keys(transShapes).forEach(function (key) {
        //   shape = transShapes[key];
        //   if (shape.iserror) {
        //     shape.iserror = false;
        //     canvas.removeShape(shape);
        //     canvas.addShape(shape, canvas.getRootElement());
        //     for (const lab of shape.labels) {
        //       canvas.removeShape(lab);
        //       if (lab.text) {
        //         canvas.addShape(lab, shape);
        //       }
        //     }
        //   }

        // });
        // for (const arc of this.arcShapes) {
        //   arc.iserror = false;
        //   this.canvas.removeShape(arc);
        //   this.canvas.addConnection(arc, this.canvas.getRootElement());
        //   for (const lab of arc.labels) {
        //     canvas.removeShape(lab);
        //     if (lab.text) {
        //       canvas.addShape(lab, arc);
        //     }
        //   }
        // }

        this.modeling.clearErrorMarking();

        for (const id of data.id) {

          const cpnElementId = id.trim().slice(0, -1);

          const element = this.modeling.getElementByCpnElementId(cpnElementId);
          console.log('MODEL_ERROR, element = ', element);

          if (element) {
            element.iserror = true;
            this.modeling.updateElement(element);
          }

          // shape = this.placeShapes[(id.trim()).slice(0, -1)];
          // if (shape && shape.id) {
          //   shape.iserror = true;
          //   canvas.removeShape(shape);
          //   canvas.addShape(shape, canvas.getRootElement());
          //   for (const lab of shape.labels) {
          //     canvas.removeShape(lab);
          //     if (lab.text) {
          //       canvas.addShape(lab, shape);
          //     }
          //   }
          // }
          // shape = this.transShapes[(id.trim()).slice(0, -1)];
          // if (shape && shape.id) {
          //   shape.iserror = true;
          //   canvas.removeShape(shape);
          //   canvas.addShape(shape, canvas.getRootElement());
          //   for (const lab of shape.labels) {
          //     canvas.removeShape(lab);
          //     if (lab.text) {
          //       canvas.addShape(lab, shape);
          //     }
          //   }

          // }
          // shape = this.arcShapes.find(e => e.id === (id.trim()).slice(0, -1));
          // if (shape) {
          //   shape.iserror = true;
          //   this.canvas.removeShape(shape);
          //   this.canvas.addConnection(shape, this.canvas.getRootElement());
          //   for (const lab of shape.labels) {
          //     canvas.removeShape(lab);
          //     if (lab.text) {
          //       canvas.addShape(lab, shape);
          //     }
          //   }
          // }

        }
      }
    });
  }


  modelUpdate() {
    // const page = this.applyPageChanges();
    const page = this.jsonPageObject;

    //  console.log('actual data -------' + JSON.stringify(page));
    //  console.log('moddifi data -------' + JSON.stringify(this.placeShapes));
    // console.log(JSON.stringify(this.transShapes));
    // console.log( JSON.stringify(this.arcShapes));

    // EmitterService.getAppMessageEmitter().emit(
    //   {
    //     id: Constants.ACTION_MODEL_UPDATE,
    //     pageObject: page
    //   });
    // console.log('CANCEL!!!!!!!!');

    this.eventService.send(Message.MODEL_UPDATE, { pageObject: page });
  }

  changeSubPageName(subpage) {
    this.eventService.send(Message.CHANGE_NAME_PAGE, { id: subpage.subpageid, name: subpage.name, changedElement: 'tran' });
  }

  // /**
  //  *saving to model coordinates after moving
  //  * @param event
  //  */
  // shapeMoveJsonSaver(event) {
  //   let movingXmlElement;
  //   const page = this.jsonPageObject;
  //   const bounds = {
  //     width: 200, // 90,
  //     height: 30,
  //     x: event.shape.x,
  //     y: event.shape.y
  //   };
  //   switch (event.shape.type) {
  //     case 'cpn:Place':
  //       if (page.place.length) {
  //         page.place.forEach(movingXmlElement => {
  //           if (movingXmlElement._id === event.shape.id) {
  //             movingXmlElement.type.posattr._x = parseFloat(movingXmlElement.type.posattr._x) + (event.dx);
  //             movingXmlElement.type.posattr._y = parseFloat(movingXmlElement.type.posattr._y) + (-1 * event.dy);
  //             movingXmlElement.initmark.posattr._x = parseFloat(movingXmlElement.initmark.posattr._x) + (event.dx);
  //             movingXmlElement.initmark.posattr._y = parseFloat(movingXmlElement.initmark.posattr._y) + (-1 * event.dy);
  //           }
  //         });
  //       } else {
  //         page.place.type.posattr._x = parseFloat(page.place.type.posattr._x) + (event.dx);
  //         page.place.type.posattr._y = parseFloat(page.place.type.posattr._y) + (-1 * event.dy);
  //         page.place.initmark.posattr._x = parseFloat(page.place.initmark.posattr._x) + (event.dx);
  //         page.place.initmark.posattr._y = parseFloat(page.place.initmark.posattr._y) + (-1 * event.dy);
  //       }
  //       break;
  //     case 'cpn:Transition':
  //       if (page.trans.length) {
  //         page.trans.forEach(movingXmlElement => {
  //           if (movingXmlElement._id === event.shape.id) {
  //             movingXmlElement.cond.posattr._x = parseFloat(movingXmlElement.cond.posattr._x) + (event.dx);
  //             movingXmlElement.cond.posattr._y = parseFloat(movingXmlElement.cond.posattr._y) + (-1 * event.dy);
  //             movingXmlElement.priority.posattr._x = parseFloat(movingXmlElement.priority.posattr._x) + (event.dx);
  //             movingXmlElement.priority.posattr._y = parseFloat(movingXmlElement.priority.posattr._y) + (-1 * event.dy);
  //             movingXmlElement.time.posattr._x = parseFloat(movingXmlElement.time.posattr._x) + (event.dx);
  //             movingXmlElement.time.posattr._y = parseFloat(movingXmlElement.time.posattr._y) + (-1 * event.dy);
  //             movingXmlElement.code.posattr._x = parseFloat(movingXmlElement.code.posattr._x) + (event.dx);
  //             movingXmlElement.code.posattr._y = parseFloat(movingXmlElement.code.posattr._y) + (-1 * event.dy);
  //           }
  //         });
  //       } else {
  //         page.trans.cond.posattr._x = parseFloat(page.trans.cond.posattr._x) + (event.dx);
  //         page.trans.cond.posattr._y = parseFloat(page.trans.cond.posattr._y) + (-1 * event.dy);
  //         page.trans.priority.posattr._x = parseFloat(page.trans.priority.posattr._x) + (event.dx);
  //         page.trans.priority.posattr._y = parseFloat(page.trans.priority.posattr._y) + (-1 * event.dy);
  //         page.trans.time.posattr._x = parseFloat(page.trans.time.posattr._x) + (event.dx);
  //         page.trans.time.posattr._y = parseFloat(page.trans.time.posattr._y) + (-1 * event.dy);
  //         page.trans.code.posattr._x = parseFloat(page.trans.code.posattr._x) + (event.dx);
  //         page.trans.code.posattr._y = parseFloat(page.trans.code.posattr._y) + (-1 * event.dy);
  //       }
  //       break;
  //     case 'cpn:Connection':
  //       if (page.arc.length) {
  //         page.arc.forEach(movingXmlElement => {
  //           if (movingXmlElement._id === event.shape.id) {
  //             movingXmlElement.annot.posattr._x = parseFloat(movingXmlElement.annot.posattr._x) + (event.dx);
  //             movingXmlElement.annot.posattr._y = parseFloat(movingXmlElement.annot.posattr._y) + (-1 * event.dy);
  //           }
  //         });
  //       } else {
  //         page.arc.annot.posattr._x = parseFloat(page.arc.annot.posattr._x) + (event.dx);
  //         page.arc.annot.posattr._y = parseFloat(page.arc.annot.posattr._y) + (-1 * event.dy);
  //       }
  //       break;
  //     default:
  //   }
  //   // this.applyPageChanges();
  //   // let element = event.shape;
  //   this.eventService.send(Message.SHAPE_SELECT, { element: event.shape, pageJson: this.jsonPageObject });

  // }

  /**
   * saving the created arrow in the model json
   * @param element
   */
  createArcsInModel(element) {
    const page = this.jsonPageObject;
    console.log('actual data -------' + JSON.stringify(page.arc[0]));
    console.log('Created element PLACE' + element);

    const newArc = {
      posattr: {
        _x: 0.000000,
        _y: 0.000000
      },
      fillattr: {
        _colour: 'White',
        _pattern: '',
        _filled: false
      },
      lineattr: {
        _colour: 'Black',
        _thick: 1,
        _type: 'Solid'
      },
      textattr: {
        _colour: 'Black',
        _bold: false
      },
      arrowattr: {
        _headsize: 1.200000,
        _currentcyckle: 2
      },
      transend: {
        _idref: element.source.type === 'cpn:Place' ? element.target.id : element.source.id
      },
      placeend: {
        _idref: element.source.type === 'cpn:Place' ? element.source.id : element.target.id
      },
      annot: {
        posattr: {
          _x: (element.target.x + element.source.x) / 2,
          _y: -1 * (element.target.y + element.source.y) / 2
        },
        fillattr: {
          _colour: 'White',
          _pattern: 'Solid',
          _filled: false
        },
        lineattr: {
          _colour: 'Black',
          _thick: 0,
          _type: 'Solid'
        },
        textattr: {
          _colour: 'Black',
          _bold: false
        },
        text: {
          _tool: 'CPN Tools',
          _version: '4.0.1',
          __text: 'annot'
        },
        _id: element.connection.id + 'a'
      },
      _id: element.connection.id,
      _orientation: element.source.type === 'cpn:Place' ? 'PtoT' : 'TtoP',
      _order: 1
    };

    element.connection.stroke = newArc.lineattr._colour;
    element.connection.strokeWidth = newArc.lineattr._thick;
    this.arcShapes.push(element.connection);
    //  this.labelEditingProvider.update(element.connection, '');
    ///  this.addShapeLabel(element.connection, newArc.annot, 'annot');
    this.jsonPageObject.arc.push(newArc);
    // this.modelUpdate();


  }


  /**
   * saving the created place in the model json
   * @param element
   */
  createPlaceInModel(element) {
    const page = this.jsonPageObject;
    console.log('actual data -------' + JSON.stringify(page.place[1]));
    console.log('Created element PLACE' + element);
    let bounds = {
      width: 200, // 90,
      height: 30,
      x: element.x,
      y: element.y
    };
    bounds = this.textRenderer.getExternalLabelBounds(bounds, 'AVert');
    const newPlace = {
      posattr: {
        _x: element.x, // -294.000000
        _y: element.y  // 156.000000
      },
      fillattr: {
        _colour: 'White',
        _pattern: '',
        _filled: false
      },
      lineattr: {
        _colour: 'Black',
        _thick: 1,
        _type: 'Solid'
      },
      textattr: {
        _colour: 'Black',
        _bold: false
      },
      text: '',
      ellipse: {
        _w: element.width,  // 74.000000,
        _h: element.height  // 70.000000
      },
      token: {
        _x: -80.000000,
        _y: -49.000000
      },
      marking: {
        snap: {
          _snap_id: 9,
          '_anchor.horizontal': 1,
          '_anchor.vertical': 3
        },
        _x: -4.000000,
        _y: -10.000000,
        _hidden: false
      },
      type: {
        posattr: {
          _x: element.x + Math.round(bounds.width) / 2 + element.width, /// 55.500000,
          _y: -1 * element.y - Math.round(bounds.height) / 2 - element.height// 102.000000
        },
        fillattr: {
          _colour: 'White',
          _pattern: 'Solid',
          _filled: false
        },
        lineattr: {
          _colour: 'Black',
          _thick: 0,
          _type: 'Solid'
        },
        textattr: {
          _colour: 'Black',
          _bold: false
        },
        text: {
          _tool: 'CPN Tools',
          _version: '4.0.1',
        },
        _id: element.id + 't' // 'ID1412328455'
      },
      initmark: {
        posattr: {
          _x: element.x + Math.round(bounds.width) / 2 + element.width,
          _y: -1 * element.y - Math.round(bounds.height) / 2
        },
        fillattr: {
          _colour: 'White',
          _pattern: 'Solid',
          _filled: false
        },
        lineattr: {
          _colour: 'Black',
          _thick: 0,
          _type: 'Solid'
        },
        textattr: {
          _colour: 'Black',
          _bold: false
        },
        text: {
          _tool: 'CPN Tools',
          _version: '4.0.1'
        },
        _id: element.id + 'i'  // 'ID1412331086'
      },
      _id: element.id // 'ID1412328424'
    };
    // let attrs = this.getPlaceShapeAttrs(newPlace);
    //  let shape = this.elementFactory.createShape(attrs);
    // shape = this.canvas.addShape(shape, this.canvas.getRootElement());

    element.name = newPlace.text;
    element.stroke = newPlace.lineattr._colour;
    element.strokeWidth = newPlace.lineattr._thick;
    //  this.placeShapes[attrs.id] = shape;
    this.placeShapes[element.id] = element;
    this.jsonPageObject.place.push(newPlace);
    // this.modelUpdate();


  }


  /**
   * saving the created transition in the model json
   * @param element
   */
  createTransitionInModel(element) {
    const page = this.jsonPageObject;
    console.log('actual data -------' + JSON.stringify(page.trans));
    console.log('Created element PLACE' + element);
    let bounds = {
      width: 200, // 90,
      height: 30,
      x: element.x,
      y: element.y
    };
    bounds = this.textRenderer.getExternalLabelBounds(bounds, 'AVert');
    const newTranc = {
      posattr: {
        _x: element.x,
        _y: element.y
      },
      fillattr: {
        _colour: 'White',
        _pattern: '',
        _filled: false
      },
      lineattr: {
        _colour: 'Black',
        _thick: 1,
        _type: 'solid'
      },
      textattr: {
        _colour: 'Black',
        _bold: false
      },
      text: '',
      box: {
        _w: element.width,
        _h: element.height
      },
      binding: {
        _x: 7.200000,
        _y: -3.000000
      },
      cond: {
        posattr: {
          _x: element.x + Math.round(bounds.width) / 2 - element.width / 4,
          _y: -1 * element.y - Math.round(bounds.height) / 2 + element.height / 4
        },
        fillattr: {
          _colour: 'White',
          _pattern: 'Solid',
          _filled: false
        },
        lineattr: {
          _colour: 'Black',
          _thick: 0,
          _type: 'Solid'
        },
        textattr: {
          _colour: 'Black',
          _bold: false
        },
        text: {
          _tool: 'CPN Tools',
          _version: '4.0.1'
        },
        _id: element.id + 'co'
      },
      time: {
        posattr: {
          _x: element.x + Math.round(bounds.width) / 2 + element.width, /// 55.500000,
          _y: -1 * element.y - Math.round(bounds.height) / 2 + element.height / 4 // 102.000000
        },
        fillattr: {
          _colour: 'White',
          _pattern: 'Solid',
          _filled: false
        },
        lineattr: {
          _colour: 'Black',
          _thick: 0,
          _type: 'Solid'
        },
        textattr: {
          _colour: 'Black',
          _bold: false
        },
        text: {
          _tool: 'CPN Tools',
          _version: '4.0.1'
        },
        _id: element.id + 'tm'
      },
      code: {
        posattr: {
          _x: element.x + Math.round(bounds.width) / 2 + element.width,
          _y: -1 * element.y - Math.round(bounds.height) / 2 - element.height
        },
        fillattr: {
          _colour: 'White',
          _pattern: 'Solid',
          _filled: false
        },
        lineattr: {
          _colour: 'Black',
          _thick: 0,
          _type: 'Solid'
        },
        textattr: {
          _colour: 'Black',
          _bold: false
        },
        text: {
          _tool: 'CPN Tools',
          _version: '4.0.1'
        },
        _id: element.id + 'cd'
      },
      priority: {
        posattr: {
          _x: element.x + Math.round(bounds.width) / 2 - element.width / 4,
          _y: -1 * element.y - Math.round(bounds.height) / 2 - element.height
        },
        fillattr: {
          _colour: 'White',
          _pattern: 'Solid',
          _filled: false
        },
        lineattr: {
          _colour: 'Black',
          _thick: 0,
          _type: 'Solid'
        },
        textattr: {
          _colour: 'Black',
          _bold: false
        },
        text: {
          _tool: 'CPN Tools',
          _version: '4.0.1'
        },
        _id: element.id + 'p'
      },
      _id: element.id,
      _explicit: false
    };
    // businessObject: {
    //   text: obj.text,
    // }
    element.name = newTranc.text;
    element.stroke = newTranc.lineattr._colour;
    element.strokeWidth = newTranc.lineattr._thick;
    element.hierar = element.hierar ? element.hierar : 'tran';
    if (element.hierar) {
      const subpage = this.subpages.find(e => e.tranid === newTranc._id);
      if (!element.name) {
        element.name = subpage && subpage.name ? subpage.name : '';
      }
      if (subpage) {
        newTranc['subst'] = {
          subpageinfo: {
            fillattr: { _colour: 'White', _pattern: 'Solid', _filled: 'false' },
            lineattr: { _colour: 'Black', _thick: '0', _type: 'Solid' },
            posattr: { _x: newTranc.posattr._x, _y: newTranc.posattr._y },
            textattr: { _colour: 'Black', _bold: 'false' },
            _id: newTranc._id + 'e',
            _name: 'Supplier'
          },                  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
          _portsock: '',     /// <<--------------------------------------------------------------------TO DO FILL THIS FIELD ARCS ID---------------------------------------------------------------------
          _subpage: subpage.subpageid ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        };
      }
    }
    this.transShapes[element.id] = element;
    if (this.jsonPageObject.trans.length || this.jsonPageObject.trans.length === 0) {
      this.jsonPageObject.trans.push(newTranc);
    } else {
      const curTran = this.jsonPageObject.trans;
      this.jsonPageObject.trans = [];
      this.jsonPageObject.trans.push(curTran);
      this.jsonPageObject.trans.push(newTranc);
    }
    // this.modelUpdate();
  }


  /**
   * saves changes that have been made  in the property panel to the current model json
   * @param data
   */
  // applyPropertyUpdateChanges(data) {
  //   let pos;
  //   let attrs;
  //   let textLabel;
  //   let newLabel;
  //   let elementForUpdate;
  //   if (data.element.type === 'cpn:Place') {
  //     this.placeShapes[data.element.id] = data.element;
  //     elementForUpdate = this.placeShapes[data.element.id];
  //     this.canvas.removeShape(elementForUpdate);
  //     this.canvas.addShape(elementForUpdate, this.canvas.getRootElement());
  //     for (const lab of elementForUpdate.labels) {
  //       this.canvas.removeShape(lab);
  //       if (lab.text.trim() !== '') {
  //         this.canvas.addShape(lab, elementForUpdate);
  //       }
  //     }
  //     for (let i = 0; i < elementForUpdate.labels.length; i++) {
  //       if (elementForUpdate.labels[i].text.trim() === '') {
  //         try {
  //           this.jsonPageObject.place.find(elem => elem._id === elementForUpdate.id)[elementForUpdate.labels[i].labelType].text.__text = undefined;
  //         } catch (err) {
  //           console.log('!!!!!!!!!' + err + '!!!!!!!!!!');
  //         }
  //         elementForUpdate.labels.splice(i, 1);
  //       }
  //     }
  //   } else if (data.element.type === 'cpn:Transition') {
  //     this.transShapes[data.element.id] = data.element;
  //     elementForUpdate = this.transShapes[data.element.id];
  //     this.canvas.removeShape(elementForUpdate);
  //     this.canvas.addShape(elementForUpdate, this.canvas.getRootElement());
  //     for (const lab of elementForUpdate.labels) {
  //       this.canvas.removeShape(lab);
  //       if (lab.text.trim() !== '') {
  //         this.canvas.addShape(lab, elementForUpdate);
  //       }
  //     }
  //     for (let i = 0; i < elementForUpdate.labels.length; i++) {
  //       if (elementForUpdate.labels[i].text.trim() === '') {
  //         try {
  //           this.jsonPageObject.place.find(elem => elem._id === elementForUpdate.id)[elementForUpdate.labels[i].labelType].text.__text = undefined;
  //         } catch (err) {
  //           console.log('!!!!!!!!!' + err + '!!!!!!!!!!');
  //         }
  //         elementForUpdate.labels.splice(i, 1);
  //       }
  //     }
  //   } else if ('cpn:Connection') {
  //     elementForUpdate = this.arcShapes.find(element => element.id === data.element.id);
  //     for (const lab of elementForUpdate.labels) {
  //       const labelbounds = {
  //         width: lab.width, // 90,
  //         height: lab.height,
  //         x: lab.x,
  //         y: lab.y
  //       };
  //       this.labelEditingProvider.update(elementForUpdate, lab.text, '', labelbounds);
  //     }
  //   }

  //   for (const label of data.labels) {
  //     pos = { x: 1.0 * label[2].value, y: -1.0 * label[3].value };
  //     attrs = { stroke: label[7].value, labelType: label[3].value };
  //     textLabel = label[6].value;
  //     pos = { x: label[2].value, y: label[3].value };
  //     attrs = { stroke: label[7].value, labelType: label[1].value };
  //     textLabel = label[6].value;
  //     newLabel = this.createLabel(elementForUpdate, textLabel, pos, attrs, label[0].value);
  //     newLabel.hidden = false;
  //     this.canvas.addShape(newLabel, elementForUpdate);
  //   }
  //   this.modelUpdate();
  //   this.eventService.send(Message.SHAPE_SELECT, { element: elementForUpdate });

  // }


  /**
   * saves all changes that have been made  in model-editor to the current model json
   * @param data
   *
   */
  applyPageChanges() {
    const page = this.jsonPageObject;
    // console.log('actual data -------' + JSON.stringify(page.place[0]));
    // console.log('moddifi data -------' + JSON.stringify(this.placeShapes[page.place[0]._id]));

    // console.log(JSON.stringify(this.transShapes));
    //  console.log( JSON.stringify(this.arcShapes));
    let bounds;
    let updatedPlace;
    if (!(page.place.length === 0 && !page.place._id)) {
      for (const place of page.place) {
        updatedPlace = this.placeShapes[place._id];
        place.posattr._x = updatedPlace.x + place.ellipse._w / 2;
        place.posattr._y = -1 * updatedPlace.y - place.ellipse._h / 2;
        place.ellipse._w = updatedPlace.width;
        place.ellipse._h = updatedPlace.height;
        place.lineattr._colour = updatedPlace.stroke;
        place.lineattr._thick = updatedPlace.strokeWidth;
        place.text = updatedPlace.name;

        for (const label of this.placeShapes[place._id].labels) {
          if (label.labelNodeId === place.type._id) {
            bounds = {
              width: 200, // 90,
              height: 30,
              x: place.type.posattr._x,
              y: place.type.posattr._y
            };
            bounds = this.textRenderer.getExternalLabelBounds(bounds, place.type.text.__text ? place.type.text.__text : '');
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
            bounds = this.textRenderer.getExternalLabelBounds(bounds, place.initmark.text.__text ? place.initmark.text.__text : '');
            place.initmark.lineattr._colour = label.stroke;
            place.initmark.posattr._x = label.x + Math.round(bounds.width) / 2;
            place.initmark.posattr._y = -1 * label.y - Math.round(bounds.height) / 2;
            place.initmark.text.__text = label.text;
          }
        }
      }
    }
    if (!(page.trans.length === 0 && !page.trans._id)) {
      let updatedTran;
      if (page.trans.length) {
        for (const tran of page.trans) {
          updatedTran = this.transShapes[tran._id];
          tran.posattr._x = updatedTran.x + tran.box._w / 2;
          tran.posattr._y = -1 * updatedTran.y - tran.box._h / 2;
          tran.box._w = updatedTran.width;
          tran.box._h = updatedTran.height;
          tran.lineattr._colour = updatedTran.stroke;
          tran.lineattr._thick = updatedTran.strokeWidth;
          tran.text = updatedTran.name;

          for (const label of this.transShapes[tran._id].labels) {
            if (label.labelNodeId === tran.cond._id) {
              bounds = {
                width: 200, // 90,
                height: 30,
                x: tran.cond.posattr._x,
                y: tran.cond.posattr._y
              };
              bounds = this.textRenderer.getExternalLabelBounds(bounds, tran.cond.text.__text ? tran.cond.text.__text : '');
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
              bounds = this.textRenderer.getExternalLabelBounds(bounds, tran.time.text.__text ? tran.time.text.__text : '');
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
              bounds = this.textRenderer.getExternalLabelBounds(bounds, tran.code.text.__text ? tran.code.text.__text : '');
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
              bounds = this.textRenderer.getExternalLabelBounds(bounds, tran.priority.text.__text ? tran.priority.text.__text : '');
              tran.priority.lineattr._colour = label.stroke;
              tran.priority.posattr._x = label.x + Math.round(bounds.width) / 2;
              tran.priority.posattr._y = -1 * label.y - Math.round(bounds.height) / 2;
              tran.priority.text.__text = label.text;
            }
          }
        }
      } else {
        const tran = page.trans;
        updatedTran = this.transShapes[tran._id];
        tran.posattr._x = updatedTran.x + tran.box._w / 2;
        tran.posattr._y = -1 * updatedTran.y - tran.box._h / 2;
        tran.box._w = updatedTran.width;
        tran.box._h = updatedTran.height;
        tran.lineattr._colour = updatedTran.stroke;
        tran.lineattr._thick = updatedTran.strokeWidth;
        tran.text = updatedTran.name;

        for (const label of this.transShapes[tran._id].labels) {
          if (label.labelNodeId === tran.cond._id) {
            bounds = {
              width: 200, // 90,
              height: 30,
              x: tran.cond.posattr._x,
              y: tran.cond.posattr._y
            };
            bounds = this.textRenderer.getExternalLabelBounds(bounds, tran.cond.text.__text ? tran.cond.text.__text : '');
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
            bounds = this.textRenderer.getExternalLabelBounds(bounds, tran.time.text.__text ? tran.time.text.__text : '');
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
            bounds = this.textRenderer.getExternalLabelBounds(bounds, tran.code.text.__text ? tran.code.text.__text : '');
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
            bounds = this.textRenderer.getExternalLabelBounds(bounds, tran.priority.text.__text ? tran.priority.text.__text : '');
            tran.priority.lineattr._colour = label.stroke;
            tran.priority.posattr._x = label.x + Math.round(bounds.width) / 2;
            tran.priority.posattr._y = -1 * label.y - Math.round(bounds.height) / 2;
            tran.priority.text.__text = label.text;
          }
        }

      }
    }
    if (!(page.arc.length === 0 && !page.arc._id)) {
      let uodatedCon;
      for (const arc of page.arc) {
        for (const modelArc of this.arcShapes) {
          if (modelArc.id === arc._id) {
            uodatedCon = modelArc;
          }
        }
        if (arc.bendpoint) {
          if (arc.bendpoint.length) {
            for (const point of arc.bendpoint) {
              for (const updWayPoint of uodatedCon.waypoints) {
                if (point._id === updWayPoint.id) {
                  point.posattr._x = updWayPoint.x;
                  point.posattr._y = -1 * updWayPoint.y;
                }
              }
            }
          } else {
            for (const updWayPoint of uodatedCon.waypoints) {
              if (arc.bendpoint._id === updWayPoint.id) {
                arc.bendpoint.posattr._x = updWayPoint.x;
                arc.bendpoint.posattr._y = -1 * updWayPoint.y;
              }
            }
          }

        }
        arc.lineattr._colour = uodatedCon.stroke;
        arc.lineattr._thick = uodatedCon.strokeWidth;
        for (const label of uodatedCon.labels) {
          if (label.labelNodeId === arc.annot._id) {
            bounds = {
              width: 200, // 90,
              height: 30,
              x: arc.annot.posattr._x,
              y: arc.annot.posattr._y
            };
            bounds = this.textRenderer.getExternalLabelBounds(bounds, arc.annot.text.__text ? arc.annot.text.__text : '');
            arc.annot.lineattr._colour = label.stroke;
            arc.annot.posattr._x = label.x + Math.round(bounds.width) / 2;
            arc.annot.posattr._y = -1 * label.y - Math.round(bounds.height) / 2;
            arc.annot.__text = label.text;
            arc.annot.text.__text = label.text;
          }

        }

      }
    }
    // this.eventService.send(Message.MODEL_UPDATE, {pageObject:  page});
    // EmitterService.getAppMessageEmitter().emit(
    //  {
    //    id: Constants.ACTION_MODEL_UPDATE,
    //    pageObject: page
    //  });
    return page;
  }

  /**
   * create label for element of model
   * @param event
   * @param element
   * @param context
   */
  // addLabelEvent(event, element, context): boolean {
  //   let isAdd = false;
  //   if (element.type === 'cpn:Transition') {
  //     if (context.type === 'cond') {
  //       const page = this.jsonPageObject;
  //       if (page.trans.length) {
  //         for (const tran of page.trans) {
  //           if (tran._id === element.id && !tran.cond.text.__text) {
  //             tran.cond.text.__text = 'cond';
  //             this.addShapeLabel(element, tran.cond, 'cond');
  //             isAdd = true;
  //           }
  //         }
  //       } else {
  //         const tran = page.trans;
  //         if (tran._id === element.id && !tran.cond.text.__text) {
  //           tran.cond.text.__text = 'cond';
  //           this.addShapeLabel(element, tran.cond, 'cond');
  //           isAdd = true;
  //         }
  //       }

  //     }
  //     if (context.type === 'time') {
  //       const page = this.jsonPageObject;
  //       if (page.trans.length) {
  //         for (const tran of page.trans) {
  //           if (tran._id === element.id && !tran.time.text.__text) {
  //             tran.time.text.__text = 'time';
  //             this.addShapeLabel(element, tran.time, 'time');
  //             isAdd = true;
  //           }
  //         }
  //       } else {
  //         const tran = page.trans;
  //         if (tran._id === element.id && !tran.time.text.__text) {
  //           tran.time.text.__text = 'time';
  //           this.addShapeLabel(element, tran.time, 'time');
  //           isAdd = true;
  //         }
  //       }

  //     }
  //     if (context.type === 'code') {
  //       const page = this.jsonPageObject;
  //       if (page.trans.length) {
  //         for (const tran of page.trans) {
  //           if (tran._id === element.id && !tran.code.text.__text) {
  //             tran.code.text.__text = 'code';
  //             this.addShapeLabel(element, tran.code, 'code');
  //             isAdd = true;
  //           }
  //         }
  //       } else {
  //         const tran = page.trans;
  //         if (tran._id === element.id && !tran.code.text.__text) {
  //           tran.code.text.__text = 'code';
  //           this.addShapeLabel(element, tran.code, 'code');
  //           isAdd = true;
  //         }
  //       }

  //     }
  //     if (context.type === 'priority') {
  //       const page = this.jsonPageObject;
  //       if (page.trans.length) {
  //         for (const tran of page.trans) {
  //           if (tran._id === element.id && !tran.priority.text.__text) {
  //             tran.priority.text.__text = 'priority';
  //             this.addShapeLabel(element, tran.priority, 'priority');
  //             isAdd = true;
  //           }
  //         }
  //       } else {
  //         const tran = page.trans;
  //         if (tran._id === element.id && !tran.priority.text.__text) {
  //           tran.priority.text.__text = 'priority';
  //           this.addShapeLabel(element, tran.priority, 'priority');
  //           isAdd = true;
  //         }
  //       }

  //     }
  //   } else if (element.type === 'cpn:Place') {
  //     if (context.type === 'initmark') {
  //       const page = this.jsonPageObject;
  //       if (page.place.length) {
  //         for (const place of page.place) {
  //           if (place._id === element.id && !place.initmark.text.__text) {
  //             place.initmark.text.__text = 'initmark';
  //             this.addShapeLabel(element, place.initmark, 'initmark');
  //             isAdd = true;
  //           }
  //         }
  //       } else {
  //         const place = page.place;
  //         if (place._id === element.id && !place.initmark.text.__text) {
  //           place.initmark.text.__text = 'initmark';
  //           this.addShapeLabel(element, place.initmark, 'initmark');
  //           isAdd = true;
  //         }
  //       }
  //     } else if (context.type === 'type') {
  //       const page = this.jsonPageObject;
  //       if (page.place.length) {
  //         for (const place of page.place) {
  //           if (place._id === element.id && !place.type.text.__text) {
  //             place.type.text.__text = 'type';
  //             this.addShapeLabel(element, place.type, 'type');
  //             isAdd = true;
  //           }
  //         }
  //       } else {
  //         const place = page.place;
  //         if (place._id === element.id && !place.type.text.__text) {
  //           place.type.text.__text = 'type';
  //           this.addShapeLabel(element, place.type, 'type');
  //           isAdd = true;
  //         }
  //       }
  //     }

  //   } else if (element.type === 'cpn:Connection') {
  //     if (context.type === 'annot') {
  //       const page = this.jsonPageObject;
  //       if (page.arc.length) {
  //         for (const arc of page.arc) {
  //           if (arc._id === element.id && !arc.annot.text.__text) {
  //             arc.annot.text.__text = 'annot';
  //             this.addShapeLabel(element, arc.annot, 'annot');
  //             isAdd = true;
  //           }
  //         }
  //       } else {
  //         const arc = page.place;
  //         if (arc._id === element.id && !arc.annot.text.__text) {
  //           arc.annot.text.__text = 'annot';
  //           this.addShapeLabel(element, arc.annot, 'annot');
  //           isAdd = true;
  //         }
  //       }
  //     }
  //   }
  //   return isAdd;
  // }


  /**
   * create label by preesing f2 key
   * @param event
   */
  // @HostListener('window:keydown', ['$event'])
  // keyEvent(event: KeyboardEvent) {
  //   console.log('Key event TAB EVEnt' + event);
  //   //  this.diagram.get('eventBus').fire('element.hover', this.curentElement );
  //   if (event.keyCode === 113) {
  //     event.preventDefault();
  //     let linkOfJsonElement;
  //     let textOfPrevElement;
  //     let lastAddedElement = this.curentElement.labels[this.curentElement.labels.length - 1];
  //     if (this.curentElement.type === 'cpn:Transition') {
  //       if (this.curentElement.labels.length) {
  //         const page = this.jsonPageObject;
  //         for (const tran of page.trans) {
  //           if (tran._id === this.curentElement.id) {
  //             // tran.cond.text.__text = null;
  //             linkOfJsonElement = tran;

  //           }
  //         }
  //         if (!linkOfJsonElement) {
  //           linkOfJsonElement = page.trans;
  //         }
  //         if (lastAddedElement.labelType === 'cond') {
  //           if (this.addLabelEvent(event, this.curentElement, { type: 'time' })) {
  //             textOfPrevElement = linkOfJsonElement.cond.text;
  //           } else {
  //             if (this.addLabelEvent(event, this.curentElement, { type: 'code' })) {
  //               textOfPrevElement = linkOfJsonElement.cond.text;
  //             } else {
  //               this.addLabelEvent(event, this.curentElement, { type: 'priority' });
  //               textOfPrevElement = linkOfJsonElement.cond.text;
  //             }
  //           }
  //         }
  //         if (lastAddedElement.labelType === 'time') {
  //           if (this.addLabelEvent(event, this.curentElement, { type: 'code' })) {
  //             textOfPrevElement = linkOfJsonElement.time.text;
  //           } else {
  //             if (this.curentElement.labels.length > 1) {
  //               if (this.addLabelEvent(event, this.curentElement, { type: 'priority' })) {
  //                 textOfPrevElement = linkOfJsonElement.time.text;
  //               } else {
  //                 this.addLabelEvent(event, this.curentElement, { type: 'cond' });
  //                 textOfPrevElement = linkOfJsonElement.time.text;
  //               }
  //             }
  //           }
  //         }
  //         if (lastAddedElement.labelType === 'code') {
  //           if (this.addLabelEvent(event, this.curentElement, { type: 'priority' })) {
  //             textOfPrevElement = linkOfJsonElement.code.text;
  //           } else {
  //             if (this.curentElement.labels.length > 1) {
  //               if (this.addLabelEvent(event, this.curentElement, { type: 'cond' })) {
  //                 textOfPrevElement = linkOfJsonElement.code.text;
  //               } else {
  //                 this.addLabelEvent(event, this.curentElement, { type: 'time' });
  //                 textOfPrevElement = linkOfJsonElement.code.text;
  //               }
  //             }
  //           }
  //         }
  //         if (lastAddedElement.labelType === 'priority') {
  //           if (this.addLabelEvent(event, this.curentElement, { type: 'cond' })) {
  //             textOfPrevElement = linkOfJsonElement.priority.text;
  //           } else {
  //             if (this.curentElement.labels.length > 1) {
  //               if (this.addLabelEvent(event, this.curentElement, { type: 'time' })) {
  //                 textOfPrevElement = linkOfJsonElement.priority.text;
  //               } else {
  //                 this.addLabelEvent(event, this.curentElement, { type: 'code' });
  //                 textOfPrevElement = linkOfJsonElement.priority.text;
  //               }
  //             }
  //           }
  //         }
  //         this.diagram.get('eventBus').fire('element.tab', { element: this.curentElement.labels[this.curentElement.labels.length - 1] });
  //         if (textOfPrevElement.__text === 'time' || textOfPrevElement.__text === 'code' || textOfPrevElement.__text === 'priority' || textOfPrevElement.__text === 'cond') {
  //           lastAddedElement = this.curentElement.labels.find(element => element.text === textOfPrevElement.__text);
  //           this.canvas._removeElement(lastAddedElement, 'cpn:Label');
  //           this.curentElement.labels.splice(this.curentElement.labels.indexOf(lastAddedElement), 1);
  //           textOfPrevElement.__text = null;
  //         } else {
  //           /*  var temp = this.curentElement.labels[this.curentElement.labels.length - 1];
  //             this.curentElement.labels[this.curentElement.labels.length - 1] = this.curentElement.labels[this.curentElement.labels.length - 2];
  //             this.curentElement.labels[this.curentElement.labels.length - 1] = temp;*/

  //         }
  //       } else {
  //         /*if (this.transLabelCount === 0) {
  //           this.addLabelEvent(event, this.curentElement, {type: 'cond'})
  //           this.testElemForRemove = this.curentElement;
  //           this.transLabelCount++;
  //         } else if (this.transLabelCount === 1) {
  //           this.addLabelEvent(event, this.curentElement, {type: 'time'})
  //           this.transLabelCount++;

  //         } else if (this.transLabelCount === 2) {
  //           this.addLabelEvent(event, this.curentElement, {type: 'code'})
  //           this.transLabelCount++;
  //         } else if (this.transLabelCount === 3) {
  //           this.addLabelEvent(event, this.curentElement, {type: 'priority'})
  //           this.canvas._removeElement(this.testElemForRemove, 'shape')
  //           this.transLabelCount = 0;
  //         }*/
  //         this.addLabelEvent(event, this.curentElement, { type: 'cond' });
  //         // this.labelEditingProvider.startActivateDirectEdit(this.curentElement.labels[ this.curentElement.labels.length - 1], true);
  //         this.diagram.get('eventBus').fire('element.tab', { element: this.curentElement.labels[this.curentElement.labels.length - 1] });
  //       }
  //     } else if (this.curentElement.type === 'cpn:Place') {
  //       if (this.curentElement.labels.length) {
  //         const page = this.jsonPageObject;
  //         for (const place of page.place) {
  //           if (place._id === this.curentElement.id) {
  //             // tran.cond.text.__text = null;
  //             linkOfJsonElement = place;

  //           }
  //         }
  //         if (!linkOfJsonElement) {
  //           linkOfJsonElement = page.place;
  //         }
  //         if (lastAddedElement.labelType === 'initmark') {
  //           this.addLabelEvent(event, this.curentElement, { type: 'type' });
  //           textOfPrevElement = linkOfJsonElement.initmark.text;
  //         } else if (lastAddedElement.labelType === 'type') {
  //           this.addLabelEvent(event, this.curentElement, { type: 'initmark' });
  //           textOfPrevElement = linkOfJsonElement.type.text;
  //         }
  //         if (textOfPrevElement.__text === 'type' || textOfPrevElement.__text === 'initmark') {
  //           this.canvas._removeElement(lastAddedElement, 'cpn:Label');
  //           this.curentElement.labels.splice(this.curentElement.labels.indexOf(lastAddedElement), 1);
  //           textOfPrevElement.__text = null;
  //         }

  //       } else {
  //         this.addLabelEvent(event, this.curentElement, { type: 'initmark' });
  //       }

  //       /*if (this.placeLabelCount === 0) {
  //         this.addLabelEvent(event, this.curentElement, {type: 'initmark'})
  //         this.placeLabelCount++;
  //       } else if (this.placeLabelCount === 1) {
  //         this.addLabelEvent(event, this.curentElement, {type: 'type'})
  //         this.placeLabelCount = 0;

  //       }*/
  //     } else if (this.curentElement.type === 'cpn:Connection') {
  //       this.addLabelEvent(event, this.curentElement, { type: 'annot' });
  //       // to do проверить как будет работать при создании пустой стрелки после этапа добавления любого элемента в модель
  //     } else {
  //       this.diagram.get('eventBus').fire('element.tab', { element: this.curentElement.labels[this.curentElement.labels.length - 1] });
  //     }

  //   }

  // }

  /**
   * open elemen property panel after klick on it
   * @param event
   */
  fireSelectionEvent(event) {
    this.curentElement = event.element;
    //  console.log('fireSelectionEvent(), event = ', event);
    if (event.element) {

      // EmitterService.getAppMessageEmitter().emit(
      //   {
      //     id: Constants.ACTION_SHAPE_SELECT,
      //     element: event.element
      //   });

      this.eventService.send(Message.SHAPE_SELECT, { element: event.element });
    }
  }

  fireAllEvents(event) {
    console.log('fireDEACTIVATE(), event = ', event === null ? 'NULL' : event);
  }

  lassoTool() {
    console.log('ModelEditorComponent. lassoTool()');
    const lassoTool = this.diagram.get('lassoTool');
    lassoTool.activateSelection();
  }

  createPlace() {
    console.log('ModelEditorComponent. createPlace()');
    const create = this.diagram.get('create');
    const shape = this.elementFactory.create('shape', {
      type: 'cpn:Place',
      width: 50,
      height: 50,
    });
    create.start(event, shape);
  }

  createTransition() {
    console.log('ModelEditorComponent. createTransition()');
    const create = this.diagram.get('create');
    const shape = this.elementFactory.create('shape', {
      type: 'cpn:Transition',
      width: 80,
      height: 80,
    });
    create.start(event, shape);
  }

  log(text) {
    console.log('ModelEditorComponent. log(), text = ' + text);
  }

  load(pageObject, subPages) {
    this.subpages = subPages;
    this.jsonPageObject = pageObject;
    this.pageId = pageObject._id;
    const that = this;
    if (pageObject) {
      // this.diagram.createDiagram(function () {
      that.loadPageDiagram(pageObject);
      // });
    } else {
      this.canvas._clear();
    }
  }

  loadPageDiagram(pageObject) {
    console.log('loadPageDiagram(), import, pageObject = ', pageObject);

    importCpnPage(this.diagram, pageObject);
  }

  // loadPageDiagram_BAK(pageObject) {
  //   // console.log('ModelEditorComponent. load()');
  //   // console.log(pageObject);

  //   // console.log('ModelEditorComponent. load(), pageObject = ' + JSON.stringify(pageObject));

  //   this.diagram.clear();
  //   // this.canvas._clear();

  //   this.placeShapes = [];
  //   this.transShapes = [];
  //   this.arcShapes = [];
  //   console.log('Model-Editor Start');

  //   if (pageObject) {
  //     const root = this.canvas.getRootElement();

  //     const zoomScroll = this.diagram.get('zoomScroll');
  //     const moveCanvas = this.diagram.get('moveCanvas');

  //     const modelBounds = {
  //       x: 100000,
  //       y: 100000,
  //       width: 0,
  //       height: 0
  //     };

  //     // Places
  //     if (pageObject.place) {
  //       for (const place of pageObject.place) {
  //         const attrs = this.getPlaceShapeAttrs(place);
  //         this.updateModelBounds(modelBounds, attrs);
  //         let shape = this.elementFactory.createShape(attrs);
  //         shape = this.canvas.addShape(shape, root);
  //         this.placeShapes[attrs.id] = shape;

  //         this.addShapeLabel(shape, place.type, 'type');
  //         this.addShapeLabel(shape, place.initmark, 'initmark');
  //       }
  //     }

  //     // Transitions
  //     if (pageObject.trans) {
  //       if (pageObject.trans.length) {
  //         for (const trans of pageObject.trans) {
  //           this.setModelTransitions(trans, modelBounds, root);
  //         }
  //       } else {
  //         this.setModelTransitions(pageObject.trans, modelBounds, root);
  //       }
  //     }

  //     // Arcs
  //     if (pageObject.arc) {
  //       for (const arc of pageObject.arc) {
  //         const data = this.getConnectionAttrs(arc, pageObject);
  //         if (data) {
  //           const conn = this.modeling.connect(data.source, data.target, data.attrs, null);
  //           this.arcShapes.push(conn);
  //           if (arc.annot.text && arc.annot.text.length > 0) {
  //             const label = ' '; // arc.annot.text;
  //             this.labelEditingProvider.update(conn, label);
  //           }
  //           this.addShapeLabel(conn, arc.annot, 'annot');
  //         }
  //       }
  //     }

  //     console.log('modelBounds = ', modelBounds);

  //     const viewbox = this.canvas.viewbox();
  //     const vb = modelBounds;
  //     this.canvas.viewbox(vb);

  //     this.canvas.zoom(0.7, { x: vb.width / 2, y: vb.height / 2 });
  //   }
  // }

  // setModelTransitions(trans: any, modelBounds: any, root: any) {
  //   if (trans.lenght > 0 || (trans._id)) {
  //     const attrs = this.getTransShapeAttrs(trans);
  //     this.updateModelBounds(modelBounds, attrs);
  //     let shape = this.elementFactory.createShape(attrs);
  //     shape = this.canvas.addShape(shape, root);
  //     this.transShapes[attrs.id] = shape;

  //     if (trans.cond) {
  //       this.addShapeLabel(shape, trans.cond, 'cond');
  //     }
  //     if (trans.time) {
  //       this.addShapeLabel(shape, trans.time, 'time');
  //     }
  //     if (trans.code) {
  //       this.addShapeLabel(shape, trans.code, 'code');
  //     }
  //     if (trans.priority) {
  //       this.addShapeLabel(shape, trans.priority, 'priority');
  //     }
  //   }
  // }

  // addShapeLabel(shape, labelNode, labelType) {
  //   if (labelNode) {// && labelNode.text && typeof labelNode.text === 'string' ? true : labelNode.text.__text) {

  //     let pos;
  //     if (labelNode.posattr) {
  //       // var x = 1.0 * labelNode.posattr["@attributes"].x;
  //       // var y = -1.0 * labelNode.posattr["@attributes"].y;
  //       const x = 1.0 * labelNode.posattr._x;
  //       const y = -1.0 * labelNode.posattr._y;
  //       pos = { x: x, y: y };
  //     }

  //     let attrs = { stroke: 'black', labelType: labelType };
  //     if (labelNode.textattr) {
  //       let stroke = shape.stroke || 'black';
  //       // var stroke = labelNode.textattr["@attributes"].color || 'black';
  //       stroke = this.correctColor[stroke] || stroke;

  //       attrs = { stroke: stroke, labelType: labelType };
  //     }
  //     const textLabel = typeof labelNode.text === 'string' ? labelNode.text : labelNode.text.__text;
  //     const label = this.createLabel(shape, textLabel, pos, attrs, labelNode._id);
  //     label.hidden = false;
  //     return this.canvas.addShape(label, shape);
  //   }
  //   return undefined;
  // }

  // Вычислим координаты всей модели по кадому элементу
  //
  // updateModelBounds(bounds, attrs) {
  //   if (bounds.x > attrs.x) {
  //     bounds.x = attrs.x;
  //   }
  //   if (bounds.y > attrs.y) {
  //     bounds.y = attrs.y;
  //   }

  //   if (bounds.width < Math.abs(attrs.x + attrs.width - bounds.x)) {
  //     bounds.width = Math.abs(attrs.x + attrs.width - bounds.x);
  //   }
  //   if (bounds.height < Math.abs(attrs.y + attrs.height - bounds.y)) {
  //     bounds.height = Math.abs(attrs.y + attrs.height - bounds.y);
  //   }
  //   return bounds;
  // }

  // add label
  // createLabel(element, labelText, pos, attrs, labelNodeId) {
  //   let bounds,
  //     text,
  //     label,
  //     semantic;

  //   semantic = element.cpnElement; // element.businessObject;
  //   console.log('createLabel(), element, semantic, labelText = ', element, semantic, labelText);

  //   if (!pos) {
  //     pos = { x: Math.round(bounds.x), y: Math.round(bounds.y) };
  //   }

  //   // bounds = getExternalLabelBounds(semantic, element);
  //   bounds = {
  //     width: 200, // 90,
  //     height: 30,
  //     x: pos.x,
  //     y: pos.y
  //   };

  //   text = labelText || semantic.name;

  //   if (text) {
  //     // get corrected bounds from actual layouted text
  //     bounds = this.textRenderer.getExternalLabelBounds(bounds, text);
  //   }
  //   console.log('createLabel(), bounds = ', bounds);


  //   label = this.elementFactory.createLabel(this.elementData(semantic, {
  //     id: semantic.id + '_label_' + this.makeid(6),
  //     labelNodeId: labelNodeId,
  //     labelTarget: element,
  //     type: 'cpn:Label',
  //     hidden: element.hidden || !semantic.name,
  //     text: text,
  //     x: pos.x - Math.round(bounds.width) / 2,
  //     y: pos.y - Math.round(bounds.height) / 2,
  //     width: Math.round(bounds.width),
  //     height: Math.round(bounds.height),
  //     stroke: attrs.stroke,
  //     labelType: attrs.labelType
  //   }));

  //   // this.labelEditingProvider.update(element, label);
  //   // this.labelEditingProvider.update(element, text);

  //   return label;
  // }

  // elementData(semantic, attrs) {
  //   return assign({
  //     id: semantic.id,
  //     type: semantic.$type,
  //     businessObject: semantic
  //   }, attrs);
  // }

  makeid(length) {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
  }

  // getPlaceShapeAttrs(obj) {
  //   let
  //     // x = 1 * obj.posattr["@attributes"].x,
  //     // y = -1 * obj.posattr["@attributes"].y,
  //     // width = 1 * obj.ellipse["@attributes"].width,
  //     // height = 1 * obj.ellipse["@attributes"].height;
  //     x = 1 * obj.posattr._x,
  //     y = -1 * obj.posattr._y,
  //     w = 1 * obj.ellipse._w,
  //     h = 1 * obj.ellipse._h;

  //   x -= w / 2;
  //   y -= h / 2;

  //   // var stroke = obj.lineattr["@attributes"].colour || 'black';
  //   let stroke = obj.lineattr._colour || 'black';
  //   const strokeWidth = 2; // obj.lineattr["@attributes"].thick || 1;

  //   // console.log('getPlaceShapeData(obj), obj = ', obj.text, obj);
  //   stroke = this.correctColor[stroke] || stroke;
  //   // console.log('stroke = ', stroke);

  //   return {
  //     type: 'cpn:Place',
  //     // id: obj["@attributes"].id,
  //     id: obj._id,
  //     x: x,
  //     y: y,
  //     width: w,
  //     height: h,
  //     name: obj.text,
  //     stroke: stroke,
  //     strokeWidth: strokeWidth,

  //     // businessObject: {
  //     //   text: obj.text,
  //     // }

  //     cpnElement: obj
  //   };
  // }

  // getTransShapeAttrs(obj) {
  //   let
  //     // x = 1 * obj.posattr["@attributes"].x,
  //     // y = -1 * obj.posattr["@attributes"].y,
  //     // width = 1 * obj.box["@attributes"].width,
  //     // height = 1 * obj.box["@attributes"].height;
  //     x = 1 * obj.posattr._x,
  //     y = -1 * obj.posattr._y,
  //     w = 1 * obj.box._w,
  //     h = 1 * obj.box._h;

  //   x -= w / 2;
  //   y -= h / 2;

  //   // var stroke = obj.lineattr["@attributes"].colour || 'black';
  //   let stroke = obj.lineattr._colour || 'black';
  //   const strokeWidth = 2; // obj.lineattr["@attributes"].thick || 1;

  //   stroke = this.correctColor[stroke] || stroke;

  //   return {
  //     type: 'cpn:Transition',
  //     // id: obj["@attributes"].id,
  //     id: obj._id,
  //     x: x,
  //     y: y,
  //     width: w,
  //     height: h,
  //     name: obj.text,
  //     stroke: stroke,
  //     strokeWidth: strokeWidth,
  //     hierar: this.subpages.find(e => e.subpageid === obj._id || e.tranid === obj._id) ? 'subPage' : 'tran',
  //     // businessObject: {
  //     //   text: obj.text,
  //     // }

  //     cpnElement: obj
  //   };
  // }

  // getConnectionAttrs(arc, pageObject) {


  //   // let placeShape = this.placeShapes[arc.placeend["@attributes"].idref];
  //   // let transShape = this.transShapes[arc.transend["@attributes"].idref];

  //   const placeShape = this.placeShapes[arc.placeend._idref];
  //   const transShape = this.transShapes[arc.transend._idref];
  //   // console.log(this.canvas._elementRegistry._elements);
  //   // const elements =  this.canvas._elementRegistry._elements;

  //   // var stroke = arc.lineattr["@attributes"].colour || 'black';
  //   // var strokeWidth = arc.lineattr["@attributes"].thick || 1;

  //   let stroke = arc.lineattr._colour || 'black';
  //   const strokeWidth = arc.lineattr._thick || 1;

  //   stroke = this.correctColor[stroke] || stroke;

  //   // var orientation = arc["@attributes"].orientation;
  //   const orientation = arc._orientation;
  //   let source = placeShape;
  //   let target = transShape;
  //   let reverse = false;
  //   if (orientation && orientation == 'TtoP') {
  //     source = transShape;
  //     target = placeShape;
  //     reverse = true;
  //   }

  //   let waypoints = [];
  //   waypoints.push({
  //     x: source.x + Math.abs(source.width / 2),
  //     y: source.y + Math.abs(source.height / 2),
  //     id: source._id
  //   });

  //   if (arc.bendpoint) {
  //     if (arc.bendpoint.posattr) {
  //       // @ts-ignore
  //       waypoints.push({
  //         // x: 1 * arc.bendpoint.posattr["@attributes"].x,
  //         // y: -1 * arc.bendpoint.posattr["@attributes"].y
  //         x: 1 * arc.bendpoint.posattr._x,
  //         y: -1 * arc.bendpoint.posattr._y,
  //         id: arc.bendpoint._id
  //       });
  //     }
  //     if (arc.bendpoint instanceof Array) {
  //       const arr = arc.bendpoint;
  //       if (!reverse) {
  //         arr.reverse();
  //       }
  //       arr.forEach(p => {
  //         waypoints.push({
  //           // x: 1 * p.posattr["@attributes"].x,
  //           // y: -1 * p.posattr["@attributes"].y
  //           x: 1 * p.posattr._x,
  //           y: -1 * p.posattr._y,
  //           id: p._id
  //         });
  //       });
  //     }
  //   }

  //   waypoints.push({
  //     x: target.x + Math.abs(target.width / 2),
  //     y: target.y + Math.abs(target.height / 2),
  //     id: target._id
  //   });

  //   // выравнивание точек соединения по bendpoins
  //   const n = waypoints.length;
  //   if (n > 2) {
  //     // y
  //     if (Math.abs(waypoints[0].y - waypoints[1].y) < 20) {
  //       waypoints[0].y = waypoints[1].y;
  //     }
  //     if (Math.abs(waypoints[n - 1].y - waypoints[n - 2].y) < 20) {
  //       waypoints[n - 1].y = waypoints[n - 2].y;
  //     }

  //     // x
  //     if (Math.abs(waypoints[0].x - waypoints[1].x) < 20) {
  //       waypoints[0].x = waypoints[1].x;
  //     }
  //     if (Math.abs(waypoints[n - 1].x - waypoints[n - 2].x) < 20) {
  //       waypoints[n - 1].x = waypoints[n - 2].x;
  //     }
  //   } else {

  //     for (const verArc of pageObject.arc) {
  //       if (arc._id !== verArc._id && ((arc.placeend._idref === verArc.transend._idref && arc.transend._idref === verArc.placeend._idref) || (arc.placeend._idref === verArc.placeend._idref && arc.transend._idref === verArc.transend._idref))) {
  //         waypoints = this.optimiseEqualsArcsByWayoints(waypoints, source.width / 8);
  //       }
  //     }


  //   }

  //   if (source && target) {
  //     const attrs = {
  //       type: 'cpn:Connection',
  //       // id: arc["@attributes"].id,
  //       id: arc._id,
  //       waypoints: waypoints,
  //       stroke: stroke,
  //       strokeWidth: strokeWidth,

  //       cpnElement: arc
  //     };

  //     return { source: source, target: target, attrs: attrs };
  //   }

  //   return undefined;
  // }


  // angle(cx, cy, ex, ey) {
  //   const dy = ey - cy;
  //   const dx = ex - cx;
  //   const theta = Math.atan2(dy, dx); // range (-PI, PI]
  //   // theta *= 180 / Math.PI; // rads to degs, range (-180, 180]
  //   // if (theta < 0) theta = 360 + theta; // range [0, 360)
  //   return theta;
  // }


  // optimiseEqualsArcsByWayoints(arc, delta) {
  //   const dx = Math.sin(this.angle(arc[0].x, arc[0].y, arc[1].x, arc[1].y) - Math.PI) * delta;
  //   const dy = Math.cos(this.angle(arc[0].x, arc[0].y, arc[1].x, arc[1].y) - Math.PI) * delta;

  //   arc[0].x = arc[0].x + dx;
  //   arc[0].y = arc[0].y + dy;
  //   arc[1].x = arc[1].x + dx;
  //   arc[1].y = arc[1].y + dy;

  //   return arc;
  // }
}
