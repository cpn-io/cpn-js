import { Component, OnInit, Input } from '@angular/core';
import { nodeToArray } from '../../common/utils';
import { TreeData } from '../project-tree.component';

@Component({
  selector: 'app-project-tree-options-node',
  templateUrl: './project-tree-options-node.component.html',
  styleUrls: ['./project-tree-options-node.component.scss']
})
export class ProjectTreeOptionsNodeComponent implements OnInit {

  @Input() public tree: TreeData;
  @Input() public optionList: any;

  public nodeToArray = nodeToArray;
  public console = console;

  constructor() { }

  ngOnInit() {
  }

}
