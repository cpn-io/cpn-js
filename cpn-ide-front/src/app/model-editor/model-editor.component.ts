import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

import Diagram from 'diagram-js';
import CpnDiagramModule from '../../lib/cpn-js/core';

import { Message } from '../common/message';
import { EventService } from '../services/event.service';
import { ModelService } from '../services/model.service';
import { SettingsService } from '../services/settings.service';
import { ValidationService } from '../services/validation.service';

import { importCpnPage } from '../../lib/cpn-js/import/Importer';

import {
  CPN_LABEL,
  CPN_TOKEN_LABEL,
  CPN_MARKING_LABEL,
  isCpn,
  is,
  CPN_PLACE,
  CPN_TRANSITION,
  CPN_CONNECTION,
  isAny,
} from '../../lib/cpn-js/util/ModelUtil';
import { AccessCpnService } from '../services/access-cpn.service';


@Component({
  selector: 'app-model-editor',
  templateUrl: './model-editor.component.html',
  styleUrls: ['./model-editor.component.scss']
})
export class ModelEditorComponent implements OnInit {

  constructor(private eventService: EventService,
    private settings: SettingsService,
    private modelService: ModelService,
    private validationService: ValidationService,
    private accessCpnService: AccessCpnService) {
  }

  @ViewChild('container') containerElementRef: ElementRef;
  @Input() id: string;


  diagram: Diagram;
  elementFactory;
  cpnFactory;
  canvas;
  dragging;
  modeling;
  eventBus;
  labelEditingProvider;
  textRenderer;
  selectedElement;
  jsonPageObject;
  portMenuProvider;
  // subscription: Subscription;
  subpages = [];
  placeShapes = [];
  transShapes = [];
  arcShapes = [];
  curentElement;
  pageId;
  transCount = 0;

  loading = false;

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

    this.elementFactory = this.diagram.get('elementFactory');
    this.dragging = this.diagram.get('dragging');
    this.canvas = this.diagram.get('canvas');
    this.modeling = this.diagram.get('modeling');
    this.eventBus = this.diagram.get('eventBus');
    this.labelEditingProvider = this.diagram.get('labelEditingProvider');
    this.textRenderer = this.diagram.get('textRenderer');
    this.cpnFactory = this.diagram.get('cpnFactory');
    this.portMenuProvider = this.diagram.get('portMenuProvider');

    const eventBus = this.eventBus;

    // set defualt values to diagram
    // -----------------------------------------------------
    for (const key of ['type', 'initmark', 'cond', 'time', 'code', 'priority', 'annot', 'ellipse', 'box']) {
      this.modeling.setDefaultValue(key, this.settings.getAppSettings()[key]);
    }

    eventBus.on('import.render.complete', (event) => {
      this.loading = false;
      console.log('import.render.complete, event = ', event);

      // this.updateElementStatus();
      // this.eventBus.fire('model.update.cpn.status', { data: { process: '*' } });
    });

    // eventBus.on('element.changed', (event) => {
    //   console.log('ModelEditor, element.changed, event = ', event);
    // });

    this.eventService.on(Message.SERVER_INIT_NET_START, () => {
      this.log('Validation process...');
      // this.eventBus.fire('model.update.cpn.status', { data: { process: '*' } });
    });

    // VALIDATION RESULT
    this.eventService.on(Message.SERVER_INIT_NET_DONE, (event) => {
      console.log('ModelEditor, SERVER_INIT_NET_DONE, event = ', event);
      this.updateElementStatus();
    });

    // TOKENS
    this.eventService.on(Message.SERVER_GET_TOKEN_MARKS, (event) => {
      this.updateElementStatus();
    });

    // TRANSITIONS
    this.eventService.on(Message.SERVER_GET_TRANSITIONS, (data) => {
      this.updateElementStatus();
    });

    eventBus.on('element.hover', (event) => {
      if (event.element.type === 'cpn:Transition' || event.element.type === 'cpn:Place') {
        this.eventService.send(Message.SHAPE_HOVER, { element: event.element });
      }
    });
    eventBus.on('element.out', (event) => {
      if (event.element.type === 'cpn:Transition' || event.element.type === 'cpn:Place') {
        this.eventService.send(Message.SHAPE_OUT, { element: event.element });
      }
    });
    const self = this;
    eventBus.on('directEditing.cancel', function (e) {
      console.log('model-editor directEditing.cancel - event', e);
      self.openPropPanel(e.active.element);
      self.selectedElement = undefined;
    });

    eventBus.on('directEditing.complete', function (e) {
      console.log('model-editor directEditing.complete - event', e);
      if (e.active && e.active.element) {
        self.openPropPanel(e.active.element);
      }
    });

    eventBus.on('element.click', (event) => {
      this.fireSelectionEvent(event);
    });

    eventBus.on('shape.create.end', (event) => {
      if (event.elements) {
        for (const element of event.elements) {
          if (element.cpnElement) {
            this.modelService.addElementJsonOnPage(element.cpnElement, this.pageId, element.type);

            if (element.type === CPN_TRANSITION && element.cpnElement.subst) {
              element.cpnElement.subst._subpage = 'id' + new Date().getTime();

              this.eventService.send(Message.SUBPAGE_TRANS_CREATE, {
                currentPageId: this.pageId,
                id: element.cpnElement.subst._subpage,
                cpnElement: element.cpnElement
              });
            }
          }
        }
      }
    });

