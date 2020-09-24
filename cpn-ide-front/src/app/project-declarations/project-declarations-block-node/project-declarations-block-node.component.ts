import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { nodeToArray } from '../../common/utils';
import { ITreeNode } from '../../project-tree/tree-node/tree-node';
import { TreeData } from '../../project-tree/project-tree.component';

@Component({
  selector: 'app-project-declarations-block-node',
  templateUrl: './project-declarations-block-node.component.html',
  styleUrls: ['./project-declarations-block-node.component.scss']
})
export class ProjectDeclarationsBlockNodeComponent implements OnInit, ITreeNode {
  public nodeToArray = nodeToArray;


  @Input() public tree: TreeData;
  @Input() public declarationType: any;
  @Input() public parentBlock: any;
  @Input() public block: any;
  @Input() public containerId: any;

  @Input() showBullet = true;
  @Input() listener: any;
  @Output() contextMenu = new EventEmitter();
  constructor() { }

  ngOnInit() {

  }

  hasBlocks() {
    if (nodeToArray(this.block.block).length > 0) {
      return true;
    } else if (nodeToArray(this.block.monitorblock).length > 0) {
      return true;
    }
  }

  hasDeclarations() {
    if (this.declarationType) {
      if (this.declarationType === 'all' &&
        (nodeToArray(this.block.globref).length > 0
          || nodeToArray(this.block.color).length > 0
          || nodeToArray(this.block.var).length > 0
          || nodeToArray(this.block.ml).length > 0)) {
        return true;
      }

      if (this.declarationType === 'globref' && nodeToArray(this.block.globref).length > 0) {
        return true;
      }
      if (this.declarationType === 'color' && nodeToArray(this.block.color).length > 0) {
        return true;
      }
      if (this.declarationType === 'var' && nodeToArray(this.block.var).length > 0) {
        return true;
      }
      if (this.declarationType === 'ml' && nodeToArray(this.block.ml).length > 0) {
        return true;
      }
    }
    return false;
  }

  onSelect() {
    this.tree.selected.treeNodeComponent = this;
    this.tree.selected.parentCpnElement = this.parentBlock;
    if (this.block) {
      this.tree.selected.id = this.block._id;
      this.tree.selected.type = 'block';
      this.tree.selected.cpnElement = this.block;
    }
  }
  onClick() {
    throw new Error("Method not implemented.");
  }
  onExpand() {
    throw new Error("Method not implemented.");
  }
  onContextMenu(event: any) {
    throw new Error("Method not implemented.");
  }
  onKeydown(event: any) {
    throw new Error("Method not implemented.");
  }
  onUpdate(event: any) {
    throw new Error("Method not implemented.");
  }
  onNew(event: any) {
    throw new Error("Method not implemented.");
  }
  onDelete(event: any) {
    throw new Error("Method not implemented.");
  }
  onUp(event: any) {
    throw new Error("Method not implemented.");
  }
  onDown(event: any) {
    throw new Error("Method not implemented.");
  }

  onNewElement(event, type, block) {
    console.log('onNewElement');
    if (this.contextMenu.observers.length > 0)
      this.contextMenu.emit({event: event, type: type, block: block});
    else
      this.listener.emit({event: event, type: type, block: block});
  }

}
