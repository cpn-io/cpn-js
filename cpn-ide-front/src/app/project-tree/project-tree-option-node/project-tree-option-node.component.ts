import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-project-tree-option-node',
  templateUrl: './project-tree-option-node.component.html',
  styleUrls: ['./project-tree-option-node.component.scss']
})
export class ProjectTreeOptionNodeComponent implements OnInit {

  @Input() public tree: any = {};
  @Input() public option: any = {};

  constructor() { }

  ngOnInit() {
  }

  onSelected() {
    this.tree.selected.id = this.option._name;
    this.tree.selected.type = 'option';
    this.tree.selected.cpnElement = this.option;
  }

}
