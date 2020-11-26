import { Component, ElementRef, Input, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';

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
  CPN_PLACE,
  CPN_TRANSITION,
  CPN_CONNECTION,
  is,
  isCpn,
} from '../../lib/cpn-js/util/ModelUtil';

import { AccessCpnService } from '../services/access-cpn.service';
import { MonitorType, getMonitorTypeList, getMonitorTypeId } from '../common/monitors';
import { addNode, nodeToArray } from '../common/utils';
import { SimulationService } from '../services/simulation.service';
import { TEST_TOKEN_DATA } from '../test/test-data';
import { EditorPanelService } from '../services/editor-panel.service';
import { IpcService } from '../services/ipc.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-model-editor',
  templateUrl: './model-editor.component.html',
  styleUrls: ['./model-editor.component.scss']
})
export class ModelEditorComponent implements OnInit, OnDestroy, AfterViewInit {

  constructor(private eventService: EventService,
    private settings: SettingsService,
    private modelService: ModelService,
    public accessCpnService: AccessCpnService,
    public simulationService: SimulationService,
    public editorPanelService: EditorPanelService) {
  }

  @ViewChild('container') containerElementRef: ElementRef;
  @ViewChild('popup') popupElementRef: ElementRef;

  @Input() id: string;

  monitorType = MonitorType;

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
  stateProvider;
  selectionProvider;
  cpnUpdater;
  lassoTool;

  // subscription: Subscription;
  placeShapes = [];
  transShapes = [];
  arcShapes = [];
  curentElement;
  pageId;
  transCount = 0;

  loading = false;
  mouseMoveWhileConnStartListener;
  selectedElements = [];
  availableMonitorList = [];
  selectedElementsForMonitors = [];

  instanseId;

  subs: Subscription;

  ngOnDestroy() {
    console.log(this.constructor.name, 'ngOnDestroy(), this.instanseId = ', this.instanseId);

    this.diagram.clear();
    this.diagram.destroy();

    this.editorPanelService.removeModelEditor(this);
    this.subs.unsubscribe();
  }

  ngOnInit() {
    this.eventService.on(Message.SETTING_CHANGED, ({ key, value }) => {
      this.modeling.setDefaultValue(key, value);
    });
    this.subs = this.eventService.on(Message.SHAPE_HIGHLIGHT, (id) => this.selectNodeById(id));
  }


  ngAfterViewInit() {
    console.log(this.constructor.name, 'ngAfterViewInit(), this = ', this);

    this.init();
    setTimeout(function () {
      const containerParent = document.getElementsByClassName('djs-container');
      const elements = document.querySelectorAll('[data-element-id="__implicitroot"]');
      const parentHeight = containerParent[0].clientHeight;
      elements[0]['style'].height = parentHeight + 'px';
      console.log('testQQQ');
    }, 1000);

  }

  onClose() {
    this.eventService.send(Message.PAGE_TAB_CLOSE, { id: this.pageId });
  }

