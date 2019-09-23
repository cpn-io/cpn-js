import { Message } from './../common/message';
import { ModelService } from './../services/model.service';
import { EventService } from './../services/event.service';
import { Component, OnInit, OnChanges, SimpleChanges, DoCheck } from '@angular/core';
import { nodeToArray, cloneObject } from '../common/utils';

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

    setTimeout(() => this.goToDeclaration('id89457845'), 1);
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

  contextMenu(event:MouseEvent) {
    console.log(this.constructor.name, 'contextMenu(), event = ', event);

    const menuElement:HTMLElement = document.getElementById('contextMenu');

    console.log(this.constructor.name, 'contextMenu(), menuElement = ', menuElement);

    menuElement.style.display = 'block';
    menuElement.style.position = 'absolute';
    menuElement.style.left = event.x + 'px';
    menuElement.style.top = (event.y - 60) + 'px';
  }

  hideContextMenu() {
    const menuElement:HTMLElement = document.getElementById('contextMenu');
    menuElement.style.display = 'none';
  }
}
