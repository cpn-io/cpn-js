import { Component, OnInit } from '@angular/core';
import { EventService } from '../services/event.service';
import { Message } from '../common/message';
import { ModelService } from '../services/model.service';
import { AccessCpnService } from '../services/access-cpn.service';
import { nodeToArray } from '../common/utils';
import { getMonitorNodeTypeList } from '../common/monitors';

import {
  CPN_LABEL,
  CPN_PLACE,
  CPN_TRANSITION,
  is,
} from '../../lib/cpn-js/util/ModelUtil';

@Component({
  selector: 'app-project-monitors',
  templateUrl: './project-monitors.component.html',
  styleUrls: ['./project-monitors.component.scss']
})
export class ProjectMonitorsComponent implements OnInit {

  JSON = JSON;
  nodeToArray = nodeToArray;

  monitor;
  optionTimed = false;
  optionLogging = false;

  nodeList = [];
  nodeTypeList = [];

  boolValues = [
    'true',
    'false'
  ];

  createNodeIntent = false;

  constructor(private eventService: EventService,
    private modelService: ModelService,
    public accessCpnService: AccessCpnService) { }

  ngOnInit() {
    this.eventService.on(Message.PROJECT_LOAD, () => this.onLoadMonitor(undefined));
    this.eventService.on(Message.MODEL_RELOAD, () => this.onLoadMonitor(undefined));

    this.eventService.on(Message.MONITOR_OPEN, (event) => this.onLoadMonitor(event.monitorObject));
    this.eventService.on(Message.SHAPE_SELECT, (event) => { if (this.createNodeIntent) { this.onCreateNode(event); } });

    this.eventService.on(Message.DECLARATION_CHANGED, (event) => this.onUpdateDeclaration(event));

  }

  getOption(name) {
    if (this.monitor && this.monitor.option) {
      // console.log('this.cpnElement.option = ', this.cpnElement.option);

      const options = this.monitor.option instanceof Array ? this.monitor.option : [this.monitor.option];
      const option = options.find((o) => o._name === name);
      if (option) {
        return option;
      }
    }
    return undefined;
  }

  getOptionValue(name) {
    const option = this.getOption(name);
    if (option) {
      return option._value;
    }
    return undefined;
  }

  setCreateNodeIntent(enable) {
    this.createNodeIntent = enable;
    document.body.style.cursor = enable ? 'crosshair' : 'default';
  }

  onLoadMonitor(cpnElement) {
    this.monitor = cpnElement;
    this.nodeList = this.modelService.getMonitorNodeNamesList(this.monitor);

    this.optionTimed = this.getOption('Timed');
    this.optionLogging = this.getOption('Logging');

    this.nodeTypeList = this.monitor ? getMonitorNodeTypeList(this.monitor._type) : [];

    console.log('onLoadMonitor(), this.cpnElement = ', this.monitor);
    console.log('onLoadMonitor(), this.nodeList = ', this.nodeList);
  }

  onCreateNode(event) {
    this.setCreateNodeIntent(false);

    const element = event.element.labelTarget ?
      event.element.labelTarget.labelTarget || event.element.labelTarget :
      event.element;

    if (element && element.cpnElement) {
      console.log('onCreateNode(), element.cpnElement = ', element.cpnElement);

      if (is(element, CPN_PLACE)) {
        if (!this.nodeTypeList.includes('place')) {
          return;
        }
      }

      if (is(element, CPN_TRANSITION)) {
        if (!this.nodeTypeList.includes('transition')) {
          return;
        }
      }

      // const pages = this.modelService.getAllPages();
      // for (const page of pages) {
      //   const instances = this.modelService.getSubInstances(page);
      //   if (instances) {
      //     for (const instance of instances) {
      //       console.log('onCreateNode(), instance = ', instance);
      //     }
      //   }
      // }

      const monitorNodeList = nodeToArray(this.monitor.node) || [];
      monitorNodeList.push({
        _idref: element.cpnElement._id,
        _pageinstanceidref: 'id251437332ia'
      });
      this.monitor.node = monitorNodeList.length === 1 ? monitorNodeList[0] : monitorNodeList;
      this.onLoadMonitor(this.monitor);
      this.updateChanges();
    }
  }

