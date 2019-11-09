import { Component, OnInit, Input } from '@angular/core';
import { nodeToArray } from '../../common/utils';
import { AccessCpnService } from '../../services/access-cpn.service';

@Component({
  selector: 'app-project-tree-block-node',
  templateUrl: './project-tree-block-node.component.html',
  styleUrls: ['./project-tree-block-node.component.scss']
})
export class ProjectTreeBlockNodeComponent implements OnInit {

  public nodeToArray = nodeToArray;

  @Input() public parentBlock: any;
  @Input() public block: any;

  @Input() public tree: any;

  @Input() showBullet = true;

  constructor(public accessCpnService: AccessCpnService) { }

  ngOnInit() {
    if (this.tree && this.block && this.parentBlock) {
      this.tree.parents[this.block._id] = this.parentBlock._id;
      this.tree.cpnElements[this.block._id] = this.block;
    }
  }

  onSelected() {
    this.tree.selected.parentCpnElement = this.parentBlock;
    if (this.block) {
      this.tree.selected.id = this.block._id;
      this.tree.selected.type = 'block';
      this.tree.selected.cpnElement = this.block;
    }
  }

}
