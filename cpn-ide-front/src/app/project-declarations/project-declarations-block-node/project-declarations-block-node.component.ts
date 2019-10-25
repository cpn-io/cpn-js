import { Component, OnInit, Input } from '@angular/core';
import { nodeToArray } from '../../common/utils';

@Component({
  selector: 'app-project-declarations-block-node',
  templateUrl: './project-declarations-block-node.component.html',
  styleUrls: ['./project-declarations-block-node.component.scss']
})
export class ProjectDeclarationsBlockNodeComponent implements OnInit {

  public nodeToArray = nodeToArray;

  @Input() public declarationType: any;
  @Input() public parentBlock: any;
  @Input() public block: any;
  @Input() public expanded: any;
  @Input() public selected: any;
  @Input() public mouseover: any;

  @Input() showBullet = true;

  constructor() { }

  ngOnInit() {
  }

  onSelected() {
    this.selected.parentCpnElement = this.parentBlock;
    if (this.block) {
      this.selected.id = this.block._id;
      this.selected.type = 'block';
      this.selected.cpnElement = this.block;
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

}
