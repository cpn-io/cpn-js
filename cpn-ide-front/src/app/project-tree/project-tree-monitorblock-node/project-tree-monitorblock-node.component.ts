import { Component, OnInit, Input } from '@angular/core';
import { nodeToArray } from '../../common/utils';
import { TreeData } from '../project-tree.component';

@Component({
  selector: 'app-project-tree-monitorblock-node',
  templateUrl: './project-tree-monitorblock-node.component.html',
  styleUrls: ['./project-tree-monitorblock-node.component.scss']
})
export class ProjectTreeMonitorblockNodeComponent implements OnInit {

  public nodeToArray = nodeToArray;

  @Input() public monitorblock: any;
  @Input() public tree: TreeData;

  constructor() { }

  ngOnInit() {
  }

}
