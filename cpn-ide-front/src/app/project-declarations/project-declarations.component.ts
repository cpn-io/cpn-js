import { Component, OnInit } from '@angular/core';
import { EventService } from '../services/event.service';
import { ModelService } from '../services/model.service';

import { nodeToArray, cloneObject, getNextId, arrayToNode } from '../common/utils';
import { Message } from '../common/message';

@Component({
  selector: 'app-project-declarations',
  templateUrl: './project-declarations.component.html',
  styleUrls: ['./project-declarations.component.scss']
})
export class ProjectDeclarationsComponent implements OnInit {

  public nodeToArray = nodeToArray;
  public JSON = JSON;

  public project;
  public cpnet;
  public expanded;
  public selected;

  constructor(public eventService: EventService,
    public modelService: ModelService) { }

  ngOnInit() {
    this.reset();

    this.eventService.on(Message.PROJECT_LOAD, () => this.loadProject());
    this.eventService.on(Message.MODEL_RELOAD, () => this.loadProject());
  }

  reset() {
    this.expanded = [];
    this.selected = { type: undefined, id: undefined, cpnElement: undefined };
  }

  loadProject() {
    this.reset();

    this.cpnet = this.modelService.getCpn();
    this.project = this.modelService.getProject();
  }

}
