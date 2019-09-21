import { Component, OnInit, Input } from '@angular/core';
import { nodeToArray } from '../../common/utils';

@Component({
  selector: 'app-project-tree-options-node',
  templateUrl: './project-tree-options-node.component.html',
  styleUrls: ['./project-tree-options-node.component.scss']
})
export class ProjectTreeOptionsNodeComponent implements OnInit {

  public nodeToArray = nodeToArray;
  public console = console;

  @Input() public optionList: any;
  @Input() public expanded: any;
  @Input() public selected: any;

  constructor() { }

  ngOnInit() {
  }

}
