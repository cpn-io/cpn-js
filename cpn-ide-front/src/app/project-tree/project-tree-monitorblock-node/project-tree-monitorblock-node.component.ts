import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {nodeToArray} from '../../common/utils';
import {TreeData} from '../project-tree.component';
import {AccessCpnService} from '../../services/access-cpn.service';
import {Message} from '../../common/message';
import {EventService} from '../../services/event.service';
import {ITreeNode} from '../tree-node/tree-node';
import {MAT_BUTTON_TOGGLE_DEFAULT_OPTIONS} from '@angular/material';

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
              private eventService: EventService) {
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

  check():boolean{
    console.log('MESSAGE 3',this.parentBlock)
    console.log('MESSAGE 4',this.parentBlock && 1)

    return false;
  }

  onClick() {

  }

  onContextMenu(event) {
    this.contextmenuAction.emit(event);
  }

  onDelete(event) {
  }

  onDown(event) {
  }

  onExpand() {
  }

  onNew(event) {
  }

  onUp(event) {
  }


}
