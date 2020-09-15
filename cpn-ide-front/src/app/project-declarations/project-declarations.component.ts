import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, DoCheck } from '@angular/core';
import { EventService } from '../services/event.service';
import { ModelService } from '../services/model.service';

import { nodeToArray, cloneObject, getNextId, arrayToNode } from '../common/utils';
import { Message } from '../common/message';
import { ContextMenuComponent } from '../context-menu/context-menu.component';
import { TreeData } from '../project-tree/project-tree.component';
import {DataTypes} from '../common/constants';

@Component({
  selector: 'app-project-declarations',
  templateUrl: './project-declarations.component.html',
  styleUrls: ['./project-declarations.component.scss']
})
export class ProjectDeclarationsComponent implements OnInit, AfterViewInit, DoCheck {

  @ViewChild('contextMenu') contextMenu: ContextMenuComponent;

  public nodeToArray = nodeToArray;
  public JSON = JSON;

  public project;
  public cpnet;

  public tree = this.getDefaultTree();

  tabList = [
    { id: 'all', name: 'All', declarationType: 'all' },
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
    this.eventService.on(Message.SIMULATION_UPDATE_STATE, () => this.loadProject());
  }

  ngAfterViewInit() {
    this.loadProject();
  }

  ngDoCheck() {
    if (this.tree.selectedOld.id !== this.tree.selected.id) {
      this.tree.selectedOld = this.tree.selected.clone();
      this.onSelectedChange();
    }
  }

  reset() {
    this.tree = this.getDefaultTree();
  }

  getDefaultTree() {
    const treeData = new TreeData();
    treeData.reset();

    // Context menu
    treeData.contextMenu = this.contextMenu;

    // Tree component
    treeData.treeComponent = this;
    treeData.treeType = 'declarations';

    return treeData;
  }


  loadProject() {
    this.reset();

    this.cpnet = this.modelService.getCpn();
    this.project = this.modelService.getProject();
  }

  // Toolbar action handlers
  onNewNode() {
    console.log(this.constructor.name, 'onNewNode(), this.selected = ', this.tree.selected);
    if (this.tree.selected && this.tree.selected.treeNodeComponent) {
      this.tree.selected.treeNodeComponent.onNew(undefined);
    }
  }


  onDeleteNode() {
    console.log(this.constructor.name, 'onDeleteNode(), this.selected = ', this.tree.selected);
    if (this.tree.selected && this.tree.selected.treeNodeComponent) {
      this.tree.selected.treeNodeComponent.onDelete(undefined);
    }
  }

  onUpNode() {
    console.log(this.constructor.name, 'onUpNode(), this.selected = ', this.tree.selected);
    if (this.tree.selected && this.tree.selected.treeNodeComponent) {
      this.tree.selected.treeNodeComponent.onUp(undefined);
    }
  }

  onDownNode() {
    console.log(this.constructor.name, 'onDownNode(), this.selected = ', this.tree.selected);
    if (this.tree.selected && this.tree.selected.treeNodeComponent) {
      this.tree.selected.treeNodeComponent.onDown(undefined);
    }
  }

  onFilterChanged(event) {
    console.log(this.constructor.name, 'onFilterChanged(), event = ', event);
    this.tree.filter = event;
  }

  onSelectedChange() {
    switch (this.tree.selected.type) {
      case 'monitor':
        this.eventService.send(Message.MONITOR_OPEN, { monitorObject: this.tree.selected.cpnElement });
        break;
    }
  }

  onContextNewNode(block) {
    //  this.setSelected(block, block, 'var');
    // this.onNewNode();
    const newDeclaration = this.modelService.newDeclaration(block, 'var', undefined);
    if (newDeclaration) {
      // this.focus(newDeclaration._id);
    }
  }


  setSelected(cpnParentElement, cpnElement, type) {
    this.tree.selected.parentCpnElement = cpnParentElement;
    // this.tree.selected.id = cpnElement._id;
    // this.tree.selected.type = type;
    // this.tree.selected.cpnElement = cpnElement;

    this.eventService.send(Message.TREE_SELECT_DECLARATION_NODE_NEW, {
      cpnType: type,
      cpnElement: undefined,
      cpnParentElement: cpnParentElement
    });
  }

  onContextMenu(event) {

      const entries = [];
      for (const block of nodeToArray(this.cpnet.globbox.block)) {
        entries.push({ title: block.id, action: () => this.onContextNewNode(block), iconClass: 'fas fa-cube' });
      }

      // entries.push({ title: this, action: () => this. onNewNode(), iconClass: 'fas fa-cube' });
      // entries.push({ title: 'New page', action: () => this.onNewNode(), iconClass: 'fas fa-project-diagram' });
      if (entries.length > 0) {
        this.tree.contextMenu.setEntries(entries);
        this.tree.contextMenu.show({ x: event.clientX, y: event.clientY });
      }

  }



}