  onUpdateDeclaration(event) {
    if (event.cpnElement && event.newTextValue) {
      const result = this.modelService.stringToCpnDeclarationElement(
        event.cpnElement,
        event.newTextValue);
      console.log('Message.DECLARATION_CHANGED, event.cpnElement = ', event.cpnElement);
      console.log('Message.DECLARATION_CHANGED, result = ', result);

      event.cpnElement.__text = result.cpnElement.__text;

      this.onLoadMonitor(this.monitor);
      this.updateChanges();
    }
  }


  onDeclarationClick(event, declaration) {
    // if (this.selectedNode !== node) {
    //   this.selectedNode = node;

    //   this.goToEditNode(node.id);

    //   if (node.type === 'declaration') {
    //     this.sendSelectDeclarationNode(node, false);
    //   }
    // }
  }

  onDeclarationDblClick(event, declaration) {
    console.log('onDeclarationDblClick(), declaration = ', declaration);

    this.onDeclarationClick(event, declaration);

    // if (node.type === 'declaration') {
    //   this.sendSelectDeclarationNode(node, true);
    // }

    this.eventService.send(Message.TREE_SELECT_DECLARATION_NODE, {
      sender: this,
      openEditorTab: true,
      cpnType: 'ml',
      cpnElement: declaration.ml
    });
  }

  onSaveDeclaration(event, declaration) {
    this.updateChanges();
  }

  onNewNode() {
    console.log('onNewNode(), this.cpnElement = ', this.monitor);
    console.log('onNewNode(), this.nodeTypeList = ', this.nodeTypeList);
    this.setCreateNodeIntent(true);

    const availableNodeIds = [];

    if (this.nodeTypeList.includes('place')) {
      for (const p of this.modelService.getAllPlaces()) {
        availableNodeIds.push(p._id);
      }
    }
    if (this.nodeTypeList.includes('transition')) {
      for (const t of this.modelService.getAllTrans()) {
        availableNodeIds.push(t._id);
      }
    }
    this.eventService.send(Message.MONITOR_SET_AVAILABLE_NODES, { availableNodeIds: availableNodeIds });
  }

  onDeleteNode(node) {
    // console.log('onDeleteNode(), node = ', node);

    let monitorNodeList = nodeToArray(this.monitor.node);
    const monitorNode = monitorNodeList.find(n => n._idref === node.element._id);

    // console.log('onDeleteNode(), monitorNode = ', monitorNode);

    if (monitorNode) {
      monitorNodeList = monitorNodeList.filter(n => n !== monitorNode);
      this.monitor.node = monitorNodeList.length === 1 ? monitorNodeList[0] : monitorNodeList;
      this.onLoadMonitor(this.monitor);
      this.updateChanges();
    }
  }

  updateChanges() {
    // this.eventService.send(Message.MODEL_UPDATE_DIAGRAM, { cpnElement: this.cpnElement });
    // this.eventService.send(Message.MODEL_CHANGED);
    this.eventService.send(Message.MONITOR_SET_AVAILABLE_NODES, { availableNodeIds: [] });
  }

  updateOptionValue(event, name) {
    // console.log(this.constructor.name, 'updatePortType(), event = ', event);

    if (!this.monitor) {
      return;
    }

    const value = event.trim();
    const option = this.getOption(name);
    if (option) {
      option._value = value;
    }
    this.updateChanges();
  }

  onCloneMonitor() {
  }

  onDisableMonitor(disable: boolean) {
    this.monitor._disabled = disable.toString();
    this.eventService.send(Message.MONITOR_CHANGED, { monitorCpnElement: this.monitor });
  }

  onDeleteMonitor() {
    if (this.monitor) {
      this.modelService.deleteFromModel(this.monitor);
      this.onLoadMonitor(undefined);
      this.eventService.send(Message.MONITOR_DELETED, { monitorCpnElement: this.monitor });
    }
  }

  isMonitorsSubnode() {
    return false;
  }
}
