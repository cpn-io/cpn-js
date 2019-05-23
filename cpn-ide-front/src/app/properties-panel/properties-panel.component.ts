import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Constants } from '../common/constants';
import TextRenderer from '../../lib/cpn-js/draw/TextRenderer';

import { Message } from '../common/message';
import { EventService } from '../services/event.service';
import { ModelService } from '../services/model.service';
import { element } from 'protractor';


@Component({
  selector: 'app-properties-panel',
  templateUrl: './properties-panel.component.html',
  styleUrls: ['./properties-panel.component.scss']
})
export class PropertiesPanelComponent implements OnInit, OnDestroy {

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

  constructor(private eventService: EventService,
    private modelService: ModelService) {
  }

  ngOnInit() {
    this.subscribeToProject();
  }

  ngOnDestroy() {
  }

  updateChanges() {
    console.log('updateChanges(), this = ', this);

    const emiterData = {
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


  /**
   * Get list of names for pages wich is not current or not subpage
   */
  getSubstPages() {
    const pageList = this.modelService.getAllPages();

    const subPageIdList = [];
    const parentPageIdList = [];

    for (let page of pageList) {
      var transList = page.trans instanceof Array ? page.trans : [page.trans];
      for (let trans of transList) {
        if (trans.subst && trans.subst._subpage) {
          if (page._id !== this.pageId)
            subPageIdList.push(trans.subst._subpage);

          if (trans.subst._subpage === this.pageId || parentPageIdList.includes(trans.subst._subpage))
            parentPageIdList.push(page._id);
        }
      }
    }

    // console.log('getSubstPages(), supPageIdList = ', subPageIdList);

    const pageNames = ['-- empty --'];
    for (let page of pageList) {
      if (page._id !== this.pageId && !subPageIdList.includes(page._id) && !parentPageIdList.includes(page._id))
        pageNames.push(page.pageattr._name);
    }
    return pageNames;
  }

  getBindTransElementSubst(cpnElement){
      let bindObj =   this.modelService.getArcEnds(cpnElement);
      if(bindObj.trans) return bindObj.trans.subst;
      else return false;
  }

  getSubPagesPorts(cpnElement, transEnd) {
    let bindObj =   this.modelService.getArcEnds(cpnElement);
    const ports = this.modelService.getAllPorts(cpnElement, bindObj.trans);
    const portNames = [''];
    for (const port of ports) {
      portNames.push(port.text);
    }
    return portNames;
  }


  getPort(cpnElement) {
    return cpnElement.port
      ? { value: cpnElement.port._type === 'I/O' ? 'In/Out' : cpnElement.port._type }
      : { value: '' };
  }

  getPortBind(cpnElement) {
    const bindObj = this.modelService.getArcEnds(cpnElement);
    if (bindObj.trans.subst && bindObj.trans.subst._portsock) {
      const ids = this.parsePortSock(bindObj.trans.subst._portsock);
      for (let pair of ids) {
        if (pair.includes(cpnElement.placeend._idref)) {
          for (let id of pair) {
            if (id !== cpnElement.placeend._idref) return {value: this.modelService.getPortNameById(bindObj.trans.subst._subpage, id)};
          }
        }
      }
    }
    return {value: ''};
  }


  parsePortSock(portsock){
    let str =  portsock.trim().replace(new RegExp(/[),(]/, 'g'), '-');
    str = str.substr(1, str.length - 2);
    //let ids = str.split(new RegExp(/-+/, 'g'))
    let ids = [];
    for(let el of  str.split('--')) {
      ids.push( el.split('-'));
    }
    return ids;
  }

  updatePortBind(event) {
    console.log('updatePortBind    ', event);
    const bindObj = this.modelService.getArcEnds(this.cpnElement);
    const id = this.modelService.getPortIdByName(bindObj.trans.subst._subpage, event, bindObj.orient);
    let ids = undefined;
    if(bindObj.trans.subst._portsock !== '') {
      ids = this.parsePortSock(bindObj.trans.subst._portsock);
      let pair = ids.find(p => {
        return p.includes(bindObj.place._id)
      });

      if (pair) {
        if(id) {
          pair[0] = id.trim();
          pair[1] = bindObj.place._id.trim();
        } else {
          ids = ids.filter(e => e[0] !== pair[0] ||  e[1] !== pair[1]);
        }
      } else {
        ids.push([id, bindObj.place._id]);
      }
    } else {
      ids = [[id.trim(), bindObj.place._id.trim()]];
    }

    let portsock = '';
    for(let bind of ids) {
      portsock += '(' + bind[0] + ',' + bind[1] + ')';
    }
    bindObj.trans.subst._portsock = portsock;
    this.updateChanges();
  }

  getSubst(cpnElement) {
    return cpnElement.subst && cpnElement.subst.subpageinfo
      ? { value: cpnElement.subst.subpageinfo._name }
      : { value: '' };
  }

  updatePortType(event) {
    // console.log(this.constructor.name, 'updatePortType(), event = ', event);

    const portType = event.trim();

    if (!this.cpnElement)
      return;

    if (portType === '') {
      delete this.cpnElement.port;
      this.updateChanges();
      return;
    }

    if (!this.cpnElement.port)
      this.cpnElement.port = this.modelService.createPortObject(this.cpnElement, portType);

    this.cpnElement.port.text = portType;
    this.cpnElement.port._type = (portType === 'In/Out') ? 'I/O' : portType;

    // console.log(this.constructor.name, 'updatePortType(), this.cpnElement = ', this.cpnElement);

    this.updateChanges();
  }

  updateSubst(event) {
    // console.log(this.constructor.name, 'updateSubst(), event = ', event);

    const pageName = event.trim();

    if (!this.cpnElement)
      return;

    if (pageName === '' || pageName === '-- empty --') {
      delete this.cpnElement.subst;
    } else {
      let pageId = this.modelService.getPageId(pageName);

      if (!this.cpnElement.subst)
        this.cpnElement.subst = this.modelService.createSubstObject(this.cpnElement, pageName, pageId);

      this.cpnElement.subst.subpageinfo.text = pageName;
      this.cpnElement.subst.subpageinfo._name = pageName;
      this.cpnElement.subst._subpage = pageId;

      // console.log(this.constructor.name, 'updateSubst(), this.cpnElement = ', this.cpnElement);
    }

    this.updateChanges();
    this.eventService.send(Message.UPDATE_TREE_PAGES, {
      currentPageId: this.pageId
    });
  }

}

