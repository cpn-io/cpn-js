import { Message } from './../common/message';
import { ModelService } from './../services/model.service';
import { EventService } from './../services/event.service';
import { Component, OnInit, OnChanges, SimpleChanges, DoCheck } from '@angular/core';
import { nodeToArray } from '../common/utils';

@Component({
  selector: 'app-project-tree',
  templateUrl: './project-tree.component.html',
  styleUrls: ['./project-tree.component.scss']
})
export class ProjectTreeComponent implements OnInit, DoCheck {

  public nodeToArray = nodeToArray;
  public JSON = JSON;

  public cpnet;
  public expanded = [];
  public subpages = [];
  public pages = [];

  public selected = { type: undefined, id: undefined };
  public selectedOld = { id: undefined };

  constructor(public eventService: EventService,
    public modelService: ModelService) {

    this.expanded['pages'] = true;
  }

  ngOnInit() {
    this.eventService.on(Message.PROJECT_LOAD, () => this.loadProject());
  }

  ngDoCheck() {
    if (this.selectedOld.id !== this.selected.id) {
      this.selectedOld = JSON.parse(JSON.stringify(this.selected));
      this.onSelectedChange();
    }
  }

  loadProject() {
    this.cpnet = this.modelService.getCpn();
    this.loadPages();
  }

  loadPages() {
    this.pages = nodeToArray(this.cpnet.page);
  }

  onSelectedChange() {
    console.log(this.constructor.name, 'onSelectedChange(), this.selected = ', JSON.stringify(this.selected));

    if (this.selected.type === 'page') {
      this.eventService.send(Message.PAGE_OPEN, { pageObject: this.modelService.getPageById(this.selected.id), subPages: undefined });
    }
  }

  onChange(event) {
    console.log(this.constructor.name, 'onChange(), event = ', event);
  }
}
