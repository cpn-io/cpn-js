import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-project-tree-option-node',
  templateUrl: './project-tree-option-node.component.html',
  styleUrls: ['./project-tree-option-node.component.scss']
})
export class ProjectTreeOptionNodeComponent implements OnInit {

  @Input() public option: any = {};
  @Input() public expanded: any = [];
  @Input() public selected: any = {};

  constructor() { }

  ngOnInit() {
  }

}
