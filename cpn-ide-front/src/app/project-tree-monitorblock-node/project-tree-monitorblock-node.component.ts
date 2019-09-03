import { Component, OnInit, Input } from '@angular/core';
import { nodeToArray } from '../common/utils';

@Component({
  selector: 'app-project-tree-monitorblock-node',
  templateUrl: './project-tree-monitorblock-node.component.html',
  styleUrls: ['./project-tree-monitorblock-node.component.scss']
})
export class ProjectTreeMonitorblockNodeComponent implements OnInit {

  public nodeToArray = nodeToArray;

  @Input() public monitorblock: any;
  @Input() public expanded: any;
  @Input() public selected: any;

  constructor() { }

  ngOnInit() {
  }

}