  init() {
    this.editorPanelService.addModelEditor(this);

    this.instanseId = Math.random().toString(36).substring(2).toUpperCase() + '-' + Date.now().toString(36).toUpperCase();

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
    this.stateProvider = this.diagram.get('stateProvider');
    this.selectionProvider = this.diagram.get('selectionProvider');
    this.cpnUpdater = this.diagram.get('cpnUpdater');
    this.lassoTool = this.diagram.get('lassoTool');

    const eventBus = this.eventBus;

    console.log(this.constructor.name, 'ngOnInit(), this.instanseId = ', this.instanseId);
    console.log(this.constructor.name, 'ngOnInit(), this.modeling.getInstanseId() = ', this.modeling.getInstanseId());

    // set defualt values to diagram
    // -----------------------------------------------------
    for (const key of ['type', 'initmark', 'cond', 'time', 'code', 'priority', 'annot', 'ellipse', 'box']) {
      this.modeling.setDefaultValue(key, this.settings.appSettings[key]);
    }

    // eventBus.on('element.changed', (event) => {
    // eventBus.on([
    //   'shape.move.end',
    //   'create.end',
    //   'connect.end',
    //   'resize.end',
    //   'bendpoint.move.end',
    //   'connectionSegment.move.end',
    //   'directEditing.complete',
    //   'shape.delete'
    // ],
    //   (event) => {
    //     console.log(self.constructor.name, 'MODEL_CHANGED event = ', event);

    //     // this.eventService.send(Message.MODEL_CHANGED);
    //   });

    eventBus.on('directEditing.complete', (event) => {
      if (event && event.active && event.active.element) {
        const element = event.active.element;
        console.log('DIRECTEDITING.COMPLETE, element = ', element);

        if (element.labelType === "initmark") {
          const placeElement = element.labelTarget;
          if (this.modelService.fixPlaceInitmark(placeElement.cpnElement)) {
            this.modeling.updateElement(placeElement, true);
          }
        }

        if (element.labelType === "annot") {
          // console.log('DIRECTEDITING.COMPLETE, ANNOTATION, text = ', element.text);
          // console.log('DIRECTEDITING.COMPLETE, INITMARK, labelTarget = ', element.labelTarget);

          const connectionElement = element.labelTarget;
          if (this.modelService.fixArcAnnot(connectionElement.cpnElement)) {
            this.modeling.updateElement(connectionElement, true);
          }

        }
      }
    });


    eventBus.on('connect.start', (event ) => {
      console.log('model editor: connect.start', event);
      this.onOutOfViewboxBounds();
    });

    eventBus.on(['connect.end', 'connect.cleanup'], (event ) => {
      console.log('model editor: connect.start', event);
      this.canvas._container.removeEventListener('mousemove', this.mouseMoveWhileConnStartListener, false);
    });

    eventBus.on('element.copy', (event) => {
      const selectedElements =  this.selectionProvider.getSelectedElements();
        if (selectedElements && selectedElements.length > 1) {
          this.onCopyShapes();
        }
    });


    this.eventService.on(Message.MODEL_RELOAD, () => {
      this.log('Reload page diagram...');
      this.reloadPage();
    });

    this.eventService.on(Message.SERVER_INIT_NET_START, () => {
      this.log('Validation process...');
    });

    // VALIDATION STATUS
    this.eventService.on(Message.SERVER_INIT_NET_DONE, () => {
      this.updateElementStatus();
    });

    // VALIDATION STATUS
    this.eventService.on(Message.SERVER_INIT_SIM_DONE, () => {
      this.onClearSelection();
    });


    // BINDINGS
    this.eventService.on(Message.SERVER_GET_BINDINGS, (event) => eventBus.fire('bindingsMenu.open', { data: event.data }));

    // SIM STATUS
    this.eventService.on(Message.SIMULATION_STARTED, () => {
      this.updateElementStatus();
      this.modeling.setEditable(!this.accessCpnService.isSimulation);
    });
    this.eventService.on(Message.SIMULATION_STOPED, () => {
      this.updateElementStatus();
      this.modeling.setEditable(!this.accessCpnService.isSimulation);
    });

    this.eventService.on(Message.PAGE_TAB_CLOSE, (data) => {
      if (data.id === this.pageId) {
        this.diagram.clear();
      }
    });

    this.eventService.on(Message.PAGE_CHANGE_NAME, (data) => {
      if (this.pageId === data.parent) {
        this.modeling.changeTransitionSubPageLabel(data.id, data.name);
      }
    });

    this.eventService.on(Message.MONITOR_SET_AVAILABLE_NODES, (event) => this.updateAlailableStatus(event.availableNodeIds));

    // ----------------------------------------------------------------------------------
    // Diagram events

    eventBus.on('element.hover', (event) => {
      if (event.element.type === 'cpn:Transition' || event.element.type === 'cpn:Place') {
        this.eventService.send(Message.SHAPE_HOVER, { element: event.element });
      }
      // console.log('element.hover', event.element);
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
      if (event.element) {
        this.updateAvailableMonitorList([event.element, ...this.selectedElements]);
      }
    });

    eventBus.on('shape.create.end', (event) => {
      // console.log('shape.create.end, event = ', event);

      if (event.elements) {
        // let allPagesId = this.modelService.getAllPages().map(p => {return p._id});
        for (const element of event.elements) {
          if (element.cpnElement) { // if (element.cpnElement && allPagesId.includes(this.pageId)) {
            this.modelService.addElementJsonOnPage(element.cpnElement, this.pageId, element.type, this.modeling);

            // Check if transition is subpage and create subpage
            if (element.type === CPN_TRANSITION && element.cpnElement.subst) {
              if (!element.cpnElement.subst._subpage) {
                element.cpnElement.subst._subpage = getNextId();
              }

              this.eventService.send(Message.PAGE_CREATE_SUBST, {
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

      self.eventService.send(Message.PAGE_CREATE_SUBST,
        {
          currentPageId: self.pageId,
          subPageName: transCpnElement.subst.subpageinfo._name,
          subPageId: transCpnElement.subst._subpage,
          cpnElement: transCpnElement
        }
      );

      const subPageId = transCpnElement.subst._subpage;
      const subpage = self.modelService.getPageById(subPageId);
      if (!subpage) {
        return;
      }

      console.log(self.constructor.name, 'extract.subpage, subpage = ', subpage);

      // console.log(self.constructor.name, 'extract.subpage, getAllArcs() = ', self.modelService.getAllArcs());

      const arcs = self.modelService.getArcsForElements(selectedElements);
      const arcsToDelete = self.modelService.getExternalArcsForElements(selectedElements);

      console.log(self.constructor.name, 'extract.subpage, arcs = ', arcs);
      console.log(self.constructor.name, 'extract.subpage, arcsToDelete = ', arcsToDelete);

      selectedElements = selectedElements.concat(arcs);

      self.modelService.moveElements(self.pageId, subPageId, selectedElements);

      // delete not used arcs
      if (arcsToDelete) {
        for (const a of arcsToDelete) {
          self.modelService.deleteFromModel(a);
        }
      }

      self.reloadPage();
    });


    eventBus.on('shape.delete', (event) => {
      if (event.elements) {

        let reloadTree = false;

        for (const elem of event.elements) {
          if (elem.cpnElement) {
            // console.log(self.constructor.name, 'shape.delete, elem.cpnElement = ', elem.cpnElement);
            if (elem.cpnElement.subst) {
              reloadTree = true;
            }
            self.modelService.deleteFromModel(elem.cpnElement);
          }
        }

        self.reloadPage();

        if (reloadTree) {
          this.eventService.send(Message.TREE_UPDATE_PAGES, {
            currentPageId: self.pageId
          });
        }
      }
    });
    eventBus.on('aux.run', script => this.eventService.send(Message.SHAPE_RUN_SCRIPT, script))

    // eventBus.on('element.hover', (event) => {
    //   const element = event.element;
    //   // console.log(self.constructor.name, 'element.hover, event = ', event);

    //   if (event.originalEvent) {
    //     const position = { x: event.originalEvent.clientX, y: event.originalEvent.clientY };

    //     let errorText, warningText, readyText;
    //     if (isCpn(element)) {
    //       errorText = this.stateProvider.getErrorText(element.cpnElement._id);
    //       warningText = this.stateProvider.getWarningText(element.cpnElement._id);
    //       readyText = this.stateProvider.getReadyText(element.cpnElement._id);
    //     }
    //     let popupVisible = false;
    //     popupVisible = popupVisible || this.showPopup(position, element, errorText, 'errorPopup');
    //     popupVisible = popupVisible || this.showPopup(position, element, warningText, 'warningPopup');
    //     popupVisible = popupVisible || this.showPopup(position, element, readyText, 'readyPopup');
    //     if (!popupVisible) {
    //       this.hidePopup();
    //     }
    //   }
    // });


    eventBus.on('bindingsMenu.select', (event) => {
      self.eventService.send(Message.SIMULATION_SELECT_BINDING, event);
    });

    // this._eventBus.fire('bind.port.cancel', {connection: this._createdArc});

    eventBus.on('element.selection.changed', function () {
      const selectedElements = self.selectionProvider.getSelectedElements();
      console.log('model-editor element.selection.changed, selectedElements = ', selectedElements);

      self.updateAvailableMonitorList(selectedElements);

      self.selectedElements = selectedElements;
      self.modelService.selectedElements = selectedElements;
      // self.eventService.send(Message.SHAPE_SELECT, { element: selectedElements });

    });

    this.eventService.on('editing.cancel', () => eventBus.fire('editing.cancel'));


  }

  updateAvailableMonitorList(selectedElements) {

    this.selectedElementsForMonitors = selectedElements;

    this.availableMonitorList = [];

    let type;

    if (selectedElements.length > 0) {
      if (selectedElements.length > 1) {
        type = 'group';
      } else if (is(selectedElements[0], CPN_PLACE)) {
        type = 'place';
      } else if (is(selectedElements[0], CPN_TRANSITION)) {
        type = 'transition';
      }
    }

    if (type) {
      const monitorTypes = getMonitorTypeList(type);
      this.availableMonitorList = monitorTypes;
    }
    console.log('model-editor updateAvailableMonitorList(), this.availableMonitorList = ', this.availableMonitorList);
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
        this.loadPage(pageObject, false);
      }
    }
  }

  checkPorts() {
    this.eventBus.fire('model.check.ports');
  }


  testAnimation() {
    return new Promise((resolve, reject) => {

      const speedMs = 500;
      const incomeArcIdList = [];
      const outcomeArcIdList = [];
      const transIdList = [];

      const page = this.modelService.getPageById(this.pageId);

      // arcIdList.push('ID2751839452', 'ID1243034573', 'sdfsdfsdfsdf', 'ID1243036954', 'ID1243040118');

      for (const trans of nodeToArray(page.trans)) {
        transIdList.push(trans._id);
      }

      for (const transId of transIdList) {
        for (const arc of this.modelService.getTransitionIncomeArcs(transId)) {
          incomeArcIdList.push(arc._id);
        }
        for (const arc of this.modelService.getTransitionOutcomeArcs(transId)) {
          outcomeArcIdList.push(arc._id);
        }
      }

      console.log(this.constructor.name, 'testAnimation(), incomeArcIdList = ', incomeArcIdList);
      console.log(this.constructor.name, 'testAnimation(), outcomeArcIdList = ', outcomeArcIdList);

      this.stateProvider.clear();
      this.stateProvider.setFiredState(transIdList);
      this.modeling.repaintElements();

      this.cpnUpdater.animateArcList(incomeArcIdList, speedMs, true).then(() => {
        console.log(this.constructor.name, 'testAnimation(), Promise complete!, incomeArcIdList = ', incomeArcIdList);

        this.cpnUpdater.animateArcList(outcomeArcIdList, speedMs, false).then(() => {
          console.log(this.constructor.name, 'testAnimation(), Promise complete!, outcomeArcIdList = ', outcomeArcIdList);

          this.stateProvider.clear();

          const tokenData = TEST_TOKEN_DATA; // this.accessCpnService.getTokenData();
          // localStorage.setItem('tokenData', JSON.stringify(tokenData));

          this.eventBus.fire('model.update.tokens', { data: tokenData });
          this.stateProvider.setReadyState(this.accessCpnService.getReadyData());
          this.stateProvider.setErrorState(this.accessCpnService.getErrorData());
          this.checkPorts();
          this.modeling.repaintElements();

          resolve();
        });
      });
    });
  }


  /**
   * Update element status
   */
  updateElementStatus(animate: boolean = false) {
    return new Promise((resolve, reject) => {

      const startTime = new Date().getTime();

      if (animate) {
        this.stateProvider.setFiredState(this.accessCpnService.getFiredData());
        this.modeling.repaintElements();
      }

      console.log('TOKEN ANIMATION, updateElementStatus(), repaintElements() (1), timeMs = ', new Date().getTime() - startTime);

      const firedData = this.accessCpnService.getFiredData();
      const animatedTransIds = [];

      if (animate) {
        // check, if current page has animated transition
        if (firedData && firedData.length > 0) {
          for (const transId of firedData) {
            const page = this.modelService.getPageByElementId(transId);

            if (page && page._id === this.pageId) {
              animatedTransIds.push(transId);
            }
          }
        }
      }

      // if current page has animated transitions
      if (animatedTransIds.length > 0) {

        const incomeArcIdList = [];
        const outcomeArcIdList = [];
        for (const transId of animatedTransIds) {
          for (const arc of this.modelService.getTransitionIncomeArcs(transId)) {
            incomeArcIdList.push(arc._id);
          }
          for (const arc of this.modelService.getTransitionOutcomeArcs(transId)) {
            outcomeArcIdList.push(arc._id);
          }
        }
        const speedMs = this.simulationService.getAnimationDelay() / 2;

        console.log('TOKEN ANIMATION, updateElementStatus(), START ANIMATION, timeMs = ', new Date().getTime() - startTime);

        this.cpnUpdater.animateArcList(incomeArcIdList, speedMs, true).then(() => {
          console.log('TOKEN ANIMATION, updateElementStatus(), Promise complete!, incomeArcIdList = ', incomeArcIdList);
          console.log('TOKEN ANIMATION, updateElementStatus(), INCOME ANIMATION COMPLETE, timeMs = ', new Date().getTime() - startTime);

          this.cpnUpdater.animateArcList(outcomeArcIdList, speedMs, false).then(() => {
            console.log('TOKEN ANIMATION, updateElementStatus(), Promise complete!, outcomeArcIdList = ', outcomeArcIdList);
            console.log('TOKEN ANIMATION, updateElementStatus(), OUTCOME ANIMATION COMPLETE, timeMs = ', new Date().getTime() - startTime);

            this.stateProvider.clear();
            this.eventBus.fire('model.update.tokens', { data: this.accessCpnService.getTokenData() });
            this.stateProvider.setReadyState(this.accessCpnService.getReadyData());
            this.stateProvider.setErrorState(this.accessCpnService.getErrorData());
            this.checkPorts();
            this.modeling.repaintElements();

            console.log('TOKEN ANIMATION, updateElementStatus() (1), COMPLETE, timeMs = ', new Date().getTime() - startTime);

            resolve();
          });
        });

      } else {

        setTimeout(() => {
          this.stateProvider.clear();
          this.eventBus.fire('model.update.tokens', { data: this.accessCpnService.getTokenData() });
          this.stateProvider.setReadyState(this.accessCpnService.getReadyData());
          this.stateProvider.setWarningState(this.accessCpnService.getWarningData());
          this.stateProvider.setErrorState(this.accessCpnService.getErrorData());
          this.checkPorts();
          this.modeling.repaintElements();

          console.log('TOKEN ANIMATION, updateElementStatus() (2), COMPLETE, timeMs = ', new Date().getTime() - startTime);

          resolve();
        }, animate ? 100 : 0);
      }

      console.log('updateElementStatus(), COMPLETE');
    });
  }

  updateAlailableStatus(availableIds) {
    console.log('updateAlailableStatus(), availableIds = ', availableIds);

    this.stateProvider.setReadyState(availableIds);

    this.modeling.repaintElements();
  }

  subscripeToAppMessage() {
    this.eventService.on(Message.PAGE_UPDATE_SUBST, (event) => {

      const element = this.modeling.getElementByCpnElement(event.cpnElement);

      if (event.subpageName && event.cpnElement.subst && event.cpnElement.subst.subpageinfo) {
        event.cpnElement.subst.subpageinfo._name = event.subpageName;
      }

      this.modeling.updateElement(element, true);
    });

    this.eventService.on(Message.MODEL_UPDATE_DIAGRAM, (event) => {
      console.log(this.constructor.name, 'MODEL_UPDATE_DIAGRAM, event = ', event);

      if (event.cpnElement) {
        const e = this.modeling.getElementByCpnElement(event.cpnElement);

        this.modeling.updateElement(e, true);
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

        // this.eventService.send(Message.SHAPE_SELECT,
        //   { element: element, labels: labels, cpnElement: element.cpnElement, type: element.type });
      }
    }
  }

  changeSubPageName(subpage) {
    this.eventService.send(Message.PAGE_CHANGE_NAME, { id: subpage.subpageid, name: subpage.name, changedElement: 'tran' });
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

    this.eventService.send(Message.SHAPE_SELECT, { element: event.element });
  }

  log(obj) {
    console.log(this.constructor.name, 'log(), text = ' + JSON.stringify(obj));
  }

  /**
   * Load page to ModelEditorComponent
   *
   * @param pageObject
   * @param alignToCenter
   */
  loadPage(pageObject, alignToCenter = true) {
    return new Promise((resolve, reject) => {
      this.loading = true;

      this.pageId = undefined;
      this.clearPage();

      if (pageObject) {
        this.pageId = pageObject._id;

        setTimeout(() => {
          importCpnPage(this.diagram, pageObject, alignToCenter).then(
            (success) => {
              this.loading = false;
              console.log(this.constructor.name, 'loadPage(), RENDER COMPLETE');

              // this.updateElementStatus();
              this.modeling.setEditable(!this.accessCpnService.isSimulation);

              resolve();
            },
            (error) => {

              console.log(this.constructor.name, 'loadPage(), ERROR = ', error);
              reject();
            }
          );
        }, 0);

      } else {
        this.clearPage();
        resolve();
      }
    });
  }

  clearPage() {
    if (this.canvas) {
      this.canvas._clear();
    }
  }

  makeid(length) {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
  }

  onSelectShapes() {
    this.lassoTool.activateSelection();
  }

  onClearSelection() {
    this.selectionProvider.deselectAll();
    this.selectedElements = this.selectionProvider.getSelectedElements();
    this.updateAvailableMonitorList(this.selectedElements);
  }

  onCopy() {
  }
  onPaste() {
  }

  onCreateSubst() {
    this.cpnFactory.extractSubpage();
    this.selectionProvider.deselectAll();
    this.selectedElements = this.selectionProvider.getSelectedElements();
    this.updateAvailableMonitorList(this.selectedElements);
  }

  onDeleteShapes() {
    this.modeling.removeSelectedElements();
    this.selectionProvider.deselectAll();
    this.selectedElements = this.selectionProvider.getSelectedElements();
    this.updateAvailableMonitorList(this.selectedElements);
  }
  onCopyShapes() {
    this.selectedElements = this.selectionProvider.getSelectedElements();
    const arcsForCopy =  [];
    this.selectedElements.forEach((element) => {
      // let originalElement = this._modeling.getElementById(element.cpnElement._id)
      const elementArcs = this.modeling.getShapeArcs(element);
      elementArcs.forEach((arc) => {
        if (!arcsForCopy.some(value => value.id === arc.id)) {
          arcsForCopy.push({
            id: arc.id,
            cpnPlaceId: arc.cpnPlace._id,
            cpnTransitionId: arc.cpnTransition._id,
            orient: arc.cpnElement._orientation,
            label: arc.labels[0]
          });
        }
      });
    });
    localStorage.setItem('arcsForCopy',  JSON.stringify(arcsForCopy));
    localStorage.setItem('clipboardElement',  JSON.stringify(this.selectedElements));
    this.selectionProvider.deselectAll();

  }

  onCreateNewMonitor(monitorType: string) {
    let selectedElements = this.selectionProvider.getSelectedElements();

    if (selectedElements.length < 1) {
      selectedElements = this.selectedElementsForMonitors;
    }

    console.log('model-editor onCreateNewMonitor(), monitorType, selectedElements = ', monitorType, selectedElements);

    if (selectedElements.length < 1) {
      return;
    }

    const nodes = [];
    const cpnElementList = [];
    for (const e of selectedElements) {
      if (e.cpnElement) {
        cpnElementList.push(e.cpnElement);
        nodes.push(e.cpnElement._id);
      }
    }


    const options = {
      nodes: nodes,
      type: getMonitorTypeId(monitorType)
    };
    this.accessCpnService.getMonitorDefaults(options).then((result) => {

      // console.log(this.constructor.name, 'onCreateNewMonitor(), getMonitorDefaults(), result = ', result);

      const monitorDefaults = result;

      const monitorsCpnParentElement = this.modelService.getMonitorsRoot();
      const newMonitorCpnElement = this.modelService.createCpnMonitor(monitorType, cpnElementList, monitorDefaults);
      if (newMonitorCpnElement) {
        addNode(monitorsCpnParentElement, 'monitor', newMonitorCpnElement);
        this.eventService.send(Message.MONITOR_CREATED, { newMonitorCpnElement: newMonitorCpnElement });
      }
      console.log('model-editor onCreateNewMonitor(), monitorsCpnParentElement = ', monitorsCpnParentElement);
    });
  }

  selectNodeById(id: string) {
    const element = this.modeling.getElementById(id);
    if (element) {
      this.eventService.send(Message.SHAPE_SELECT, { element });
      this.eventBus.fire('element.click', { element: element });
      this.eventBus.fire('editing.cancel');
    }
  }



  onOutOfViewboxBounds() {
    console.log('onOutOfViewboxBounds');
    const self  = this;

    const canvas = this.canvas;
    this.mouseMoveWhileConnStartListener = function(evt) {
      const vb = self.canvas.viewbox();
      console.log('onOutOfViewboxBounds', evt.offsetY);
      if (evt.offsetY < 40) {
        vb.y =  vb.y - 20;
        canvas.viewbox(vb);
      }
      if (evt.offsetY > self.canvas._container.getBoundingClientRect().height - 20) {
        vb.y =  vb.y + 40;
        canvas.viewbox(vb);
      }
      if (evt.offsetX < 40) {
        vb.x =  vb.x - 20;
        canvas.viewbox(vb);
      }
      if (evt.offsetX > self.canvas._container.getBoundingClientRect().width - 40) {
        vb.x =  vb.x + 20;
        canvas.viewbox(vb);
      }
      // console.log('change mouse pos', evt);
      //  console.log('offsetX', evt.offsetX);
      //  console.log('offsetY', evt.offsetY);
      //  console.log('VB w,h ' + self.canvas._container.getBoundingClientRect().height + ' ' + self.canvas._container.getBoundingClientRect().width);
    };

    this.canvas._container.addEventListener('mousemove', this.mouseMoveWhileConnStartListener, false);
  }

}
