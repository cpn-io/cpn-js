import { Component, OnInit, Input } from '@angular/core';
import { nodeToArray } from '../../common/utils';

@Component({
  selector: 'app-project-tree-block-node',
  templateUrl: './project-tree-block-node.component.html',
  styleUrls: ['./project-tree-block-node.component.scss']
})
export class ProjectTreeBlockNodeComponent implements OnInit {

  public nodeToArray = nodeToArray;

  @Input() public parentBlock: any;
  @Input() public block: any;
  @Input() public expanded: any;
  @Input() public selected: any;
  @Input() public mouseover: any;

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

}
