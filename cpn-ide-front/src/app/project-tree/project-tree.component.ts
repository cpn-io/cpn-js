import { Message } from './../common/message';
import { ModelService } from './../services/model.service';
import { EventService } from './../services/event.service';
import { Component, OnInit, OnChanges, SimpleChanges, DoCheck, HostListener, ViewChild } from '@angular/core';
import { nodeToArray, cloneObject, getNextId, arrayToNode } from '../common/utils';
import { clearDeclarationLayout, parseDeclarartion } from './project-tree-declaration-node/declaration-parser';
import { AccessCpnService } from '../services/access-cpn.service';
import { SettingsService } from '../services/settings.service';
import { ContextMenuComponent } from '../context-menu/context-menu.component';

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

  public tree = this.getDefaultTree();

  public mouseover = { id: undefined };

  newPageCount = 0;

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

  }

  ngDoCheck() {
    if (this.tree.selectedOld.id !== this.tree.selected.id) {
      this.tree.selectedOld = cloneObject(this.tree.selected);
      this.onSelectedChange();
    }
  }

  reset() {
    this.tree = this.getDefaultTree();

    this.tree.expanded['pages'] = true;
    this.tree.expanded['project'] = true;
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
      containerId: 'projectTreeComponentContainer',

      // Tree component
      treeComponent: this,
      treeType: 'tree'
    };
  }

  loadProject() {
    this.reset();

    this.cpnet = this.modelService.getCpn();
    this.project = this.modelService.getProject();
    this.loadPages();

    setTimeout(() => this.goToDeclaration('ID1438190116'), 100);
    // setTimeout(() => this.goToFirstPage(), 100);
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
      case 'page':
        this.eventService.send(Message.PAGE_OPEN, { pageObject: this.tree.selected.cpnElement });
        break;
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

      const inputElem = document.getElementById(this.tree.selected.id);
      console.log(this.constructor.name, 'goToFirstPage(), inputElem = ', inputElem);
      if (inputElem) {
        inputElem.focus();
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
      if (this.tree && this.tree.containerId) {

        const container = document.getElementById(this.tree.containerId);

        if (container) {
          const inputElem: any = container.querySelector('#' + id);
          if (inputElem) {
            inputElem.focus();
          }
        }
      }
    }, 100);
  }

  onNewDeclaration() {
    console.log(this.constructor.name, 'onNewDeclaration(), this.selected = ', this.tree.selected);

    const newDeclaration = this.modelService.newDeclaration(this.tree.selected.parentCpnElement, this.tree.selected.type);
    if (newDeclaration) {
      this.focus(newDeclaration._id);
    }
  }

  onNewBlock() {
    console.log(this.constructor.name, 'onNewBlock(), this.selected = ', this.tree.selected);

    if (this.tree.selected) {

      let parentElement = undefined;

      switch (this.tree.selected.type) {
        case 'declarations':
          parentElement = this.cpnet.globbox;
          break;

        case 'block':
          parentElement = this.tree.selected.cpnElement;
          break;

        case 'globref':
        case 'color':
        case 'var':
        case 'ml':
          parentElement = this.tree.selected.parentCpnElement;
          break;
      }

      if (parentElement) {
        const newBlock = { id: 'New block', _id: getNextId() };
        this.modelService.addCpnElement(parentElement, newBlock, 'block');
        this.focus(newBlock._id);
      }
    }
  }

  onNewPage() {
    const defValue = this.settings.getAppSettings()['page'];
    const cpnElement = this.modelService.createCpnPage(defValue + ' ' + (++this.newPageCount), undefined);

    const cpnet = this.modelService.getCpn();
    this.modelService.addCpnElement(cpnet, cpnElement, 'page');
    this.modelService.updateInstances();
  }

  // Toolbar action handlers
  onNewNode() {
    console.log(this.constructor.name, 'onNewNode()');

    if (this.tree.selected && this.tree.selected.type) {
      console.log(this.constructor.name, 'onNewNode(), this.selected = ', this.tree.selected);

      switch (this.tree.selected.type) {
        case 'globref':
        case 'color':
        case 'var':
        case 'ml':
          this.onNewDeclaration();
          break;

        case 'declarations':
        case 'block':
          this.onNewBlock();
          break;

        case 'page':
          this.onNewPage();
          break;
      }
    }
  }


  onDeleteNode() {
    console.log(this.constructor.name, 'onDeleteNode(), this.selected = ', this.tree.selected);

    if (this.tree.selected
      && this.tree.selected.parentCpnElement
      && ['globref', 'color', 'var', 'ml', 'block', 'page'].includes(this.tree.selected.type)) {

      this.modelService.removeCpnElement(this.tree.selected.parentCpnElement, this.tree.selected.cpnElement, this.tree.selected.type);
    }
  }

  onUpNode() {
    console.log(this.constructor.name, 'onUpNode()');

    if (this.tree.selected
      && this.tree.selected.parentCpnElement
      && ['globref', 'color', 'var', 'ml', 'block', 'page'].includes(this.tree.selected.type)) {

      this.modelService.moveCpnElement(this.tree.selected.parentCpnElement, this.tree.selected.cpnElement, this.tree.selected.type, 'up');

      this.focus(this.tree.selected.cpnElement._id);
    }
  }

  onDownNode() {
    console.log(this.constructor.name, 'onDownNode()');

    if (this.tree.selected
      && this.tree.selected.parentCpnElement
      && ['globref', 'color', 'var', 'ml', 'block', 'page'].includes(this.tree.selected.type)) {

      this.modelService.moveCpnElement(this.tree.selected.parentCpnElement, this.tree.selected.cpnElement, this.tree.selected.type, 'down');

      this.focus(this.tree.selected.cpnElement._id);
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
      }

      if (entries.length > 0) {
        this.tree.contextMenu.setEntries(entries);
        this.tree.contextMenu.show({ x: event.clientX, y: event.clientY });
      }
    }
  }


}
