import { Component, OnInit, AfterViewInit } from '@angular/core';
import { EventService } from '../services/event.service';
import { ModelService } from '../services/model.service';

import { nodeToArray, cloneObject, getNextId, arrayToNode } from '../common/utils';
import { Message } from '../common/message';

@Component({
  selector: 'app-project-declarations',
  templateUrl: './project-declarations.component.html',
  styleUrls: ['./project-declarations.component.scss']
})
export class ProjectDeclarationsComponent implements OnInit, AfterViewInit {

  public nodeToArray = nodeToArray;
  public JSON = JSON;

  public project;
  public cpnet;
  public expanded;
  public selected;

  tabList = [
    { id: 'all', name: 'BatchOrdering', declarationType: 'all' },
    { id: 'globref', name: 'Globref', declarationType: 'globref' },
    { id: 'color', name: 'Color', declarationType: 'color' },
    { id: 'var', name: 'Var', declarationType: 'var' },
    { id: 'ml', name: 'ML', declarationType: 'ml' },
    // { id: 'monitor', name: 'Monitors', declarationType: '' },
  ];

  constructor(public eventService: EventService,
    public modelService: ModelService) { }

  ngOnInit() {
    this.eventService.on(Message.PROJECT_LOAD, () => this.loadProject());
    this.eventService.on(Message.MODEL_RELOAD, () => this.loadProject());
    this.eventService.on(Message.SERVER_INIT_NET_DONE, () => this.loadProject());
    this.eventService.on(Message.SERVER_INIT_SIM_DONE, () => this.loadProject());
    this.eventService.on(Message.SIMULATION_UPDATE_STATE, () => this.loadProject());
  }

  ngAfterViewInit() {
    this.loadProject();
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
