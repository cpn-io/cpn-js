import { Message } from './../common/message';
import { ModelService } from './../services/model.service';
import { EventService } from './../services/event.service';
import { Component, OnInit, OnChanges, SimpleChanges, DoCheck } from '@angular/core';
import { nodeToArray, cloneObject, getNextId, arrayToNode } from '../common/utils';

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

  public mouseover = { id: undefined };

  constructor(public eventService: EventService,
    public modelService: ModelService) {
  }

  ngOnInit() {
    this.reset();

    this.eventService.on(Message.PROJECT_LOAD, () => this.loadProject());
    this.eventService.on(Message.MODEL_RELOAD, () => this.loadProject());
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

    setTimeout(() => this.goToDeclaration('id89457845'), 100);
  }

  loadPages() {
    this.pages = nodeToArray(this.cpnet.page);
  }

  onSelectedChange() {
    console.log(this.constructor.name, 'onSelectedChange(), this.selected = ', JSON.stringify(this.selected));

    switch (this.selected.type) {
      case 'page':
        this.eventService.send(Message.PAGE_OPEN, { pageObject: this.selected.cpnElement, subPages: undefined });
        break;
      case 'monitor':
        this.eventService.send(Message.MONITOR_OPEN, { monitorObject: this.selected.cpnElement });
        break;
    }
  }

  onChange(event) {
    console.log(this.constructor.name, 'onChange(), event = ', event);
  }

  goToDeclaration(id) {
    if (this.cpnet && this.cpnet.globbox) {
      console.log(this.constructor.name, 'goToDeclaration()');
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
    menuElement.style.display = 'none';
  }

  onKeyDown(event: KeyboardEvent) {
    // console.log(this.constructor.name, 'onKeyDown(), event = ', event);
    // console.log(this.constructor.name, 'onKeyDown(), Key.INSERT = ', Key.INSERT);
    if (event.code === 'Insert') {
      event.preventDefault();

      console.log(this.constructor.name, 'onKeyDown(), INSERT PRESSED');
      console.log(this.constructor.name, 'onKeyDown(), this.selected = ', this.selected);

      if (this.selected && this.selected.parentCpnElement) {
        let newValue;
        switch (this.selected.type) {
          case 'globref':
            newValue = 'globref GLOBREF = 1;';
            break;
          case 'color':
            newValue = 'colset TYPE = int;';
            break;
          case 'var':
            newValue = 'var v:int;';
            break;
          case 'ml':
            newValue = 'fun Function';
            break;
        }
        
        if (newValue) {
          const blockCpnElement = this.selected.parentCpnElement;
          const oldCpnType = this.selected.type;
          // node.parent.data.cpnElement = this.modelService.removeCpnElement(cpnParentElement, cpnElement, oldCpnType);

          const newCpnElement = { _id: getNextId() };
          const result = this.modelService.stringToCpnDeclarationElement(newCpnElement, newValue);

          const newCpnType = result.cpnType;

          console.log(this.constructor.name, 'onKeyDown(), result = ', result);

          const declList = nodeToArray(this.selected.parentCpnElement[newCpnType]);
          declList.push(result.cpnElement);
          this.selected.parentCpnElement[newCpnType] = arrayToNode(declList);

          setTimeout(() => this.goToDeclaration(newCpnElement._id), 1000);
        }
      }
    }
  }
}
