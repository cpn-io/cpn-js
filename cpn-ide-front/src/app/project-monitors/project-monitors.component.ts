import { Component, OnInit } from '@angular/core';
import { EventService } from '../services/event.service';
import { Message } from '../common/message';
import { ModelService } from '../services/model.service';
import { AccessCpnService } from '../services/access-cpn.service';

@Component({
  selector: 'app-project-monitors',
  templateUrl: './project-monitors.component.html',
  styleUrls: ['./project-monitors.component.scss']
})
export class ProjectMonitorsComponent implements OnInit {

  JSON = JSON;

  cpnElement;

  boolValues = [
    'true',
    'false'
  ];

  constructor(private eventService: EventService,
    private modelService: ModelService,
    public accessCpnService: AccessCpnService) { }

  ngOnInit() {
    this.eventService.on(Message.MONITOR_OPEN, (event) => this.onLoadMonitor(event.monitorObject));
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

    const nodes = this.cpnElement.node instanceof Array ? this.cpnElement.node : [this.cpnElement.node];

    console.log('getNodes(), nodes = ', nodes);

    const nodeList = [];
    for (const node of nodes) {
      nodeList.push({
        page: {
          id: node._pageinstanceidref,
          name: node._pageinstanceidref
        },
        element: {
          id: node._idref,
          name: node._idref
        }
      });
    }
    console.log('getNodes(), nodeList = ', nodeList);

    return nodeList;
  }

  onLoadMonitor(cpnElement) {
    this.cpnElement = cpnElement;
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
