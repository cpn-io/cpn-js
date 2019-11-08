import { Message } from './../common/message';
import { ModelService } from './../services/model.service';
import { EventService } from './../services/event.service';
import { Component, OnInit, OnChanges, SimpleChanges, DoCheck, HostListener } from '@angular/core';
import { nodeToArray, cloneObject, getNextId, arrayToNode } from '../common/utils';
import { clearDeclarationLayout, parseDeclarartion } from './project-tree-declaration-node/declaration-parser';
import { AccessCpnService } from '../services/access-cpn.service';
import { SettingsService } from '../services/settings.service';

@Component({
  selector: 'app-project-tree',
  templateUrl: './project-tree.component.html',
  styleUrls: ['./project-tree.component.scss']
})
export class ProjectTreeComponent implements OnInit, DoCheck {

  public nodeToArray = nodeToArray;
  public JSON = JSON;
  public alert = alert;

  public project;
  public cpnet;
  public expanded;
  public subpages;
  public pages;

  public selected;
  public selectedOld;

  public errors = [];

  public mouseover = { id: undefined };

  // public contextmenu = false;
  // public contextmenuX = 0;
  // public contextmenuY = 0;

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
    if (this.selectedOld.id !== this.selected.id) {
      this.selectedOld = cloneObject(this.selected);
      this.onSelectedChange();
    }
  }

  reset() {
    this.expanded = [];
    this.subpages = [];
    this.pages = [];

    this.selected = { type: undefined, id: undefined, cpnElement: undefined };
    this.selectedOld = { id: undefined };

    this.expanded['pages'] = true;
    this.expanded['project'] = true;
  }

  loadProject() {
    this.reset();

    this.cpnet = this.modelService.getCpn();
    this.project = this.modelService.getProject();
    this.loadPages();

    // setTimeout(() => this.goToDeclaration('id89457845'), 100);
    setTimeout(() => this.goToFirstPage(), 100);
  }

  updateErrors() {
    this.errors = this.accessCpnService.getErrorData() || [];
    // for (const id in this.accessCpnService.getErrorData()) {
    //   this.errors.push(id);
    // }

    console.log(this.constructor.name, 'updateErrors(), this.errors = ', this.errors);
  }

  loadPages() {
    this.pages = nodeToArray(this.cpnet.page);
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

    switch (this.selected.type) {
      case 'page':
        this.eventService.send(Message.PAGE_OPEN, { pageObject: this.selected.cpnElement });
        break;
      case 'monitor':
        this.eventService.send(Message.MONITOR_OPEN, { monitorObject: this.selected.cpnElement });
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

      this.selected.id = page._id;
      this.selected.type = 'page';
      this.selected.cpnElement = page;

      const inputElem = document.getElementById(this.selected.id);
      console.log(this.constructor.name, 'goToFirstPage(), inputElem = ', inputElem);
      if (inputElem) {
        inputElem.focus();
      }
    }
  }

  goToDeclaration(id) {
    if (this.cpnet && this.cpnet.globbox) {
      console.log(this.constructor.name, 'goToDeclaration(), id = ', id);
      const blocksToExpand = [];
      const blocks = nodeToArray(this.cpnet.globbox.block);
      for (const block of blocks) {
        let isBlockExpanded = false;
        for (const globref of nodeToArray(block.globref)) {
          if (globref._id === id) {
            this.selected.id = globref._id;
            this.selected.type = 'globref';
            this.selected.cpnElement = globref;
            isBlockExpanded = true;
            console.log(this.constructor.name, 'goToDeclaration(), id = ', id);
          }
        }
        if (isBlockExpanded) {
          this.expanded['declarations'] = true;
          this.expanded[block._id] = true;
        }
      }

      const inputElem = document.getElementById(id);
      console.log(this.constructor.name, 'goToDeclaration(), inputElem = ', inputElem);
      if (inputElem) {
        inputElem.focus();
      }
    }
  }

  contextMenu(event: MouseEvent) {
    console.log(this.constructor.name, 'contextMenu(), event = ', event);

    const menuElement: HTMLElement = document.getElementById('contextMenu');

    console.log(this.constructor.name, 'contextMenu(), menuElement = ', menuElement);

    menuElement.style.display = 'block';
    menuElement.style.position = 'absolute';
    menuElement.style.left = event.x + 'px';
    menuElement.style.top = (event.y - 60) + 'px';
  }

  hideContextMenu() {
    const menuElement: HTMLElement = document.getElementById('contextMenu');

    if (menuElement.style.display !== 'none') {
      menuElement.style.display = 'none';
      return true;
    }
    return false;
  }

  //activates the menu with the coordinates
  onRightClick(event) {
    // this.contextmenuX = event.clientX;
    // this.contextmenuY = event.clientY; // - 50;
    // this.contextmenu = true;

    console.log(this.constructor.name, 'onrightClick, event = ', event);
  }
  //disables the menu
  disableContextMenu() {
    // this.contextmenu = false;
  }

  onKeyDown(event: KeyboardEvent) {
    console.log(this.constructor.name, 'onKeyDown(), event = ', event);

    if (event.code === 'Insert') {
      event.preventDefault();

      console.log(this.constructor.name, 'onKeyDown(), INSERT PRESSED');

      this.onNewDeclaration();
    }
  }

  onNewDeclaration() {
    this.disableContextMenu();

    console.log(this.constructor.name, 'onNewDeclaration(), this.selected = ', this.selected);

    const newDeclaration = this.modelService.newDeclaration(this.selected.parentCpnElement, this.selected, this.selected.type);
    if (newDeclaration) {
      setTimeout(() => this.goToDeclaration(newDeclaration._id), 100);
    }
  }

  onNewBlock() {
    this.disableContextMenu();

    console.log(this.constructor.name, 'onNewBlock(), this.selected = ', this.selected);

    if (this.selected) {

      let parentElement = undefined;

      switch (this.selected.type) {
        case 'declarations':
          parentElement = this.cpnet.globbox;
          break;

        case 'block':
          parentElement = this.selected.cpnElement;
          break;

        case 'globref':
        case 'color':
        case 'var':
        case 'ml':
          parentElement = this.selected.parentCpnElement;
          break;
      }

      // if (this.selected.type === 'declarations') {
      //   parentElement = this.cpnet.globbox;
      // }
      // if (this.selected.type === 'block') {
      //   parentElement = this.selected.cpnElement;
      // }
      // if (['globref', 'color', 'var', 'ml'].includes(this.selected.type)) {
      //   parentElement = this.selected.parentCpnElement;
      // }

      if (parentElement) {
        const newBlock = { id: 'New block', _id: getNextId() };
        this.modelService.addCpnElement(parentElement, newBlock, 'block');
        setTimeout(() => this.goToDeclaration(newBlock._id), 100);
      }
    }
  }

  onNewPage() {
    this.disableContextMenu();

    const defValue = this.settings.getAppSettings()['page'];
    const cpnElement = this.modelService.createCpnPage(defValue + ' ' + (++this.newPageCount), undefined);

    const cpnet = this.modelService.getCpn();
    this.modelService.addCpnElement(cpnet, cpnElement, 'page');
    this.modelService.updateInstances();
  }

  // Toolbar action handlers
  onNewNode() {
    console.log(this.constructor.name, 'onNewNode()');

    if (this.selected && this.selected.type) {
      console.log(this.constructor.name, 'onNewNode(), this.selected = ', this.selected);

      switch (this.selected.type) {
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
    this.disableContextMenu();
    console.log(this.constructor.name, 'onDeleteNode(), this.selected = ', this.selected);

    if (this.selected
      && this.selected.parentCpnElement
      && ['globref', 'color', 'var', 'ml', 'block', 'page'].includes(this.selected.type)) {

      this.modelService.removeCpnElement(this.selected.parentCpnElement, this.selected.cpnElement, this.selected.type);
    }
  }

  onUpNode() {
    console.log(this.constructor.name, 'onUpNode()');

    if (this.selected
      && this.selected.parentCpnElement
      && ['globref', 'color', 'var', 'ml', 'block', 'page'].includes(this.selected.type)) {

      this.modelService.moveCpnElement(this.selected.parentCpnElement, this.selected.cpnElement, this.selected.type, 'up');
    }
  }

  onDownNode() {
    console.log(this.constructor.name, 'onDownNode()');

    if (this.selected
      && this.selected.parentCpnElement
      && ['globref', 'color', 'var', 'ml', 'block', 'page'].includes(this.selected.type)) {

      this.modelService.moveCpnElement(this.selected.parentCpnElement, this.selected.cpnElement, this.selected.type, 'down');
    }
  }

}
