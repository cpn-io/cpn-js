import { Component, OnInit, Input } from '@angular/core';
import { nodeToArray } from '../../common/utils';
import { ModelService } from '../../services/model.service';
import { AccessCpnService } from '../../services/access-cpn.service';
import { ITreeNode } from '../tree-node/tree-node';
import { EventService } from '../../services/event.service';
import { Message } from '../../common/message';
import { TreeData } from '../project-tree.component';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-project-tree-page-node',
  templateUrl: './project-tree-page-node.component.html',
  styleUrls: ['./project-tree-page-node.component.scss']
})
export class ProjectTreePageNodeComponent implements OnInit, ITreeNode {
  public nodeToArray = nodeToArray;

  @Input() public tree: TreeData;
  @Input() public parentBlock: any;
  @Input() public page: any;
  @Input() public type: any;
  @Input() public containerId: any;

  public newPageCount = 0;

  constructor(private eventService: EventService,
    public modelService: ModelService,
    public accessCpnService: AccessCpnService,
    private settings: SettingsService) { }

  ngOnInit() {
  }

  isFiltered() {
    if (!this.tree.filter || this.tree.filter === '') {
      return true;
    }

    if (this.page && this.page.pageattr._name.toLowerCase().includes(this.tree.filter.toLowerCase())) {
      return true;
    }

    return false;
  }

  hasSubpages() {
    if (this.page) {
      for (const trans of nodeToArray(this.page.trans)) {
        if (trans.subst && trans.subst._subpage) {
          return true;
        }
      }
    }
    return false;
  }

  setSelected(cpnParentElement, cpnElement, type) {
    this.tree.selected.treeNodeComponent = this;

    this.tree.selected.parentCpnElement = cpnParentElement;
    this.tree.selected.id = cpnElement._id;
    this.tree.selected.type = type;
    this.tree.selected.cpnElement = cpnElement;

    this.eventService.send(Message.PAGE_TAB_OPEN, { pageObject: this.tree.selected.cpnElement });
  }

  focus(id) {
    setTimeout(() => {
      if (this.tree && this.containerId) {

        console.log(this.constructor.name, 'focus(), this.containerId = ', this.containerId);

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

  onSelect() {
    this.setSelected(this.parentBlock, this.page, this.type);
  }
  onClick() {
    throw new Error("Method not implemented.");
  }
  onExpand() {
    throw new Error("Method not implemented.");
  }
  onContextMenu(event: any) {
    if (this.tree && this.tree.contextMenu) {
      event.preventDefault();

      const entries = [];

      entries.push({ title: 'New page', action: () => this.onNew(), iconClass: 'fas fa-shapes' });
      entries.push({ title: 'separator' });
      entries.push({ title: 'Delete', action: () => this.onDelete(), iconClass: 'fas fa-minus' });

      this.tree.contextMenu.setEntries(entries);
      this.tree.contextMenu.show({ x: event.clientX, y: event.clientY });
    }
  }
  onKeydown(event: any) {
    console.log(this.constructor.name, 'onKeydown(), event = ', event);

    if (event.shiftKey) {
      switch (event.code) {
        case 'Insert':
          event.preventDefault();
          this.onNew();
          break;
        case 'Delete':
          event.preventDefault();
          this.onDelete();
          break;
        case 'ArrowUp':
          event.preventDefault();
          this.onUp();
          break;
        case 'ArrowDown':
          event.preventDefault();
          this.onDown();
          break;
      }
    }
  }
  onUpdate(event: any) {
    this.page.pageattr._name = event.target.textContent;
    const transitionsArray = this.modelService.getTransListBySubpageId(this.page._id);
    transitionsArray.forEach(elem => {
      elem.subst.subpageinfo.text = event.target.textContent;
      elem.subst.subpageinfo._name = event.target.textContent;
      this.eventService.send(Message.MODEL_UPDATE_DIAGRAM, { cpnElement: elem });
    });
  }
  onNew(event: any = undefined) {
    const defValue = this.settings.appSettings['page'];
    const newPage = this.modelService.createCpnPage(defValue);
    this.modelService.addCpnElement(this.parentBlock, newPage, 'page');
    this.modelService.updateInstances();

    this.focus(newPage._id);
  }
  onDelete(event: any = undefined) {
    console.log(this.constructor.name, 'onDelete(), this.parentBlock, this.page, this.type = ', this.parentBlock, this.page, this.type);
    this.modelService.removeCpnElement(this.parentBlock, this.page, this.type);
    this.modelService.updateInstances();
    this.eventService.send(Message.PAGE_TAB_CLOSE, { id: this.page._id });
  }
  onUp(event: any = undefined) {
    // this.modelService.moveCpnElement(this.parentBlock, this.page, this.type, 'up');
    this.focus(this.page._id);
  }
  onDown(event: any = undefined) {
    // this.modelService.moveCpnElement(this.parentBlock, this.page, this.type, 'down');
    this.focus(this.page._id);
  }

}
