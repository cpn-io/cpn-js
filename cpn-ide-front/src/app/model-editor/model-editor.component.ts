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
  getNextId,
} from '../../lib/cpn-js/features/modeling/CpnElementFactory';

import {
  CPN_LABEL,
  CPN_TRANSITION,
  CPN_CONNECTION,
  is,
  isCpn,
} from '../../lib/cpn-js/util/ModelUtil';

import { AccessCpnService } from '../services/access-cpn.service';
import { isComponent } from '@angular/core/src/render3/util';


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
  @ViewChild('popup') popupElementRef: ElementRef;

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
  stateProvider;

  // subscription: Subscription;
  subpages = [];
  placeShapes = [];
  transShapes = [];
  arcShapes = [];
  curentElement;
  pageId;
  transCount = 0;

  loading = false;

  ngOnInit() {

    const self = this;

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
    this.stateProvider = this.diagram.get('stateProvider');

    const eventBus = this.eventBus;

    // set defualt values to diagram
    // -----------------------------------------------------
    for (const key of ['type', 'initmark', 'cond', 'time', 'code', 'priority', 'annot', 'ellipse', 'box']) {
      this.modeling.setDefaultValue(key, this.settings.getAppSettings()[key]);
    }

    eventBus.on('import.render.complete', (event) => {
      this.loading = false;
      // console.log('import.render.complete, event = ', event);

      this.updateElementStatus();
    });

    eventBus.on('element.changed', (event) => {
      // console.log(self.constructor.name, 'element.changed, event = ', event);

      if (!this.loading) {
        this.eventService.send(Message.MODEL_CHANGED);

        eventBus.fire('model.check.ports');
      }
    });

    this.eventService.on(Message.MODEL_RELOAD, () => {
      this.log('Reload page diagram...');
      this.reloadPage();
    });

    this.eventService.on(Message.SERVER_INIT_NET_START, () => {
      this.log('Validation process...');
    });

    // VALIDATION RESULT
    this.eventService.on(Message.SERVER_INIT_NET_DONE, (event) => {
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

    this.eventService.on(Message.DELETE_PAGE, (data) => {
      if (data.parent === this.pageId) {
        this.modeling.deleteSubPageTrans(data.id);
      }
    });

    this.eventService.on(Message.CHANGE_NAME_PAGE, (data) => {
      if (this.pageId === data.parent)
        this.modeling.changeTransitionSubPageLabel(data.id, data.name);
    })

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

    eventBus.on('directEditing.cancel', function (e) {
      // console.log('model-editor directEditing.cancel - event', e);

      self.openPropPanel(e.active.element);
      self.selectedElement = undefined;
    });

    eventBus.on('directEditing.complete', function (e) {
      // console.log('model-editor directEditing.complete - event', e);

      if (e.active && e.active.element) {
        self.openPropPanel(e.active.element);
      }
    });

    eventBus.on('element.click', (event) => {
      this.fireSelectionEvent(event);
    });

    eventBus.on('shape.create.end', (event) => {
      // console.log('shape.create.end, event = ', event);

      if (event.elements) {
        for (const element of event.elements) {
          if (element.cpnElement) {
            this.modelService.addElementJsonOnPage(element.cpnElement, this.pageId, element.type, this.modeling);

            // Check if transition is subpage and create subpage
            if (element.type === CPN_TRANSITION && element.cpnElement.subst) {
              if (!element.cpnElement.subst._subpage) {
                element.cpnElement.subst._subpage = getNextId();
              }

              this.eventService.send(Message.SUBPAGE_TRANS_CREATE, {
                currentPageId: this.pageId,
                subPageName: element.cpnElement.subst.subpageinfo._name,
                subPageId: element.cpnElement.subst._subpage,
                cpnElement: element.cpnElement,
              });
            }
          }
        }
      }
    });

    eventBus.on('extract.subpage', (event) => {
      const transCpnElement = event.transCpnElement;
      const places = event.places;
      const transitions = event.transitions;

      self.modelService.addElementJsonOnPage(transCpnElement, self.pageId, CPN_TRANSITION, this.modeling);

      console.log(self.constructor.name, 'extract.subpage, places, transitions = ', places, transitions);

      let selectedElements = [];
      selectedElements = selectedElements.concat(places).concat(transitions);
      if (selectedElements.length < 1) {
        return;
      }

      console.log(self.constructor.name, 'extract.subpage, selectedElements = ', selectedElements);

      self.eventService.send(Message.SUBPAGE_TRANS_CREATE,
        {
          currentPageId: self.pageId,
          subPageName: transCpnElement.subst.subpageinfo._name,
          subPageId: transCpnElement.subst._subpage,
          cpnElement: transCpnElement
        },
        true // wait event handlers finish
      );

      const subPageId = transCpnElement.subst._subpage;
      const subpage = self.modelService.getPageById(subPageId);
      if (!subpage) {
        return;
      }

      console.log(self.constructor.name, 'extract.subpage, subpage = ', subpage);

      // console.log(self.constructor.name, 'extract.subpage, getAllArcs() = ', self.modelService.getAllArcs());

      const arcs = self.modelService.getArcsForElements(selectedElements);

      console.log(self.constructor.name, 'extract.subpage, arcs = ', arcs);

      selectedElements = selectedElements.concat(arcs);

      self.modelService.moveElements(self.pageId, subPageId, selectedElements);

      self.reloadPage();
    });


    eventBus.on('shape.delete', (event) => {
      if (event.elements) {
        for (const elem of event.elements) {
          self.modelService.deleteElementFromPageJson(self.pageId, elem.id, elem.type);
        }
      }
    });

    eventBus.on('portMenuProvider.open', (event) => {
      if (event.trans && event.trans.cpnElement && event.trans.cpnElement.subst) {
        const pageObj = self.modelService.getPageById(event.trans.cpnElement.subst._subpage);
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
          self.portMenuProvider.open({ trans: event.trans, place: event.place, arc: event.arc, list: list }, event.position, self.modeling);
        }
      }
    });


    eventBus.on('element.hover', (event) => {
      const element = event.element;

      // console.log(self.constructor.name, 'element.hover, event = ', event);

      if (event.originalEvent) {
        const position = { x: event.originalEvent.offsetX, y: event.originalEvent.offsetY };

        let errorText, warningText, readyText;
        if (isCpn(element)) {
          errorText = this.stateProvider.getErrorText(element.cpnElement._id);
          warningText = this.stateProvider.getWarningText(element.cpnElement._id);
          readyText = this.stateProvider.getReadyText(element.cpnElement._id);
        }
        let popupVisible = false;
        popupVisible = popupVisible || this.showPopup(position, element, errorText, 'errorPopup');
        popupVisible = popupVisible || this.showPopup(position, element, warningText, 'warningPopup');
        popupVisible = popupVisible || this.showPopup(position, element, readyText, 'readyPopup');
        if (!popupVisible) {
          this.hidePopup();
        }
      }
    });


    // this._eventBus.fire('bind.port.cancel', {connection: this._createdArc});
  }

  showPopup(position, element, popupText, popupClass) {
    const popup: HTMLElement = this.popupElementRef.nativeElement; // document.getElementById('popup');
    if (popupText) {
      popup.style.left = (position.x) + 'px';
      popup.style.top = (position.y + 20) + 'px';
      popup.style.display = 'block';
      popup.className = 'popup ' + popupClass;
      popup.innerText = popupText;
      return true;
    }
    return false;
  }

  hidePopup() {
    const popup: HTMLElement = this.popupElementRef.nativeElement; // document.getElementById('popup');
    popup.style.display = 'none';
    popup.innerText = '';
  }

  reloadPage() {
    if (this.pageId) {
      const pageObject = this.modelService.getPageById(this.pageId);
      if (pageObject) {
        this.jsonPageObject = pageObject;
        this.loadPageDiagram(pageObject, false);
      }
    }
  }

  /**
   * Update element status
   */
  updateElementStatus() {
    this.stateProvider.clear();

    // console.log('updateElementStatus(), tokenData = ', this.accessCpnService.getTokenData());
    // console.log('updateElementStatus(), readyData = ', this.accessCpnService.getReadyData());
    // console.log('updateElementStatus(), errorData = ', this.accessCpnService.getErrorData());

    if (Object.keys(this.accessCpnService.getTokenData()).length > 0) {
      this.eventBus.fire('model.update.tokens', { data: this.accessCpnService.getTokenData() });
    }

    if (Object.keys(this.accessCpnService.getReadyData()).length > 0) {
      this.stateProvider.setReadyState(this.accessCpnService.getReadyData());
    }

    if (Object.keys(this.accessCpnService.getErrorData()).length > 0) {
      this.stateProvider.setErrorState(this.accessCpnService.getErrorData());
    }

    this.modeling.repaintElements();
  }

  subscripeToAppMessage() {

    this.eventService.on(Message.SUBPAGE_CREATE, (data) => {
      if (data.parentid === this.pageId) {
        const bounds = this.canvas.viewbox();
        const x = bounds.x + bounds.width / 2;
        const y = bounds.y + bounds.height / 2;

        const position = { x: x, y: y };
        let cpnElement = this.modeling.createShapeCpnElement(position, CPN_TRANSITION);
        cpnElement = this.modeling.declareSubPage(cpnElement, data.name, data.id);
        const element = this.cpnFactory.createShape(undefined, cpnElement, CPN_TRANSITION, position, true);
        this.modelService.addElementJsonOnPage(cpnElement, this.pageId, CPN_TRANSITION, this.modeling);
      }
    });

    this.eventService.on(Message.SUBPAGE_UPDATE_TRANSITION, (event) => {

      const element = this.modeling.getElementByCpnElement(event.cpnElement);

      if (event.subpageName && event.cpnElement.subst && event.cpnElement.subst.subpageinfo) {
        event.cpnElement.subst.subpageinfo._name = event.subpageName;
      }

      this.modeling.updateElement(element, true);
      this.modelUpdate();
    });

    this.eventService.on(Message.MODEL_UPDATE_DIAGRAM, (event) => {
      console.log(this.constructor.name, 'MODEL_UPDATE_DIAGRAM, event = ', event);

      if (event.cpnElement) {
        const element = this.modeling.getElementByCpnElement(event.cpnElement);

        this.modeling.updateElement(element, true);
        this.modelUpdate();
      }
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
    this.eventService.send(Message.MODEL_UPDATE, { pageObject: this.jsonPageObject });
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

  log(obj) {
    console.log(this.constructor.name, 'log(), text = ' + JSON.stringify(obj));
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

  loadPageDiagram(pageObject, alignToCenter = true) {
    // console.log('loadPageDiagram(), import, pageObject = ', pageObject);

    this.clearPage();

    importCpnPage(this.diagram, pageObject, alignToCenter);
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
