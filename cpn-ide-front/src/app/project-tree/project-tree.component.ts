import { Message } from './../common/message';
import { ModelService } from './../services/model.service';
import { EventService } from './../services/event.service';
import { Component, OnInit, OnChanges, SimpleChanges, DoCheck, HostListener, ViewChild } from '@angular/core';
import { nodeToArray, cloneObject, getNextId, arrayToNode } from '../common/utils';
import { clearDeclarationLayout, parseDeclarartion } from './project-tree-declaration-node/declaration-parser';
import { AccessCpnService } from '../services/access-cpn.service';
import { SettingsService } from '../services/settings.service';
import { ContextMenuComponent } from '../context-menu/context-menu.component';
import { SelectedNode } from './tree-node/tree-node';

export class TreeData {
  expanded = [];
  errors = [];
  pages = [];
  subpages = [];
  parents = [];
  cpnElements = [];

  selected: SelectedNode = new SelectedNode();
  selectedOld: SelectedNode = new SelectedNode();

  // Context menu
  contextMenu = undefined;

  // Tree component
  treeComponent = undefined;
  treeType = undefined;

  reset() {
    this.expanded = [];
    this.errors = [];
    this.pages = [];
    this.subpages = [];
    this.parents = [];
    this.cpnElements = [];

    this.selected = new SelectedNode();
    this.selectedOld = new SelectedNode();

    // Context menu
    this.contextMenu = undefined;

    // Tree component
    this.treeComponent = undefined;
    this.treeType = undefined;
  }
}


@Component({
  selector: 'app-project-tree',
  templateUrl: './project-tree.component.html',
  styleUrls: ['./project-tree.component.scss']
})
export class ProjectTreeComponent implements OnInit, DoCheck {

  @ViewChild('contextMenu') contextMenu: ContextMenuComponent;

  public nodeToArray = nodeToArray;
  public JSON = JSON;
  public alert = alert;

  public project;
  public cpnet;

  public tree: TreeData = this.getDefaultTree();
  public mouseover = { id: undefined };

  public containerId = 'projectTreeComponentContainer';

  public newPageCount = 0;

  simulationState = { step: 0, time: 0 };

  constructor(public eventService: EventService,
    public modelService: ModelService,
    private accessCpnService: AccessCpnService,
    private settings: SettingsService) {
  }

  ngOnInit() {
    this.reset();

    this.eventService.on(Message.PROJECT_LOAD, () => this.loadProject());
    this.eventService.on(Message.MODEL_RELOAD, () => this.loadProject());

    this.eventService.on(Message.SERVER_INIT_NET_DONE, () => this.updateErrors());
    this.eventService.on(Message.SIMULATION_UPDATE_STATE, () => this.onSimulationState());

    this.eventService.on(Message.MONITOR_CREATED, (event) => this.goToMonitor(event.newMonitorCpnElement._id));
  }

  ngDoCheck() {
    if (this.tree.selectedOld.id !== this.tree.selected.id) {
      this.tree.selectedOld = this.tree.selected.clone();
      this.onSelectedChange();
    }
  }

  reset() {
    this.tree = this.getDefaultTree();

    this.tree.expanded['pages'] = true;
    this.tree.expanded['project'] = true;
  }

  getDefaultTree(): TreeData {
    const treeData = new TreeData();
    treeData.reset();

    // Context menu
    treeData.contextMenu = this.contextMenu;

    // Tree component
    treeData.treeComponent = this;
    treeData.treeType = 'tree';

    return treeData;
  }

  loadProject() {
    this.reset();

    this.cpnet = this.modelService.getCpn();
    this.project = this.modelService.getProject();
    this.loadPages();

    // setTimeout(() => this.goToDeclaration('ID1438190116'), 100);
    setTimeout(() => this.goToFirstPage(), 100);
  }

  updateErrors() {
    this.tree.errors = this.accessCpnService.getErrorData() || [];
    // for (const id in this.accessCpnService.getErrorData()) {
    //   this.errors.push(id);
    // }

    console.log(this.constructor.name, 'updateErrors(), this.errors = ', this.tree.errors);
  }

  loadPages() {
    this.tree.pages = nodeToArray(this.cpnet.page);
  }

  onSimulationState() {
    const stateData = this.accessCpnService.getStateData();
    if (stateData) {
      this.simulationState = stateData;
    } else {
      this.simulationState = { step: 0, time: 0 };
    }
  }

