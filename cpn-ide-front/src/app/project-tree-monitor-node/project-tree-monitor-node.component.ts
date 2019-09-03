import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { nodeToArray } from '../common/utils';

@Component({
  selector: 'app-project-tree-monitor-node',
  templateUrl: './project-tree-monitor-node.component.html',
  styleUrls: ['./project-tree-monitor-node.component.scss']
})
export class ProjectTreeMonitorNodeComponent implements OnInit {

  public nodeToArray = nodeToArray;

  @Input() public monitor: any;
  @Input() public expanded: any;
  @Input() public selected: any;

  constructor() { }

  ngOnInit() {
  }

}