    eventBus.on('shape.delete', (event) => {
      if (event.elements) {
        for (const elem of event.elements) {
          this.modelService.deleteElementFromPageJson(this.pageId, elem.id, elem.type);
        }
      }
    });

    eventBus.on('portMenuProvider.open', (event) => {
      if (event.trans && event.trans.cpnElement && event.trans.cpnElement.subst) {
        const pageObj = this.modelService.getPageById(event.trans.cpnElement.subst._subpage);
        if (pageObj) {
          const list = [];
          for (const place of pageObj.place) {
            if (place.port && (place.port._type === 'I/O' || place.port._type === event.portType)) {
              list.push({
                id: place._id,
                name: place.text,
                type: place.port._type
              });
            }
          }
          this.portMenuProvider.open({ trans: event.trans, place: event.place, arc: event.arc, list: list }, event.position, this.modeling);
        }
      }
    });


    // this._eventBus.fire('bind.port.cancel', {connection: this._createdArc});

  }

  /**
   * Update element status
   */
  updateElementStatus() {
    this.eventBus.fire('model.update.cpn.status', { data: { clear: '*' } });

    // console.log('updateElementStatus(), tokenData = ', this.accessCpnService.getTokenData());
    // console.log('updateElementStatus(), readyData = ', this.accessCpnService.getReadyData());
    // console.log('updateElementStatus(), errorData = ', this.accessCpnService.getErrorData());

    if (this.accessCpnService.getTokenData().length > 0) {
      this.eventBus.fire('model.update.tokens', { data: this.accessCpnService.getTokenData() });
    }

    if (this.accessCpnService.getReadyData().length > 0) {
      this.eventBus.fire('model.update.cpn.status', { data: { ready: this.accessCpnService.getReadyData() } });
    }

    if (Object.keys(this.accessCpnService.getErrorData()).length > 0) {
      const errorIds = [];
      for (const id of Object.keys(this.accessCpnService.getErrorData())) {
        errorIds.push(id);
      }
      console.log('SET ERRORS, errorIds = ', errorIds);
      this.eventBus.fire('model.update.cpn.status', { data: { error: errorIds } });
    }
  }

  subscripeToAppMessage() {

    this.eventService.on(Message.SUBPAGE_CREATE, (data) => {
      if (data.parentid === this.pageId) {
        const bounds = this.canvas.viewbox();
        const x = bounds.x + bounds.width / 2;
        const y = bounds.y + bounds.height / 2;

        const position = { x: x, y: y };
        let cpnElement = this.modeling.createElementInModel(position, CPN_TRANSITION);
        cpnElement = this.modeling.declareSubPage(cpnElement, data.name, data.id);
        const element = this.cpnFactory.createShape(undefined, cpnElement, CPN_TRANSITION, position, true);
        this.modelService.addElementJsonOnPage(cpnElement, this.pageId, CPN_TRANSITION);
      }
    });

    // Subscribe on property update event
    this.eventService.on(Message.PROPERTY_UPDATE, (data) => {

      console.log('PROPERTY_UPDATE, data = ', data);

      const element = this.modeling.getElementByCpnElement(data.cpnElement);
      console.log('PROPERTY_UPDATE, element = ', element);

      this.modeling.updateElement(element, true);
      // this.selectedElement = element;

      this.modelUpdate();
      // this.openPropPanel(element);
    });
  }

  openPropPanel(element) {
    if (element) {
      if (element.type === CPN_LABEL) {
        element = element.labelTarget || element;
      }
      if (element.labels) {
        const labels = [];
        for (const lab of element.labels) {
          labels[lab.labelType] = lab.cpnElement;
        }

        this.eventService.send(Message.SHAPE_SELECT,
          { element: element, labels: labels, cpnElement: element.cpnElement, type: element.type });
      }
    }
  }

  modelUpdate() {
    const page = this.jsonPageObject;

    // set status 'process' for all shapes on diagram
    // this.eventBus.fire('model.update.cpn.status', { data: { process: '*' } });

    this.eventService.send(Message.MODEL_UPDATE, { pageObject: page });
  }

  changeSubPageName(subpage) {
    this.eventService.send(Message.CHANGE_NAME_PAGE, { id: subpage.subpageid, name: subpage.name, changedElement: 'tran' });
  }

  /**
   * open elemen property panel after klick on it
   * @param event
   */
  fireSelectionEvent(event) {
    this.curentElement = event.element;
    //  console.log('fireSelectionEvent(), event = ', event);
    if (event.element) {
      this.openPropPanel(event.element);
    }
  }

  log(text) {
    console.log('ModelEditorComponent. log(), text = ' + text);
  }

  load(pageObject, subPages) {
    this.loading = true;

    this.subpages = subPages;
    this.jsonPageObject = pageObject;
    this.pageId = pageObject._id;
    const that = this;
    if (pageObject) {
      // this.diagram.createDiagram(function () {
      setTimeout(() => {
        that.loadPageDiagram(pageObject);
      },
        100);
      // });
    } else {
      this.canvas._clear();
    }
  }

  clearPage() {
  }

  loadPageDiagram(pageObject) {
    // console.log('loadPageDiagram(), import, pageObject = ', pageObject);

    this.clearPage();

    importCpnPage(this.diagram, pageObject);
  }

  makeid(length) {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
  }

}
