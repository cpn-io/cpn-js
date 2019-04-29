import {Component, ElementRef, HostListener, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';

import {assign} from 'min-dash';
// import Diagram from 'bpmn-js/lib/Modeler';
import Diagram from 'cpn-js/lib/Modeler';

import {EmitterService} from '../services/emitter.service';
import {HttpClient} from '@angular/common/http';
import {Message} from '../common/message';
import {EventService} from '../services/event.service';
import {element} from 'protractor';
import {ProjectService} from '../services/project.service';
import {ModelService} from '../services/model.service';

@Component({
  selector: 'app-model-editor',
  templateUrl: './model-editor.component.html',
  styleUrls: ['./model-editor.component.scss']
})
export class ModelEditorComponent implements OnInit, OnDestroy {

  constructor(private eventService: EventService,
              private emitterService: EmitterService,
              private http: HttpClient,
              private projectService: ProjectService,
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
  pageId;
  jsonPageObject;
  // subscription: Subscription;
  subpages = [];
  placeShapes = [];
  transShapes = [];
  arcShapes = [];
  curentElement;
  transCount = 0;
  tabStack = {
    element: undefined, current: undefined, stack: {
      trans: {cond: 'time', time: 'code', code: 'priority', priority: 'edit', edit: 'cond'},
      place: {type: 'initmark', initmark: 'edit', edit: 'type'},
      arc: {annot: 'edit', edit: 'annot'}
    }
  };

  correctColor = {
    'Fucia': '#f0f'
  };


  ngOnDestroy() {
    // for(let placeIndex of Object.keys(this.placeShapes)) {
    //   for(let i=0; i < this.placeShapes[placeIndex].labels.length; i++){
    //     if(Object.values(this.projectService.appSettings).includes(this.placeShapes[placeIndex].labels[i].text)) {
    //       this.modelService.deleteLabelJsonByCPNElem(this.placeShapes[placeIndex], i, 'place', this.pageId);
    //     }
    //   }
    // }
    // for(let transIndex of Object.keys(this.transShapes)) {
    //   for(let i=0; i < this.transShapes[transIndex].labels.length; i++){
    //     if(Object.values(this.projectService.appSettings).includes(this.transShapes[transIndex].labels[i].text)) {
    //       this.modelService.deleteLabelJsonByCPNElem(this.transShapes[transIndex], i, 'place', this.pageId);
    //     }
    //   }
    // }
    // for(let arc of this.arcShapes) {
    //   for(let i=0; i < arc.labels.length; i++){
    //     if(Object.values(this.projectService.appSettings).includes(arc.labels[i].text)) {
    //       this.modelService.deleteLabelJsonByCPNElem(arc, i, 'place', this.pageId);
    //     }
    //   }
    // }
    this.modelService.clearDefaultLabelValues(this.pageId);
    // this.diagram.get('eventBus').fire('diagram.clear');
    // this.diagram.get('eventBus').fire('diagram.destroy');

  }


  ngOnInit() {
    this.subscripeToAppMessage();
    this.diagram = new Diagram({
      container: this.containerElementRef.nativeElement
    });


    /* document.addEventListener('keydown', (event) => {
       this.f2KeyDownHandler(event);
     })*/

    const eventBus = this.diagram.get('eventBus');

    // eventBus.on('element.click', (event) => {
    //   console.log('click on, event = ', event);
    //   this.fireSelectionEvent(event);
    // });

    // eventBus.on('mousedown', (event) => {
    //   console.log('click on, event = ', event);
    //   this.fireSelectionEvent(event);
    // });

    eventBus.on('element.mouseup', (event) => {
      // console.log('click on, event = ', event);
      this.diagram.get('eventBus').fire('element.edit', {element: event.element});
    });

    eventBus.on('element.edit.tab', (event) => {
      console.log('element.edit.tab, event = ', event);
      this.gotoNextLabelEditing(event.element);
    });

    // eventBus.on('element.tab', (event) => {
    //   console.log('element.tab, event = ', event);
    //   // this.gotoNextLabelEditing(event.element);
    // });

    eventBus.on('drag.init', (event) => {
      console.log('click on, event = ', event);
      // this.fireAllEvents(event);
      this.fireSelectionEvent(event);
    });
    eventBus.on('autoPlace', (event) => {
      console.log('MODEL EDITOR EVENT, event = ', event);
      this.createShape(event);
      // this.fireAllEvents(event);
    });
    eventBus.on('element.mousedown', (event) => {
      // console.log('click on, event = ', event);
      this.fireAllEvents(event);
    });
    eventBus.on('popupMenu.open', (event) => {
      // console.log('click on, event = ', event);
      this.fireAllEvents(event);
    });
    eventBus.on('canvas.viewbox.changing', (event) => {

      // console.log('click on, event = ', event);
      this.fireAllEvents(event);
    });

    eventBus.on('resize.end', (event) => {

      // console.log('click on, event = ', event);
      this.shapeResizeJsonSaver(event);
    });

    eventBus.on('shape.move.end', (event) => {
      console.log('shape.move.end event fired');
      this.shapeMoveJsonSaver(event);
    });

    eventBus.on('create.start', (event) => {
      console.log('create.start');

      this.createShape(event);
    });

    eventBus.on(['create.end', 'autoPlace'], (event, context) => {
      console.log('create.end');

      // if (event.type === 'autoPlace') {
      //   event.shape.x = event.source.x + 1.8 * event.source.width;
      //   event.shape.y = event.source.y;
      // }
      // if (event.shape.type === 'cpn:Transition') {
      //   this.createTransitionInModel(event.shape);
      // } else {
      //   this.createPlaceInModel(event.shape);
      // }

    });


    // listen to dblclick on non-root elements
    eventBus.on('element.dblclick', (event) => {
      // this.connectionDblClick(event);
    });

    eventBus.on('modelEditor.deleteElement', (event, element, connection) => {
      console.log(element);
      console.log(connection);
      switch (element.type) {
        case 'cpn:Place':
          this.modelService.deleteElementFromPageJson(this.pageId, element.id, element.type);
          delete this.placeShapes[element.id];
          break;
        case 'cpn:Transition':
          this.modelService.deleteElementFromPageJson(this.pageId, element.id, element.type);
          // if (!this.jsonPageObject.trans.length || this.jsonPageObject.trans.length === 1) this.jsonPageObject.trans = []; else this.jsonPageObject.trans = this.jsonPageObject.trans.filter(elem => elem._id !== element.id);
          delete this.transShapes[element.id];
          break;
        case 'cpn:Connection':
          this.modelService.deleteElementFromPageJson(this.pageId, element.id, element.type);
          // if (!this.jsonPageObject.arc.length || this.jsonPageObject.arc.length === 1) this.jsonPageObject.arc = []; else this.jsonPageObject.arc = this.jsonPageObject.arc.filter(elem => elem._id !== element.id);
          this.arcShapes = this.arcShapes.filter(arc => arc.id !== element.id);
          break;
        default:

      }
      connection.forEach(conid => {
        this.modelService.deleteElementFromPageJson(this.pageId, conid, 'cpn:Connection');
        // if (!this.jsonPageObject.arc.length || this.jsonPageObject.arc.length === 1) this.jsonPageObject.arc = []; else this.jsonPageObject.arc = this.jsonPageObject.arc.filter(elem => elem._id !== conid);
        this.arcShapes = this.arcShapes.filter(arc => arc.id !== conid);
      });
    });

    eventBus.on('commandStack.connection.create.execute', (event) => {
      // this.createPlaceInModel(event.shape);
      // this.createTransitionInModel(event.shape);
      console.log('created arcs');

      // if (!this.jsonPageObject.arc.find( element => { return element._id === event.context.connection.id} )){
      if (!this.modelService.getJsonElementOnPage(this.pageId, event.context.connection.id, 'cpn:Connection')) {
        this.createArcsInModel(event.context);
        // this.addLabelEvent(event, event.context.connection, { type: 'annot' });
        // const arc = this.modelService.getJsonElemetOnPage(this.pageId, event.context.connection.id, 'bpmn:SequenceFlow');
        // const pos = {x: event.context.connection.x, y: event.context.connection.y};
        // const attrs = {stroke: 'Black', labelType: 'annot'};
        // const textLabel = 'dsdsdddffffffffff';
        // const  label = this.createLabel(event.context.connection, textLabel, pos, attrs, arc.annot._id);
        // label.hidden = false;
        // this.canvas.addShape(label, event.context.connection);
      }

    });


    eventBus.on('directEditing.cancel', (event) => {
      if (event.active.element.type === 'cpn:Transition' && event.active.element.hierar === 'subPage') {
        const subp = this.subpages.find(sp => sp.tranid === event.active.element.id);
        if (subp && subp.name !== event.active.element.name) {
          subp.name = event.active.element.name;
          this.changeSubPageName(subp);
        }
      }
      this.modelUpdate();
    });

    eventBus.on('directEditing.Enter', (event) => {
      // console.log('click on, event = ', event);
      console.log('ENTER!!!!!!!!');
    });
    eventBus.on('ContextPadProvider.createlabel', (event, element, context) => {
      console.log('GET EVENT ADD LABEL = ', event);
      this.addLabelEvent(event, element, context);
    });

    this.eventService.on(Message.SUBPAGE_CREATE, (data) => {
      let attrs;
      let shape;
      if(data.parentid === this.pageId) {
        if (data.object) {
          attrs = this.getTransShapeAttrs(data.object);
          shape = this.elementFactory.createShape(attrs);
          shape.cpnElement = data.object;
          shape = this.canvas.addShape(shape, this.canvas.getRootElement());
          this.subpages.push({subpageid: data.id, tranid: shape.id, name: data.name});
          this.transShapes[attrs.id] = shape;
        } else {
          /***create trasition***/
          const bounds = this.canvas.viewbox();
          attrs = {
            type: 'cpn:Transition',
            // id: obj["@attributes"].id,
            id: 'ID' + new Date().getTime(),
            x: bounds.x + bounds.width / 2,
            y: bounds.y + bounds.height / 2,
            width: 100,
            height: 80,
            name: data.name,
            stroke: 'Black',
            strokeWidth: 1,
            hierar: 'subPage'
            // businessObject: {
            //   text: obj.text,
            // }
          };

          shape = this.elementFactory.createShape(attrs);
          shape = this.canvas.addShape(shape, this.canvas.getRootElement());
          this.subpages.push({subpageid: data.id, tranid: shape.id, name: data.name});
          this.transShapes[attrs.id] = shape;
          this.createTransitionInModel(shape);
        }
      }


      /* var shape = this.elementFactory.createShape(assign({ type: 'cpn:Transition' }, undefined));

       this.subpages.push({subpageid: data.id,   tranid: shape.id, name: data.name});
       shape.hierar = 'subPage'
       this.dragging.init(event, 'create', {
         cursor: 'grabbing',
         autoActivate: true,
         data: {
           shape: shape,
           context: {
             shape: shape,
             source: undefined
           }
         }
       });*/
    });



    this.eventService.on(Message.CHANGE_NAME_PAGE, (data) => {
      if (data.changedElement === 'page' && data.parentPage === this.modelService.getPageById(this.pageId).pageattr._name) {
        const tran = this.transShapes[this.subpages.find(e => e.subpageid = data.id).tranid];
        if (tran) {
          tran.name = data.name;
          tran.businessObject.name = tran.name;
          this.canvas.removeShape(tran);
          this.canvas.addShape(tran, this.canvas.getRootElement());
          for (const lab of tran.labels) {
            this.canvas.removeShape(lab);
            if (lab.text) {
              this.canvas.addShape(lab, tran);
            }
          }
          this.applyPageChanges();
        }
      }
    });



    this.eventService.on(Message.DELETE_PAGE, (data) => {  /// {id: node.id, parent: node.parent.data.name}
      if (data.parent === this.modelService.getPageById(this.pageId).pageattr._name) {
        const tran = this.transShapes[this.subpages.find(e => e.subpageid = data.id).tranid];
        if (tran) {
          // if (!this.jsonPageObject.trans.length || this.jsonPageObject.trans.length === 1) this.jsonPageObject.trans = []; else this.jsonPageObject.trans = this.jsonPageObject.trans.filter(elem => elem._id !== tran.id);
          this.modelService.deleteElementFromPageJson(this.pageId, tran.id, 'cpn:Transition');
          delete this.transShapes[tran.id];
          this.canvas.removeShape(tran);
        }
      } else if (this.pageId === data.id) {
        this.canvas._clear();
      }
    });

    const that = this;
    this.diagram.createDiagram(function () {
      // that.loadTestModel();
    });

    this.elementFactory = this.diagram.get('elementFactory');
    this.dragging = this.diagram.get('dragging');
    if (this.canvas) {
      this.canvas._clear();
    }
    this.canvas = this.diagram.get('canvas');
    this.modeling = this.diagram.get('modeling');
    this.labelEditingProvider = this.diagram.get('labelEditingProvider');
    this.textRenderer = this.diagram.get('textRenderer');

  }

  createShape(event) {
    if (event.type === 'autoPlace') {
      event.shape.x = event.source.x + 1.8 * event.source.width;
      event.shape.y = event.source.y;
    }
    if (event.shape.type === 'cpn:Transition') {
      this.createTransitionInModel(event.shape);
    } else {
      this.createPlaceInModel(event.shape);
    }
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
      if (data.pagename === this.modelService.getPageById(this.pageId).pageattr._name) {
        // let testElem;
        /*for (let elem of data.element.labels) {
          testElem = data.labels.find(lab => elem.id === lab[0].value);
          if (testElem)  break;
        }*/
      /*  const testElem = data.element.labels.find(elem => data.labels.find(lab => elem.labelNodeId === lab[0].value));
      /  if (!testElem) {
          this.applyPropertyUpdateChanges(data);
        }*/
        let element;
        let entry;
        if(data.type === 'cpn:Place'){
          entry = this.placeShapes;
          element = entry[data.elementid];
        } else if(data.type === 'cpn:Transition') {
          entry = this.transShapes;
          element = entry[data.elementid];
        } else if(data.type === 'cpn:Connection') {
          entry = this.arcShapes;
          element = entry.find(elem => elem.id === data.elementid);
        }
       // this.diagram.get('eventBus').fire('elements.changed', { elements: [element] });

        this.canvas.removeShape(element);
        const attrs = this.getPlaceShapeAttrs(element.cpnElement);
        let shape = this.elementFactory.createShape(attrs);
        shape.cpnElement = element.cpnElement;
        shape = this.canvas.addShape(shape, this.canvas.getRootElement());
        this.addShapeLabel(shape, element.cpnElement.type, 'type');
        this.addShapeLabel(shape, element.cpnElement.initmark, 'initmark');
        if (entry instanceof Array) entry.push(shape); else entry[attrs.id] = shape;

       // this.addShapeLabel(shape, place.type, 'type');
       // this.addShapeLabel(shape, place.initmark, 'initmark');


        this.eventService.send(Message.SHAPE_SELECT, {element: element, cpnElement: element.cpnElement, type: element.type});
      }
    });

    this.eventService.on(Message.MODEL_ERROR, (data) => {
      if (data) {
        let shape;
        const placeShapes = this.placeShapes;
        const transShapes = this.transShapes;
        const canvas = this.canvas;
        Object.keys(placeShapes).forEach(function (key) {
          shape = placeShapes[key];
          if (shape.iserror) {
            shape.iserror = false;
            canvas.removeShape(shape);
            canvas.addShape(shape, canvas.getRootElement());
            for (const lab of shape.labels) {
              canvas.removeShape(lab);
              if (lab.text) {
                canvas.addShape(lab, shape);
              }
            }
          }
        });
        Object.keys(transShapes).forEach(function (key) {
          shape = transShapes[key];
          if (shape.iserror) {
            shape.iserror = false;
            canvas.removeShape(shape);
            canvas.addShape(shape, canvas.getRootElement());
            for (const lab of shape.labels) {
              canvas.removeShape(lab);
              if (lab.text) {
                canvas.addShape(lab, shape);
              }
            }
          }

        });
        for (const arc of this.arcShapes) {
          arc.iserror = false;
          this.canvas.removeShape(arc);
          this.canvas.addConnection(arc, this.canvas.getRootElement());
          for (const lab of arc.labels) {
            canvas.removeShape(lab);
            if (lab.text) {
              canvas.addShape(lab, arc);
            }
          }
        }
        for (const id of data.id) {
          shape = this.placeShapes[(id.trim()).slice(0, -1)];
          if (shape && shape.id) {
            shape.iserror = true;
            canvas.removeShape(shape);
            canvas.addShape(shape, canvas.getRootElement());
            for (const lab of shape.labels) {
              canvas.removeShape(lab);
              if (lab.text) {
                canvas.addShape(lab, shape);
              }
            }
          }
          shape = this.transShapes[(id.trim()).slice(0, -1)];
          if (shape && shape.id) {
            shape.iserror = true;
            canvas.removeShape(shape);
            canvas.addShape(shape, canvas.getRootElement());
            for (const lab of shape.labels) {
              canvas.removeShape(lab);
              if (lab.text) {
                canvas.addShape(lab, shape);
              }
            }

          }
          shape = this.arcShapes.find(e => e.id === (id.trim()).slice(0, -1));
          if (shape) {
            shape.iserror = true;
            this.canvas.removeShape(shape);
            this.canvas.addConnection(shape, this.canvas.getRootElement());
            for (const lab of shape.labels) {
              canvas.removeShape(lab);
              if (lab.text) {
                canvas.addShape(lab, shape);
              }
            }
          }
        }
      }
    });
  }


  connectionDblClick(event) {
    if (event.element.type === 'cpn:Connection' && !event.element.labels[0]) {
      this.addLabelEvent(event, event.element, {type: 'annot'});
      this.diagram.get('eventBus').fire('element.dblclick', {element: event.element});
    }
  }


  modelUpdate() {
    const page = this.applyPageChanges();

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

    //  this.eventService.send(Message.MODEL_UPDATE, {pageObject: page});
  }

  changeSubPageName(subpage) {
    // this.eventService.send(Message.CHANGE_NAME_PAGE,  {id: subpage.subpageid, name: subpage.name, changedElement : 'tran'});
    this.modelService.changeSubPageTransitionName(subpage);
  }

  /**
   *saving to model coordinates after moving
   * @param event
   */
  shapeMoveJsonSaver(event) {
    this.modelService.shapeMoveJsonSaver(event, this.pageId, this.arcShapes);
  }


  /**
   *saving to model coordinates after resize
   * @param event
   */
  shapeResizeJsonSaver(event) {
    console.log(this.constructor.name, 'shapeResizesonSaver(), event = ', event);

    const element = event.shape;

    // const context = event.context;
    // const cpnElement = element.cpnElement;

    // if (cpnElement) {
    //   cpnElement.posattr._x = context.newBounds.x;
    //   cpnElement.posattr._y = context.newBounds.y;

    //   if (cpnElement.ellipse) {
    //     cpnElement.ellipse._w = context.newBounds.width;
    //     cpnElement.ellipse._h = context.newBounds.height;
    //   }
    //   if (cpnElement.box) {
    //     cpnElement.box._w = context.newBounds.width;
    //     cpnElement.box._h = context.newBounds.height;
    //   }
    // }

    for (const label of element.labels) {
      /*  let newX = label.x + event.dx;
        let newY = label.y + event.dy;
        let elementBoards = {
          minx: event.context.newBounds.x - event.context.newBounds.width / 2,
          maxx: event.context.newBounds.x + event.context.newBounds.width / 2,
          miny: event.context.newBounds.y - event.context.newBounds.height / 2,
          maxy: event.context.newBounds.y + event.context.newBounds.height / 2,
        }*/
      if (((event.context.direction === 'ne' || event.context.direction === 'nw') && label.labelType !== 'type' && label.labelType !== 'code' && label.labelType !== 'priority')
        || ((event.context.direction === 'se' || event.context.direction === 'sw') && label.labelType !== 'initmark' && label.labelType !== 'time' && label.labelType !== 'cond')) {
        label.y = label.y + event.dy;
      }

      if (((event.context.direction === 'sw' || event.context.direction === 'nw') && label.labelType !== 'type' && label.labelType !== 'initmark' && label.labelType !== 'time' && label.labelType !== 'code')
        || ((event.context.direction === 'se' || event.context.direction === 'ne') && label.labelType !== 'cond' && label.labelType !== 'priority')) {
        label.x = label.x + event.dx;
      }

      this.canvas.removeShape(label);
      if (label.text) {
        this.canvas.addShape(label, element);
      }

    }
    this.modelService.shapeResizeJsonSaver(event, this.pageId);
  }


  /**
   * saving the created arrow in the model json
   * @param element
   */
  createArcsInModel(element) {
    console.log('Created element ARC ' + element);

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
          _version: '4.0.1'
          // __text: 'annot'
        },
        _id: element.connection.id + 'a'
      },
      _id: element.connection.id,
      _orientation: element.source.type === 'cpn:Place' ? 'PtoT' : 'TtoP',
      _order: 1
    };

    element.connection.stroke = newArc.lineattr._colour;
    element.connection.strokeWidth = newArc.lineattr._thick;
    element.connection.cpnElement = newArc;
    this.arcShapes.push(element.connection);
    //  this.labelEditingProvider.update(element.connection, '');
    ///  this.addShapeLabel(element.connection, newArc.annot, 'annot');
    this.modelService.addElementJsonOnPage(newArc, this.pageId, 'cpn:Connection');
    // this.jsonPageObject.arc.push(newArc);
    // this.modelUpdate();


  }


  /**
   * saving the created place in the model json
   * @param element
   */
  createPlaceInModel(element) {
    // let page = this.jsonPageObject;
    // console.log('actual data -------' + JSON.stringify(page.place[1]));
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
    element.cpnElement = newPlace;
    //  this.placeShapes[attrs.id] = shape;
    this.placeShapes[element.id] = element;
    this.modelService.addElementJsonOnPage(newPlace, this.pageId, 'cpn:Place');
    // this.jsonPageObject.place.push(newPlace);
    // this.modelUpdate();


  }


  /**
   * saving the created transition in the model json
   * @param element
   */
  createTransitionInModel(element) {
    // let page = this.jsonPageObject;
    // console.log('actual data -------' + JSON.stringify(page.trans));
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
    element.name = newTranc.text; // !newTranc.text || newTranc.text.trim() === '' ? String.fromCharCode(566) : newTranc.text;
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
            fillattr: {_colour: 'White', _pattern: 'Solid', _filled: 'false'},
            lineattr: {_colour: 'Black', _thick: '0', _type: 'Solid'},
            posattr: {_x: newTranc.posattr._x, _y: newTranc.posattr._y},
            textattr: {_colour: 'Black', _bold: 'false'},
            _id: newTranc._id + 'e',
            _name: 'Supplier'
          },                  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
          _portsock: '',     /// <<--------------------------------------------------------------------TO DO FILL THIS FIELD PORT ID---------------------------------------------------------------------
          _subpage: subpage.subpageid ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        };
      }
    }

    element.cpnElement = newTranc;
    this.transShapes[element.id] = element;
    this.modelService.addElementJsonOnPage(newTranc, this.pageId, 'cpn:Transition');
    /*if (this.jsonPageObject.trans.length || this.jsonPageObject.trans.length === 0  ) {
      this.jsonPageObject.trans.push(newTranc);
    } else {
      let curTran = this.jsonPageObject.trans;
      this.jsonPageObject.trans = [];
      this.jsonPageObject.trans.push(curTran);
      this.jsonPageObject.trans.push(newTranc);
    }*/
    // this.modelUpdate();
  }


  deleteLabel(elementForUpdate, index, typeElem) {
    /*try {
      if( this.jsonPageObject[typeElem] instanceof Array)
        this.jsonPageObject[typeElem].find( elem => elem._id === elementForUpdate.id)[elementForUpdate.labels[index].labelType].text.__text = undefined;
      else this.jsonPageObject[typeElem][elementForUpdate.labels[index].labelType].text.__text = undefined;
    } catch (err) {
      console.log('!!!!!!!!!' + err + '!!!!!!!!!!');
    }*/
    this.modelService.deleteLabelJsonByCPNElem(elementForUpdate, index, typeElem, this.pageId);
    elementForUpdate.labels.splice(index, 1);
  }


  /**
   * saves changes that have been made  in the property panel to the current model json
   * @param data
   */
  applyPropertyUpdateChanges(data) {
    let pos;
    let attrs;
    let textLabel;
    let newLabel;
    let elementForUpdate;
    if (data.element.type === 'cpn:Place') {
      this.placeShapes[data.element.id] = data.element;
      elementForUpdate = this.placeShapes[data.element.id];
      this.canvas.removeShape(elementForUpdate);
      this.canvas.addShape(elementForUpdate, this.canvas.getRootElement());
      for (const lab of elementForUpdate.labels) {
        this.canvas.removeShape(lab);
        if (lab.text.trim() !== '') {
          this.canvas.addShape(lab, elementForUpdate);
        }
      }
      for (let i = 0; i < elementForUpdate.labels.length; i++) {
        if (elementForUpdate.labels[i].text.trim() === '') {
          this.deleteLabel(elementForUpdate, i, 'place');
        }
      }
    } else if (data.element.type === 'cpn:Transition') {
      this.transShapes[data.element.id] = data.element;
      elementForUpdate = this.transShapes[data.element.id];
      this.canvas.removeShape(elementForUpdate);
      this.canvas.addShape(elementForUpdate, this.canvas.getRootElement());
      for (const lab of elementForUpdate.labels) {
        this.canvas.removeShape(lab);
        if (lab.text.trim() !== '') {
          this.canvas.addShape(lab, elementForUpdate);
        }
      }
      for (let i = 0; i < elementForUpdate.labels.length; i++) {
        if (elementForUpdate.labels[i].text.trim() === '') {
          this.deleteLabel(elementForUpdate, i, 'trans');
        }
      }
    } else if ('cpn:Connection') {
      elementForUpdate = this.arcShapes.find(element => element.id === data.element.id);
      for (const lab of elementForUpdate.labels) {
        const labelbounds = {
          width: lab.width, // 90,
          height: lab.height,
          x: lab.x,
          y: lab.y
        };
        this.labelEditingProvider.update(elementForUpdate, lab.text, '', labelbounds);
      }
    }

    for (const label of data.labels) {
      // pos = {x: 1.0 * label[2].value, y: -1.0 * label[3].value};
      // attrs = {stroke: label[7].value, labelType: label[3].value};
      // textLabel = label[6].value;
      pos = {x: label[2].value, y: label[3].value};
      attrs = {stroke: label[7].value, labelType: label[1].value};
      textLabel = label[6].value;
      newLabel = this.createLabel(elementForUpdate, textLabel, pos, attrs, label[0].value);
      newLabel.hidden = false;
      this.canvas.addShape(newLabel, elementForUpdate);
    }
    this.modelUpdate();
    this.eventService.send(Message.SHAPE_SELECT, {element: elementForUpdate});

  }


  /**
   * saves all changes that have been made  in model-editor to the current model json
   * @param data
   *
   */
  applyPageChanges() {
    /*let page = this.jsonPageObject;
    //console.log('actual data -------' + JSON.stringify(page.place[0]));
   // console.log('moddifi data -------' + JSON.stringify(this.placeShapes[page.place[0]._id]));

    // console.log(JSON.stringify(this.transShapes));
    //  console.log( JSON.stringify(this.arcShapes));
    var bounds;
    let updatedPlace;
    if (!(page.place.length === 0 && !page.place._id)) {
      for (let place of page.place) {
        updatedPlace = this.placeShapes[place._id];
        place.posattr._x = updatedPlace.x + place.ellipse._w / 2;
        place.posattr._y = -1 * updatedPlace.y - place.ellipse._h / 2;
        place.ellipse._w = updatedPlace.width;
        place.ellipse._h = updatedPlace.height;
        place.lineattr._colour = updatedPlace.stroke;
        place.lineattr._thick = updatedPlace.strokeWidth;
        place.text = updatedPlace.name;

        for (let label of this.placeShapes[place._id].labels) {
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
    if (!(page.trans.length === 0 && !page.trans._id) ) {
      let updatedTran;
      if (page.trans.length) {
        for (let tran of page.trans) {
          updatedTran = this.transShapes[tran._id];
          tran.posattr._x = updatedTran.x + tran.box._w / 2;
          tran.posattr._y = -1 * updatedTran.y - tran.box._h / 2;
          tran.box._w = updatedTran.width;
          tran.box._h = updatedTran.height;
          tran.lineattr._colour = updatedTran.stroke;
          tran.lineattr._thick = updatedTran.strokeWidth;
          tran.text = updatedTran.name;

          for (let label of this.transShapes[tran._id].labels) {
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
        let tran = page.trans;
        updatedTran = this.transShapes[tran._id];
        tran.posattr._x = updatedTran.x + tran.box._w / 2;
        tran.posattr._y = -1 * updatedTran.y - tran.box._h / 2;
        tran.box._w = updatedTran.width;
        tran.box._h = updatedTran.height;
        tran.lineattr._colour = updatedTran.stroke;
        tran.lineattr._thick = updatedTran.strokeWidth;
        tran.text = updatedTran.name;

        for (let label of this.transShapes[tran._id].labels) {
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
    if (!(page.arc.length === 0 && !page.arc._id) ) {
      let uodatedCon;
      for (let arc of page.arc) {
        for (let modelArc of this.arcShapes) {
          if (modelArc.id === arc._id) {
            uodatedCon = modelArc;
          }
        }
        if (arc.bendpoint) {
          if (arc.bendpoint.length) {
            for (let point of arc.bendpoint) {
              for (let updWayPoint of uodatedCon.waypoints) {
                if (point._id === updWayPoint.id) {
                  point.posattr._x = updWayPoint.x;
                  point.posattr._y = -1 * updWayPoint.y;
                }
              }
            }
          } else {
            for (let updWayPoint of uodatedCon.waypoints) {
              if (arc.bendpoint._id === updWayPoint.id) {
                arc.bendpoint.posattr._x = updWayPoint.x;
                arc.bendpoint.posattr._y = -1 * updWayPoint.y;
              }
            }
          }

        }
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
    //EmitterService.getAppMessageEmitter().emit(
    //  {
    //    id: Constants.ACTION_MODEL_UPDATE,
    //    pageObject: page
    //  });
    return page;*/
    return this.modelService.applyPageChanges(this.pageId, this.placeShapes, this.textRenderer, this.transShapes, this.arcShapes);
  }

  /**
   * create label for element of model
   * @param event
   * @param element
   * @param context
   */
  addLabelEvent(event, element, context): boolean {
    const page = this.modelService.getPageById(this.pageId);
    let isAdd = false;
    let entry;
    if (element.type === 'cpn:Transition') {
      entry = page.trans;
    } else if (element.type === 'cpn:Place') {
      entry = page.place;
    } else if (element.type === 'cpn:Connection') {
      entry = page.arc;
    }


    entry = entry.length ? entry : [entry];
    for (const modelElem of entry) {
      if (modelElem._id === element.id && !modelElem[context.type].text.__text) {
        this.modelService.changeLabelText(modelElem[context.type], this.projectService.getAppSettings()[context.type], this.pageId); // 'cond'
        this.addShapeLabel(element, modelElem[context.type], context.type);
        isAdd = true;
      }
    }
    return isAdd;

    /*
    let isAdd = false;
    if (element.type === 'cpn:Transition') {
      if (context.type === 'cond') {
        let page = this.jsonPageObject;
        if (page.trans.length) {
          for (let tran of page.trans) {
            if (tran._id === element.id && !tran.cond.text.__text) {
              tran.cond.text.__text = this.projectService.getAppSettings()['cond']; //'cond'
              this.addShapeLabel(element, tran.cond, 'cond');
              isAdd = true;
            }
          }
        } else {
          let tran = page.trans;
          if (tran._id === element.id && !tran.cond.text.__text) {
            tran.cond.text.__text = this.projectService.getAppSettings()['cond']; //cond
            this.addShapeLabel(element, tran.cond, 'cond');
            isAdd = true;
          }
        }

      }
      if (context.type === 'time') {
        let page = this.jsonPageObject;
        if (page.trans.length) {
          for (let tran of page.trans) {
            if (tran._id === element.id && !tran.time.text.__text) {
              tran.time.text.__text = this.projectService.getAppSettings()['time'];
              this.addShapeLabel(element, tran.time, 'time');
              isAdd = true;
            }
          }
        } else {
          let tran = page.trans;
          if (tran._id === element.id && !tran.time.text.__text) {
            tran.time.text.__text = this.projectService.getAppSettings()['time'];
            this.addShapeLabel(element, tran.time, 'time');
            isAdd = true;
          }
        }

      }
      if (context.type === 'code') {
        let page = this.jsonPageObject;
        if (page.trans.length) {
          for (let tran of page.trans) {
            if (tran._id === element.id && !tran.code.text.__text) {
              tran.code.text.__text = this.projectService.getAppSettings()['code'];
              this.addShapeLabel(element, tran.code, 'code');
              isAdd = true;
            }
          }
        } else {
          let tran = page.trans;
          if (tran._id === element.id && !tran.code.text.__text) {
            tran.code.text.__text = this.projectService.getAppSettings()['code'];
            this.addShapeLabel(element, tran.code, 'code');
            isAdd = true;
          }
        }

      }
      if (context.type === 'priority') {
        let page = this.jsonPageObject;
        if (page.trans.length) {
          for (let tran of page.trans) {
            if (tran._id === element.id && !tran.priority.text.__text) {
              tran.priority.text.__text = this.projectService.getAppSettings()['priority'];
              this.addShapeLabel(element, tran.priority, 'priority');
              isAdd = true;
            }
          }
        } else {
          let tran = page.trans;
          if (tran._id === element.id && !tran.priority.text.__text) {
            tran.priority.text.__text = this.projectService.getAppSettings()['priority'];
            this.addShapeLabel(element, tran.priority, 'priority');
            isAdd = true;
          }
        }

      }
    } else if (element.type === 'cpn:Place') {
      if (context.type === 'initmark') {
        let page = this.jsonPageObject;
        if (page.place.length) {
          for (let place of page.place) {
            if (place._id === element.id && !place.initmark.text.__text) {
              place.initmark.text.__text = this.projectService.getAppSettings()['initmark'];
              this.addShapeLabel(element, place.initmark, 'initmark');
              isAdd = true;
            }
          }
        } else {
          let place = page.place;
          if (place._id === element.id && !place.initmark.text.__text) {
            place.initmark.text.__text = this.projectService.getAppSettings()['initmark'];
            this.addShapeLabel(element, place.initmark, 'initmark');
            isAdd = true;
          }
        }
      } else if (context.type === 'type') {
        let page = this.jsonPageObject;
        if (page.place.length) {
          for (let place of page.place) {
            if (place._id === element.id && !place.type.text.__text) {
              place.type.text.__text = this.projectService.getAppSettings()['type'];
              this.addShapeLabel(element, place.type, 'type');
              isAdd = true;
            }
          }
        } else {
          let place = page.place;
          if (place._id === element.id && !place.type.text.__text) {
            place.type.text.__text = this.projectService.getAppSettings()['type'];
            this.addShapeLabel(element, place.type, 'type');
            isAdd = true;
          }
        }
      }

    } else if (element.type === 'cpn:Connection') {
      if (context.type === 'annot') {
        let page = this.jsonPageObject;
        if (page.arc.length) {
          for (let arc of page.arc) {
            if (arc._id === element.id && !arc.annot.text.__text) {
              arc.annot.text.__text = this.projectService.getAppSettings()['annot'];
              this.addShapeLabel(element, arc.annot, 'annot');
              isAdd = true;
            }
          }
        } else {
          let arc = page.place;
          if (arc._id === element.id && !arc.annot.text.__text) {
            arc.annot.text.__text = this.projectService.getAppSettings()['annot'];
            this.addShapeLabel(element, arc.annot, 'annot');
            isAdd = true;
          }
        }
      }
    }
    return isAdd;**/
  }


  /**
   * create label by preesing f2 key
   * @param event
   */
  // @HostListener('window:keydown', ['$event'])
  // f2KeyDownHandler(event) {// keyEvent(event: KeyboardEvent) {

  //   if (event.keyCode === 9 && this.projectService.currentPageId === this.pageId) {
  //     event.stopImmediatePropagation();
  //     // event.stopPropagation();
  //     // event.preventDefault();

  //     let jsonElement;
  //     let labelStack;
  //     let labelType;
  //     if (!this.tabStack.element || this.projectService.getCurrentElement().id !== this.tabStack.element.id) {
  //       this.tabStack.element = this.projectService.getCurrentElement();
  //       this.tabStack.current = undefined;
  //     }
  //     // if(this.curentElement.type === 'cpn:Transition') {
  //     //   labelType =  'trans';
  //     //
  //     // } else if(this.curentElement.type === 'cpn:Place') {
  //     //   labelType =  'place';
  //     //
  //     // } else if(this.curentElement.type === 'cpn:Connection') {
  //     //   labelType =  'arc';
  //     //
  //     // }
  //     labelType = this.modelService.getModelCase(this.tabStack.element.type);


  //     labelStack = this.tabStack.stack[labelType];
  //     jsonElement = this.modelService.getJsonElementOnPage(this.pageId, this.tabStack.element.id, this.tabStack.element.type); // this.jsonPageObject[labelType].length ? this.jsonPageObject[labelType].find(elem => { return this.curentElement.id === elem._id }) : this.jsonPageObject[labelType];
  //     const lastAddedElement = this.tabStack.element.labels.find(element => Object.values(this.projectService.getAppSettings()).includes(element.text));
  //     if (lastAddedElement) {
  //       this.canvas._removeElement(lastAddedElement, 'cpn:Label');
  //       this.modelService.changeLabelText(jsonElement[Object.keys(labelStack).find(key => labelStack[key] === this.tabStack.current)], null, this.pageId);
  //       this.tabStack.element.labels.splice(this.tabStack.element.labels.indexOf(lastAddedElement), 1);

  //     }

  //     if (labelType !== 'arc' && this.tabStack.current === 'edit') {
  //       this.tabStack.current = this.tabStack.current ? labelStack[this.tabStack.current] : labelStack[Object.keys(labelStack)[Object.keys(labelStack).length - 1]];

  //       this.diagram.get('eventBus').fire('element.dblclick', { element: this.tabStack.element });
  //     } else {
  //       const elemtnForEdit = this.tabStack.current ? this.tabStack.current : labelStack[Object.keys(labelStack)[Object.keys(labelStack).length - 1]];
  //       this.tabStack.current = labelStack[elemtnForEdit];
  //       if (labelType !== 'arc') {
  //         this.addLabelEvent(event, this.tabStack.element, { type: elemtnForEdit });
  //       }
  //       this.diagram.get('eventBus').fire('element.tab', { element: this.tabStack.element.labels.find(elem => elem.labelType === elemtnForEdit) });
  //     }


  //   }
  // }

  gotoNextLabelEditing(element) {
    console.log('gotoNextLabelEditing(), element = ', element);

    // if element is Place or Transition
    if (element.labels && element.labels.length > 0) {
      this.diagram.get('eventBus').fire('element.edit', {element: element.labels[0]});
    }

    // if element is Label
    if (element.labelTarget &&
      element.labelTarget.labels &&
      element.labelTarget.labels.length > 0) {
      const labels = element.labelTarget.labels;

      console.log('gotoNextLabelEditing(), labels = ', labels);

      let nextIndex = -1;
      for (let i = 0; i < labels.length; i++) {
        if (labels[i].id === element.id) {
          nextIndex = i + 1;
          break;
        }
      }

      console.log('gotoNextLabelEditing(), nextIndex = ', nextIndex);

      if (nextIndex > -1 && nextIndex < labels.length) {
        // fire edit for next label
        this.diagram.get('eventBus').fire('element.edit', {element: labels[nextIndex]});
      } else {
        // fire edit for owner element
        this.diagram.get('eventBus').fire('element.edit', {element: element.labelTarget});
      }
    }

    // let jsonElement;
    // let labelStack;
    // let labelType;
    //
    // if (!this.tabStack.element || this.projectService.getCurrentElement().id !== this.tabStack.element.id) {
    //   this.tabStack.element = this.projectService.getCurrentElement();
    //   this.tabStack.current = undefined;
    // }
    //
    // labelType = this.modelService.getModelCase(this.tabStack.element.type);
    //
    // labelStack = this.tabStack.stack[labelType];
    // jsonElement = this.modelService.getJsonElementOnPage(this.pageId, this.tabStack.element.id, this.tabStack.element.type); // this.jsonPageObject[labelType].length ? this.jsonPageObject[labelType].find(elem => { return this.curentElement.id === elem._id }) : this.jsonPageObject[labelType];
    // const lastAddedElement = this.tabStack.element.labels.find(element => Object.values(this.projectService.getAppSettings()).includes(element.text));
    // if (lastAddedElement) {
    //   this.canvas._removeElement(lastAddedElement, 'cpn:Label');
    //   this.modelService.changeLabelText(jsonElement[Object.keys(labelStack).find(key => labelStack[key] === this.tabStack.current)], null, this.pageId);
    //   this.tabStack.element.labels.splice(this.tabStack.element.labels.indexOf(lastAddedElement), 1);
    //
    // }
    //
    // if (labelType !== 'arc' && this.tabStack.current === 'edit') {
    //   this.tabStack.current = this.tabStack.current ? labelStack[this.tabStack.current] : labelStack[Object.keys(labelStack)[Object.keys(labelStack).length - 1]];
    //
    //   this.diagram.get('eventBus').fire('element.dblclick', { element: this.tabStack.element });
    // } else {
    //   const elemtnForEdit = this.tabStack.current ? this.tabStack.current : labelStack[Object.keys(labelStack)[Object.keys(labelStack).length - 1]];
    //   this.tabStack.current = labelStack[elemtnForEdit];
    //   if (labelType !== 'arc') {
    //     this.addLabelEvent(event, this.tabStack.element, { type: elemtnForEdit });
    //   }
    //   this.diagram.get('eventBus').fire('element.tab', { element: this.tabStack.element.labels.find(elem => elem.labelType === elemtnForEdit) });
    // }
  }

  /**
   * open elemen property panel after klick on it
   * @param event
   */
  fireSelectionEvent(event) {
    if (!this.projectService.currentPageId || this.projectService.currentPageId !== this.pageId) {
      this.projectService.currentPageId = this.pageId;
    }
    if (this.projectService.getCurrentElement()) {
      for (let i = 0; i < this.projectService.getCurrentElement().labels.length; i++) {
        const elemLabel = this.projectService.getCurrentElement().labels[i];
        if (Object.values(this.projectService.appSettings).includes(elemLabel.text)) {

          this.canvas.removeShape(elemLabel);
          // modelElement.labels.splice(i, 1);
        }
      }
      this.modelService.clearDefaultLabelValues(this.pageId);
    }

    let element = event.element || event.shape || event.connection;
    this.projectService.setCurrentElement(element);

    // this.curentElement = element;
    //  console.log('fireSelectionEvent(), event = ', event);
    if (element) {

      // EmitterService.getAppMessageEmitter().emit(
      //   {
      //     id: Constants.ACTION_SHAPE_SELECT,
      //     element: element
      //   });

      this.eventService.send(Message.SHAPE_SELECT, {element: element, cpnElement: element.cpnElement, type: element.type});
      // this.curentElement = element;
      // this.tabStack.element = element;
    }
  }

  fireAllEvents(event) {
    console.log('fireDEACTIVATE(), event = ', event === null ? 'NULL' : event);
  }

  loadTestModel() {
    const root = this.canvas.getRootElement();

    const p1 = this.elementFactory.createShape({
      type: 'cpn:Place',
      name: 'Place 1',
      x: 100,
      y: 100,
      width: 100,
      height: 70,
      fill: '#fee',
      stroke: '#c33',
      strokeWidth: 3,
    });
    this.canvas.addShape(p1, root);

    const t1 = this.elementFactory.createShape({
      type: 'cpn:Transition',
      name: 'Transition 1',
      x: 400,
      y: 100,
      width: 100,
      height: 70,
      stroke: 'green',
    });

    this.canvas.addShape(t1, root);

    this.labelEditingProvider.update(t1, '222222222222');
    assign(t1.label, {stroke: 'green'});
    // console.log('labelEditingProvider.update(t1) !!!, t1.label = ', t1.label);

    const p2 = this.elementFactory.createShape({
      type: 'cpn:Place',
      name: 'Place 2',
      x: 700,
      y: 100,
      width: 100,
      height: 70,
      fill: '#fee',
      stroke: '#c33',
      strokeWidth: 3,
    });
    this.canvas.addShape(p2, root);

    let attrs: any = {
      type: 'cpn:Connection',
      waypoints: [
        {x: 150, y: 110},
        {x: 200, y: 200},
        {x: 450, y: 105}
      ],
      stroke: 'red',
      strokeWidth: 1,
    };

    attrs = {
      type: 'cpn:Connection',
      // id: "connection1",
      waypoints: [
        {x: 750, y: 110},
        // { x: 200, y: 200 },
        {x: 450, y: 105}
      ],
      stroke: 'red',
      strokeWidth: 1,
    };

    const c1 = this.modeling.connect(p2, t1, attrs, null);
    this.labelEditingProvider.update(c1, 'cccccccccccccc');
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
      this.diagram.createDiagram(function () {
        that.loadPageDiagram(pageObject);
      });
    } else {
      this.canvas._clear();
    }
  }

  loadPageDiagram(pageObject) {
    // console.log('ModelEditorComponent. load()');
    // console.log(pageObject);

    // console.log('ModelEditorComponent. load(), pageObject = ' + JSON.stringify(pageObject));

    // this.diagram.clear();

    this.placeShapes = [];
    this.transShapes = [];
    this.arcShapes = [];
    console.log('Model-Editor Start');

    if (pageObject) {
      const root = this.canvas.getRootElement();

      const zoomScroll = this.diagram.get('zoomScroll');
      const moveCanvas = this.diagram.get('moveCanvas');

      const modelBounds = {
        x: 100000,
        y: 100000,
        width: 0,
        height: 0
      };

      // Places
      if (pageObject.place) {
        for (const place of pageObject.place) {
          const attrs = this.getPlaceShapeAttrs(place);

          this.updateModelBounds(modelBounds, attrs);

          let shape = this.elementFactory.createShape(attrs);
          shape.cpnElement = place;

          shape = this.canvas.addShape(shape, root);
          this.placeShapes[attrs.id] = shape;

          this.addShapeLabel(shape, place.type, 'type');
          this.addShapeLabel(shape, place.initmark, 'initmark');

        }
      }

      // Transitions
      if (pageObject.trans) {
        if (pageObject.trans.length) {
          for (const trans of pageObject.trans) {
            this.setModelTransitions(trans, modelBounds, root);
          }
        } else {
          this.setModelTransitions(pageObject.trans, modelBounds, root);
        }
      }

      // Arcs
      if (pageObject.arc) {
        for (const arc of pageObject.arc) {
          const data = this.getConnectionAttrs(arc, pageObject);
          if (data) {
            const conn = this.modeling.connect(data.source, data.target, data.attrs, null);

            this.arcShapes.push(conn);
            if (arc.annot.text && arc.annot.text.length > 0) {
              const label = ' '; // arc.annot.text;
              this.labelEditingProvider.update(conn, label);
            }
            this.addShapeLabel(conn, arc.annot, 'annot');
          }
        }
      }

      // Aux
      if (pageObject.Aux) {
        if (pageObject.Aux instanceof Array) {
          for (const aux of pageObject.Aux) {
            let pos;
            if (aux.posattr) {
              // var x = 1.0 * labelNode.posattr["@attributes"].x;
              // var y = -1.0 * labelNode.posattr["@attributes"].y;
              const x = 1.0 * aux.posattr._x;
              const y = -1.0 * aux.posattr._y;
              pos = {x: x, y: y};
            }

            let attrs = {stroke: 'black', labelType: aux};
            if (aux.textattr) {
              let stroke = aux.stroke || 'black';
              // var stroke = labelNode.textattr["@attributes"].color || 'black';
              stroke = this.correctColor[stroke] || stroke;

              attrs = {stroke: stroke, labelType: aux};
            }
            const textLabel = typeof aux.text === 'string' ? aux.text : aux.text.__text;
            const label = this.createLabel(this.canvas.getRootElement(), textLabel, pos, attrs, aux._id);
            label.hidden = false;
            this.canvas.addShape(label, this.canvas.getRootElement());
          }

        }
      }


      console.log('modelBounds = ', modelBounds);

      const viewbox = this.canvas.viewbox();
      // console.log('viewbox = ', viewbox);
      // viewbox.x = -100;
      // viewbox.y = -20;
      // viewbox.width = modelBounds.width + 300;
      // viewbox.height = modelBounds.height + 200;
      // this.canvas.viewbox(viewbox);
      // this.canvas.scroll({ dx: -1.0 * modelBounds.x, dy: -1.0 * modelBounds.y });

      // var vb = {
      //   x: modelBounds.x,
      //   y: modelBounds.y,
      //   width: Math.max(modelBounds.width, viewbox.width),
      //   height: Math.max(modelBounds.height, viewbox.height)
      // };
      const vb = modelBounds;
      this.canvas.viewbox(vb);

      // console.log('modelBounds = ', modelBounds);
      // this.canvas.viewbox(modelBounds);
      // viewbox = this.canvas.viewbox();
      // console.log('viewbox = ', viewbox);

      this.canvas.zoom(0.7, {x: vb.width / 2, y: vb.height / 2});
    }
  }

  setModelTransitions(trans: any, modelBounds: any, root: any) {
    if (trans.lenght > 0 || (trans._id)) {
      const attrs = this.getTransShapeAttrs(trans);
      this.updateModelBounds(modelBounds, attrs);
      let shape = this.elementFactory.createShape(attrs);

      shape.cpnElement = trans;

      shape = this.canvas.addShape(shape, root);
      this.transShapes[attrs.id] = shape;

      if (trans.cond) {
        this.addShapeLabel(shape, trans.cond, 'cond');
      }
      if (trans.time) {
        this.addShapeLabel(shape, trans.time, 'time');
      }
      if (trans.code) {
        this.addShapeLabel(shape, trans.code, 'code');
      }
      if (trans.priority) {
        this.addShapeLabel(shape, trans.priority, 'priority');
      }
    }
  }

  addShapeLabel(shape, labelNode, labelType) {
    // if (labelNode && labelNode.text && typeof labelNode.text === 'string' ? true : labelNode.text.__text) {

      let pos;
      if (labelNode.posattr) {
        // var x = 1.0 * labelNode.posattr["@attributes"].x;
        // var y = -1.0 * labelNode.posattr["@attributes"].y;
        const x = 1.0 * labelNode.posattr._x;
        const y = -1.0 * labelNode.posattr._y;
        pos = {x: x, y: y};
      }

      let attrs = {stroke: 'black', labelType: labelType};
      if (labelNode.textattr) {
        let stroke = shape.stroke || 'black';
        // var stroke = labelNode.textattr["@attributes"].color || 'black';
        stroke = this.correctColor[stroke] || stroke;

        attrs = {stroke: stroke, labelType: labelType};
      }
      const textLabel = typeof labelNode.text === 'string' ? labelNode.text : labelNode.text.__text;
      const label = this.createLabel(shape, textLabel, pos, attrs, labelNode._id);
      label.hidden = false;
      return this.canvas.addShape(label, shape);

    // }
    // return undefined;
  }

  // Вычислим координаты всей модели по кадому элементу
  //
  updateModelBounds(bounds, attrs) {
    if (bounds.x > attrs.x) {
      bounds.x = attrs.x;
    }
    if (bounds.y > attrs.y) {
      bounds.y = attrs.y;
    }

    if (bounds.width < Math.abs(attrs.x + attrs.width - bounds.x)) {
      bounds.width = Math.abs(attrs.x + attrs.width - bounds.x);
    }
    if (bounds.height < Math.abs(attrs.y + attrs.height - bounds.y)) {
      bounds.height = Math.abs(attrs.y + attrs.height - bounds.y);
    }
    return bounds;
  }

  // add label
  createLabel(element, labelText, pos, attrs, labelNodeId) {
    let bounds,
      text,
      label,
      semantic;

    semantic = element.businessObject;
    // console.log('createLabel(), element, semantic ', element, semantic);

    if (!pos) {
      pos = {x: Math.round(bounds.x), y: Math.round(bounds.y)};
    }

    // bounds = getExternalLabelBounds(semantic, element);
    bounds = {
      width: 200, // 90,
      height: 30,
      x: pos.x,
      y: pos.y
    };

    text = labelText || semantic.name;

    if (text) {
      // get corrected bounds from actual layouted text
      bounds = this.textRenderer.getExternalLabelBounds(bounds, text);
    }


    label = this.elementFactory.createLabel(this.elementData(semantic, {
      id: semantic.id + '_label_' + this.makeid(6),
      labelNodeId: labelNodeId,
      labelTarget: element,
      type: 'cpn:Label',
      hidden: element.hidden || !semantic.name,
      text: text,
      x: pos.x - Math.round(bounds.width) / 2,
      y: pos.y - Math.round(bounds.height) / 2,
      width: Math.round(bounds.width),
      height: Math.round(bounds.height),
      stroke: attrs.stroke,
      labelType: attrs.labelType
    }));

    // this.labelEditingProvider.update(element, label);
    // this.labelEditingProvider.update(element, text);

    return label;
  }

  elementData(semantic, attrs) {
    return assign({
      id: semantic.id,
      type: semantic.$type,
      businessObject: semantic
    }, attrs);
  }

  makeid(length) {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
  }

  getPlaceShapeAttrs(obj) {
    let
      // x = 1 * obj.posattr["@attributes"].x,
      // y = -1 * obj.posattr["@attributes"].y,
      // w = 1 * obj.ellipse["@attributes"].w,
      // h = 1 * obj.ellipse["@attributes"].h;
      x = 1 * obj.posattr._x,
      y = -1 * obj.posattr._y,
      w = 1 * obj.ellipse._w,
      h = 1 * obj.ellipse._h;

    x -= w / 2;
    y -= h / 2;

    // var stroke = obj.lineattr["@attributes"].colour || 'black';
    let stroke = obj.lineattr._colour || 'black';
    const strokeWidth = 2; // obj.lineattr["@attributes"].thick || 1;

    // console.log('getPlaceShapeData(obj), obj = ', obj.text, obj);
    stroke = this.correctColor[stroke] || stroke;
    // console.log('stroke = ', stroke);

    return {
      type: 'cpn:Place',
      // id: obj["@attributes"].id,
      id: obj._id,
      x: x,
      y: y,
      width: w,
      height: h,
      name: obj.text,
      stroke: stroke,
      strokeWidth: strokeWidth,

      // businessObject: {
      //   text: obj.text,
      // }
    };
  }

  getTransShapeAttrs(obj) {
    let
      // x = 1 * obj.posattr["@attributes"].x,
      // y = -1 * obj.posattr["@attributes"].y,
      // w = 1 * obj.box["@attributes"].w,
      // h = 1 * obj.box["@attributes"].h;
      x = 1 * obj.posattr._x,
      y = -1 * obj.posattr._y,
      w = 1 * obj.box._w,
      h = 1 * obj.box._h;

    x -= w / 2;
    y -= h / 2;

    // var stroke = obj.lineattr["@attributes"].colour || 'black';
    let stroke = obj.lineattr._colour || 'black';
    const strokeWidth = 2; // obj.lineattr["@attributes"].thick || 1;

    stroke = this.correctColor[stroke] || stroke;

    return {
      type: 'cpn:Transition',
      // id: obj["@attributes"].id,
      id: obj._id,
      x: x,
      y: y,
      width: w,
      height: h,
      name: obj.text,
      stroke: stroke,
      strokeWidth: strokeWidth,
      hierar: this.subpages.find(e => e.subpageid === obj._id || e.tranid === obj._id) ? 'subPage' : 'tran'
      // businessObject: {
      //   text: obj.text,
      // }
    };
  }

  getConnectionAttrs(arc, pageObject) {
    // let placeShape = this.placeShapes[arc.placeend["@attributes"].idref];
    // let transShape = this.transShapes[arc.transend["@attributes"].idref];

    const placeShape = this.placeShapes[arc.placeend._idref];
    const transShape = this.transShapes[arc.transend._idref];
    // console.log(this.canvas._elementRegistry._elements);
    // const elements =  this.canvas._elementRegistry._elements;

    // var stroke = arc.lineattr["@attributes"].colour || 'black';
    // var strokeWidth = arc.lineattr["@attributes"].thick || 1;

    let stroke = arc.lineattr._colour || 'black';
    const strokeWidth = arc.lineattr._thick || 1;

    stroke = this.correctColor[stroke] || stroke;

    // var orientation = arc["@attributes"].orientation;
    const orientation = arc._orientation;
    let source = placeShape;
    let target = transShape;
    let reverse = this.modelService.isLooadModel() ? true : false;
    if (orientation && orientation === 'TtoP') {
      source = transShape;
      target = placeShape;
      reverse = true;
    }

    let waypoints = [];
    waypoints.push({
      x: source.x + Math.abs(source.width / 2),
      y: source.y + Math.abs(source.height / 2),
      id: source._id
    });

    if (arc.bendpoint) {
      if (arc.bendpoint.posattr) {
        waypoints.push({
          // x: 1 * arc.bendpoint.posattr["@attributes"].x,
          // y: -1 * arc.bendpoint.posattr["@attributes"].y
          x: 1 * arc.bendpoint.posattr._x,
          y: -1 * arc.bendpoint.posattr._y,
          id: arc.bendpoint._id
        });
      }
      if (arc.bendpoint instanceof Array) {
        const arr = arc.bendpoint;
        if (!reverse) {
          arr.reverse();
        }
        arr.forEach(p => {
          waypoints.push({
            // x: 1 * p.posattr["@attributes"].x,
            // y: -1 * p.posattr["@attributes"].y
            x: 1 * p.posattr._x,
            y: -1 * p.posattr._y,
            id: p._id
          });
        });
      }
    }

    waypoints.push({
      x: target.x + Math.abs(target.width / 2),
      y: target.y + Math.abs(target.height / 2),
      id: target._id
    });

    // выравнивание точек соединения по bendpoins
    const n = waypoints.length;
    if (n > 2) {
      // y
      if (Math.abs(waypoints[0].y - waypoints[1].y) < 20) {
        waypoints[0].y = waypoints[1].y;
      }
      if (Math.abs(waypoints[n - 1].y - waypoints[n - 2].y) < 20) {
        waypoints[n - 1].y = waypoints[n - 2].y;
      }

      // x
      if (Math.abs(waypoints[0].x - waypoints[1].x) < 20) {
        waypoints[0].x = waypoints[1].x;
      }
      if (Math.abs(waypoints[n - 1].x - waypoints[n - 2].x) < 20) {
        waypoints[n - 1].x = waypoints[n - 2].x;
      }
    } else {

      for (const verArc of pageObject.arc) {
        if (arc._id !== verArc._id &&
          ((arc.placeend._idref === verArc.transend._idref && arc.transend._idref === verArc.placeend._idref) ||
            (arc.placeend._idref === verArc.placeend._idref && arc.transend._idref === verArc.transend._idref))) {
          waypoints = this.optimiseEqualsArcsByWayoints(waypoints, source.width / 8);
        }
      }


    }

    if (source && target) {
      const attrs = {
        type: 'cpn:Connection',
        // id: arc["@attributes"].id,
        id: arc._id,
        waypoints: waypoints,
        stroke: stroke,
        strokeWidth: strokeWidth,
        cpnElement: arc
      };

      return {source: source, target: target, attrs: attrs};
    }

    return undefined;
  }


  angle(cx, cy, ex, ey) {
    const dy = ey - cy;
    const dx = ex - cx;
    const theta = Math.atan2(dy, dx); // range (-PI, PI]
    // theta *= 180 / Math.PI; // rads to degs, range (-180, 180]
    // if (theta < 0) theta = 360 + theta; // range [0, 360)
    return theta;
  }


  optimiseEqualsArcsByWayoints(arc, delta) {
    const dx = Math.sin(this.angle(arc[0].x, arc[0].y, arc[1].x, arc[1].y) - Math.PI) * delta;
    const dy = Math.cos(this.angle(arc[0].x, arc[0].y, arc[1].x, arc[1].y) - Math.PI) * delta;

    arc[0].x = arc[0].x + dx;
    arc[0].y = arc[0].y + dy;
    arc[1].x = arc[1].x + dx;
    arc[1].y = arc[1].y + dy;

    return arc;
  }


}