  onSelectedChange() {
    // console.log(this.constructor.name, 'onSelectedChange(), this.selected = ', JSON.stringify(this.selected));

    switch (this.tree.selected.type) {
      // case 'page':
      //   this.eventService.send(Message.PAGE_OPEN, { pageObject: this.tree.selected.cpnElement });
      //   break;
      case 'monitor':
        this.eventService.send(Message.MONITOR_OPEN, { monitorObject: this.tree.selected.cpnElement });
        break;
    }
  }

  onChange(event) {
    console.log(this.constructor.name, 'onChange(), event = ', event);
  }

  goToFirstPage() {
    if (this.cpnet && this.cpnet.page) {

      const page = nodeToArray(this.cpnet.page)[0];

      console.log(this.constructor.name, 'goToFirstPage(), page = ', page);

      this.tree.selected.id = page._id;
      this.tree.selected.type = 'page';
      this.tree.selected.cpnElement = page;

      this.tree.expanded[page._id] = true;

      const inputElem = document.getElementById(this.tree.selected.id);
      console.log(this.constructor.name, 'goToFirstPage(), inputElem = ', inputElem);
      if (inputElem) {
        inputElem.focus();
      }
    }
  }

  goToMonitor(id) {
    if (this.cpnet && this.cpnet.monitorblock) {

      const monitorList = nodeToArray(this.cpnet.monitorblock.monitor);
      const monitor = monitorList.find((e) => e._id === id);

      if (monitor) {
        console.log(this.constructor.name, 'goToMonitor(), monitor = ', monitor);

        this.tree.selected.id = monitor._id;
        this.tree.selected.type = 'monitor';
        this.tree.selected.cpnElement = monitor;

        this.tree.expanded[this.cpnet.monitorblock._name] = true;

        const inputElem = document.getElementById(this.tree.selected.id);
        console.log(this.constructor.name, 'goToMonitor(), inputElem = ', inputElem);
        if (inputElem) {
          inputElem.focus();
        }
      }
    }
  }

  goToDeclaration(id) {
    console.log(this.constructor.name, 'goToDeclaration(), id = ', id);
    console.log(this.constructor.name, 'goToDeclaration(), this.tree.parents[id] = ', this.tree.parents[id]);

    const path = [];
    let nodeId = id;
    while (this.tree.parents[nodeId]) {
      path.push(this.tree.parents[nodeId]);
      nodeId = this.tree.parents[nodeId];
    }
    console.log(this.constructor.name, 'goToDeclaration(), path = ', path);

    this.tree.expanded['declarations'] = true;
    for (nodeId of path) {
      this.tree.expanded[nodeId] = true;
    }

    if (this.tree.cpnElements[id]) {
      const cpnElement = this.tree.cpnElements[id];
      this.tree.selected.id = cpnElement._id;
      this.tree.selected.cpnElement = cpnElement;
    }
  }

  focus(id) {
    setTimeout(() => {
      if (this.tree && this.containerId) {

        const container = document.getElementById(this.containerId);

        if (container) {
          const inputElem: any = container.querySelector('#' + id);
          if (inputElem) {
            inputElem.focus();
          }
        }
      }
    }, 100);
  }

  onNewBlock() {
    console.log(this.constructor.name, 'onNewBlock(), this.selected = ', this.tree.selected);

    if (this.tree.selected && this.tree.selected.type === 'declarations') {
      const newBlock = { id: 'New block', _id: getNextId() };
      this.modelService.addCpnElement(this.cpnet.globbox, newBlock, 'block');
      this.focus(newBlock._id);
    }
  }

  onNewPage() {
    console.log(this.constructor.name, 'onNewPage(), this.selected = ', this.tree.selected);

    if (this.tree.selected && this.tree.selected.type === 'pages') {
      const defValue = this.settings.getAppSettings()['page'];
      const newPage = this.modelService.createCpnPage(defValue);
      this.modelService.addCpnElement(this.cpnet, newPage, 'page');
      this.modelService.updateInstances();
      this.focus(newPage._id);
    }
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

  onContextMenu(event, type) {
    if (this.contextMenu) {
      event.preventDefault();

      const entries = [];
      switch (type) {
        case 'declarations':
          entries.push({ title: 'New block', action: () => this.onNewBlock(), iconClass: 'fas fa-cube' });
          break;
        case 'pages':
          entries.push({ title: 'New page', action: () => this.onNewPage(), iconClass: 'fas fa-project-diagram' });
          break;
      }

      if (entries.length > 0) {
        this.tree.contextMenu.setEntries(entries);
        this.tree.contextMenu.show({ x: event.clientX, y: event.clientY });
      }
    }
  }


}
