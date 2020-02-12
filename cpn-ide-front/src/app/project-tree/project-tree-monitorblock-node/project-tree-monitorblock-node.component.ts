import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {getNextId, nodeToArray} from '../../common/utils';
import {TreeData} from '../project-tree.component';
import {AccessCpnService} from '../../services/access-cpn.service';
import {EventService} from '../../services/event.service';
import {ITreeNode} from '../tree-node/tree-node';
import {ModelService} from '../../services/model.service';
import {SettingsService} from '../../services/settings.service';

@Component({
  selector: 'app-project-tree-monitorblock-node',
  templateUrl: './project-tree-monitorblock-node.component.html',
  styleUrls: ['./project-tree-monitorblock-node.component.scss']
})
export class ProjectTreeMonitorblockNodeComponent implements OnInit, ITreeNode {

  public nodeToArray = nodeToArray;

  @Input() public monitorblock: any;
  @Input() public tree: TreeData;
  @Input() public parentBlock: any;


  @Output() contextmenuAction = new EventEmitter();

  type = 'monitorblock';

  constructor(private accessCpnService: AccessCpnService,
              private eventService: EventService,
              private modelService: ModelService,
              private settings: SettingsService) {
  }

  ngOnInit() {
  }


  onKeydown(event: KeyboardEvent) {
    if (event.shiftKey) {
      switch (event.code) {
        case 'Insert':
          event.preventDefault();
          // this.onNewBlock();
          break;
        case 'Delete':
          event.preventDefault();
          // this.onDeleteBlock();
          break;
        case 'ArrowUp':
          event.preventDefault();
          // this.onUp();
          break;
        case 'ArrowDown':
          event.preventDefault();
          // this.onDown();
          break;
      }
    }
  }

  onUpdate(event) {
    this.monitorblock._name = event.target.textContent;
  }

  onSelect() {
    this.setSelected(this.parentBlock, this.monitorblock, this.type);
  }

  setSelected(cpnParentElement, cpnElement, type) {
  // todo
    // this.tree.selected.treeNodeComponent = this;
    //
    // this.tree.selected.parentCpnElement = cpnParentElement;
    // this.tree.selected.id = cpnElement._id;
    // this.tree.selected.type = type;
    // this.tree.selected.cpnElement = cpnElement;
    //
    // this.eventService.send(Message.TREE_SELECT_DECLARATION_NODE_NEW, {
    //   cpnType: type,
    //   cpnElement: cpnElement,
    //   cpnParentElement: cpnParentElement
    // });
  }

  onClick() {

  }

  onContextMenu(event) {
    if (this.tree && this.tree.contextMenu) {

      event.preventDefault();
      const entries = [];

      entries.push({ title: 'New block', action: () => this.onNew(), iconClass: 'fas fa-cube' });
      if (this.modelService.bufferNode){
        entries.push({ title: 'Paste', action: () => this.onPasteNode(), iconClass: 'fas fa-paste'});
      }
      entries.push({ title: 'separator' });
      entries.push({ title: 'Delete', action: () => this.onDelete(), iconClass: 'fas fa-minus' });

      this.tree.contextMenu.setEntries(entries);
      this.tree.contextMenu.show({ x: event.clientX, y: event.clientY });
    }
  }

  onDelete() {
    this.modelService.deleteFromModel(this.monitorblock);
  }

  onDown(event) {
  }

  onExpand() {
  }

  onNew() {
    const newBlock = {_name: this.settings.appSettings['block'], _id: getNextId()};
    this.modelService.addCpnElement(this.monitorblock, newBlock, 'monitorblock');
    // this.focus(newBlock._id);
  }

  onUp(event) {
  }

  onPasteNode() {
    this.modelService.addCpnElement(this.monitorblock, this.modelService.bufferNode, 'monitor');
    this.modelService.bufferNode = null;
  }
}
