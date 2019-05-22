import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Constants } from '../common/constants';
import TextRenderer from '../../lib/cpn-js/draw/TextRenderer';

import { Message } from '../common/message';
import { EventService } from '../services/event.service';
import { ProjectService } from '../services/project.service';
import { ModelService } from '../services/model.service';
import { element } from 'protractor';

@Component({
  selector: 'app-properties-panel',
  templateUrl: './properties-panel.component.html',
  styleUrls: ['./properties-panel.component.scss']
})
export class PropertiesPanelComponent implements OnInit, OnDestroy {

  constructor(private eventService: EventService, private projectService: ProjectService, private modelService: ModelService) {
  }

  console = console;
  title = '';

  cpnElement;
  elementType;
  pageId;

  names = {
    'name': 'Name',
    'initmark': 'Initial marking',
    'type': 'Colorset',
    'port': 'Port type',
    'cond': 'Condition',
    'time': 'Time',
    'code': 'Code',
    'priority': 'Priority',
    'subst': 'Subpage',
    'annot': 'Annotation'
  };

  colors = [
    '#800000ff',
    '#ffff00ff',
    '#ffffffff',
    '#ff0000ff',
    '#c0c0c0ff',
    '#008080ff',
    '#000080ff',
    '#00ffffff',
    '#000000ff',
    '#808000ff',
    '#00ff00ff',
    '#808080ff',
    '#800080ff',
    '#008000ff',
    '#0000ffff',
  ];

  orientations = [
    'PtoT',
    'TtoP',
    'BOTHDIR'
  ];

  portTypes = [
    '',
    'In',
    'Out',
    'In/Out'
  ];

  pages = [];

  private layoutPartOpened: boolean[] = [];

  private getPort(portObject, cpnElement) {
    return portObject ? { obj: cpnElement, pobj: portObject, val: portObject._type } : { obj: cpnElement, state: 'none', val: 'none' };
  }

  private getSubst(substObject, cpnElement) {
    return substObject ? { obj: cpnElement, subsobj: substObject } : { obj: cpnElement, state: 'none' };
  }

  ngOnInit() {
    this.subscribeToProject();
  }

  ngOnDestroy() {
  }

  updateChanges() {
    console.log('updateChanges(), this = ', this);

    const emiterData = {
      id: Constants.ACTION_PROPERTY_UPDATE,
      labels: [],
      elementid: this.cpnElement._id,
      cpnElement: this.cpnElement,
      type: this.elementType,
      pagename: this.modelService.getPageById(this.pageId).pageattr._name
    };
    this.eventService.send(Message.PROPERTY_UPDATE, emiterData);
  }


  clearData() {
    this.title = '';
    this.layoutPartOpened = [];
    this.layoutPartOpened['common'] = true;
    this.cpnElement = null;
  }

  /**
   * Subscriber is awaiting data from other components
   */
  subscribeToProject() {
    this.eventService.on(Message.PAGE_OPEN, (data) => {
      console.log(this.constructor.name, 'Message.PAGE_OPEN, data = ', data);

      this.showPageAttrs(data.pageObject);
    });

    this.eventService.on(Message.SHAPE_SELECT, (data) => {
      console.log(this.constructor.name, 'Message.SHAPE_SELECT, data = ', data);

      const element = data.element.labelTarget ?
        data.element.labelTarget.labelTarget || data.element.labelTarget :
        data.element;

      this.showShapeAttrs(element);
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
  }

  /**
   * function that fills the data setd for fields in the properties panel
   * @param shapeObject - model shape object
   */
  showShapeAttrs(shapeObject) {
    console.log(this.constructor.name, 'showShapeAttrs(), shapeObject = ', shapeObject);

    this.clearData();

    if (!shapeObject || !shapeObject.cpnElement) {
      return;
    }

    let type = shapeObject.type;
    type = type.replace(/^cpn:/, '');

    if (['Place', 'Transition', 'Connection', 'Label'].indexOf(type) < 0) {
      return;
    }

    this.elementType = shapeObject.type;
    this.cpnElement = shapeObject.cpnElement;
    this.title = type;
  }

  updatePortType() {

    this.updateChanges();
  }

  updateSubst() {

    this.updateChanges();
  }

}

