import { Component, OnInit } from '@angular/core';
import { EventService } from '../services/event.service';
import { Message } from '../common/message';
import { ModelService } from '../services/model.service';
import { AccessCpnService } from '../services/access-cpn.service';
import { nodeToArray } from '../common/utils';

@Component({
  selector: 'app-project-monitors',
  templateUrl: './project-monitors.component.html',
  styleUrls: ['./project-monitors.component.scss']
})
export class ProjectMonitorsComponent implements OnInit {

  JSON = JSON;

  cpnElement;
  nodeList = [];

  boolValues = [
    'true',
    'false'
  ];

  createNodeIntent = false;

  constructor(private eventService: EventService,
    private modelService: ModelService,
    public accessCpnService: AccessCpnService) { }

  ngOnInit() {
    this.eventService.on(Message.MONITOR_OPEN, (event) => this.onLoadMonitor(event.monitorObject));
    this.eventService.on(Message.SHAPE_SELECT, (event) => { if (this.createNodeIntent) { this.onCreateNode(event) } });
  }

  getOption(name) {
    if (this.cpnElement && this.cpnElement.option) {
      // console.log('this.cpnElement.option = ', this.cpnElement.option);

      const options = this.cpnElement.option instanceof Array ? this.cpnElement.option : [this.cpnElement.option];
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

  getNodes() {
    if (!this.cpnElement || !this.cpnElement.node) {
      return undefined;
    }

    const nodes = nodeToArray(this.cpnElement.node);

    // console.log('getNodes(), nodes = ', nodes);

    const nodeList = [];
    for (const node of nodes) {
      const page = this.modelService.getPageByElementId(node._idref);
      const element = this.modelService.getPlaceOrTransitionById(node._idref);
      nodeList.push({
        page: page,
        element: element.element,
        elementType: element.type
      });
    }
    // console.log('getNodes(), nodeList = ', nodeList);

    return nodeList;
  }

  setCreateNodeIntent(enable) {
    this.createNodeIntent = enable;
    document.body.style.cursor = enable ? 'crosshair' : 'default';
  }

  onLoadMonitor(cpnElement) {
    this.cpnElement = cpnElement;
    this.nodeList = this.getNodes();
  }

  onCreateNode(event) {
    const element = event.element.labelTarget ?
      event.element.labelTarget.labelTarget || event.element.labelTarget :
      event.element;

    if (element && element.cpnElement) {
      console.log('onCreateNode(), element.cpnElement = ', element.cpnElement);

      const pages = this.modelService.getAllPages();
      for (const page of pages) {
        const instances = this.modelService.getSubInstances(page);
        if (instances) {
          for (const instance of instances) {
            console.log('onCreateNode(), instance = ', instance);
          }
        }
      }

      const monitorNodeList = nodeToArray(this.cpnElement.node) || [];
      monitorNodeList.push({
        _idref: element.cpnElement._id,
        _pageinstanceidref: 'id251437332ia'
      });
      this.cpnElement.node = monitorNodeList.length === 1 ? monitorNodeList[0] : monitorNodeList;
      this.onLoadMonitor(this.cpnElement);
      this.updateChanges();
    }

    this.setCreateNodeIntent(false);
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
    this.onDeclarationClick(event, declaration);

    // if (node.type === 'declaration') {
    //   this.sendSelectDeclarationNode(node, true);
    // }
  }

  onSaveDeclaration(event, declaration) {
    this.updateChanges();
  }

  onNewNode() {
    console.log('onNewNode()');
    this.setCreateNodeIntent(true);
  }

  onDeleteNode(node) {
    // console.log('onDeleteNode(), node = ', node);

    let monitorNodeList = nodeToArray(this.cpnElement.node);
    const monitorNode = monitorNodeList.find(n => n._idref === node.element._id);

    // console.log('onDeleteNode(), monitorNode = ', monitorNode);

    if (monitorNode) {
      monitorNodeList = monitorNodeList.filter(n => n !== monitorNode);
      this.cpnElement.node = monitorNodeList.length === 1 ? monitorNodeList[0] : monitorNodeList;
      this.onLoadMonitor(this.cpnElement);
      this.updateChanges();
    }
  }

  updateChanges() {
    // this.eventService.send(Message.MODEL_UPDATE_DIAGRAM, { cpnElement: this.cpnElement });
    this.eventService.send(Message.MODEL_CHANGED);
  }

  updateOptionValue(event, name) {
    // console.log(this.constructor.name, 'updatePortType(), event = ', event);

    if (!this.cpnElement) {
      return;
    }

    const value = event.trim();
    const option = this.getOption(name);
    if (option) {
      option._value = value;
    }
    this.updateChanges();
  }


}
