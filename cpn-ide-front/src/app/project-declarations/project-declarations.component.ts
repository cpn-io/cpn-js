import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { EventService } from '../services/event.service';
import { ModelService } from '../services/model.service';

import { nodeToArray, cloneObject, getNextId, arrayToNode } from '../common/utils';
import { Message } from '../common/message';
import { ContextMenuComponent } from '../context-menu/context-menu.component';

@Component({
  selector: 'app-project-declarations',
  templateUrl: './project-declarations.component.html',
  styleUrls: ['./project-declarations.component.scss']
})
export class ProjectDeclarationsComponent implements OnInit, AfterViewInit {

  @ViewChild('contextMenu') contextMenu: ContextMenuComponent;

  public nodeToArray = nodeToArray;
  public JSON = JSON;

  public project;
  public cpnet;

  public tree = this.getDefaultTree();

  tabList = [
    { id: 'all', name: 'BatchOrdering', declarationType: 'all' },
    { id: 'globref', name: 'Globref', declarationType: 'globref' },
    { id: 'color', name: 'Color', declarationType: 'color' },
    { id: 'var', name: 'Var', declarationType: 'var' },
    { id: 'ml', name: 'ML', declarationType: 'ml' },
    { id: 'monitor', name: 'Monitors', declarationType: 'monitor' },
  ];

  constructor(public eventService: EventService,
    public modelService: ModelService) { }

  ngOnInit() {
    this.eventService.on(Message.PROJECT_LOAD, () => this.loadProject());
    this.eventService.on(Message.MODEL_RELOAD, () => this.loadProject());
    // this.eventService.on(Message.SERVER_INIT_NET_DONE, () => this.loadProject());
    this.eventService.on(Message.SERVER_INIT_SIM_DONE, () => this.loadProject());
    this.eventService.on(Message.SIMULATION_UPDATE_STATE, () => this.loadProject());
  }

  ngAfterViewInit() {
    this.loadProject();
  }

  reset() {
    this.tree = this.getDefaultTree();
  }

  getDefaultTree() {
    return {
      expanded: [],
      selected: { type: undefined, id: undefined, cpnElement: undefined, parentCpnElement: undefined },
      selectedOld: { id: undefined },
      errors: [],
      pages: [],
      subpages: [],
      parents: [],
      cpnElements: [],

      // Context menu
      contextMenu: this.contextMenu,
      containerId: 'projectDeclarationsComponentContainer',

      // Tree component
      treeComponent: this,
      treeType: 'declarations'
    };
  }


  loadProject() {
    this.reset();

    this.cpnet = this.modelService.getCpn();
    this.project = this.modelService.getProject();
  }

}
