import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-project-tree-declaration-node',
  templateUrl: './project-tree-declaration-node.component.html',
  styleUrls: ['./project-tree-declaration-node.component.scss']
})
export class ProjectTreeDeclarationNodeComponent implements OnInit {

  @Input() public parentBlock: any;
  @Input() public globref: any;
  @Input() public color: any;
  @Input() public variable: any;
  @Input() public ml: any;

  @Input() public selected: any;

  constructor() { }

  ngOnInit() {
  }

  onUpdate(value) {
    if (this.globref) {
      console.log(this.constructor.name, 'onUpdate(), value, this.globref = ', value, this.globref);
    }
    if (this.color) {
      console.log(this.constructor.name, 'onUpdate(), value, this.color = ', value, this.color);
    }
    if (this.variable) {
      console.log(this.constructor.name, 'onUpdate(), value, this.variable = ', value, this.variable);
    }
    if (this.ml) {
      console.log(this.constructor.name, 'onUpdate(), value, this.ml = ', value, this.ml);
    }
  }

  onSelected() {
    this.selected.parentCpnElement = this.parentBlock;
    if (this.globref) {
      this.selected.id = this.globref._id;
      this.selected.type = 'globref';
      this.selected.cpnElement = this.globref;
    }
    if (this.color) {
      this.selected.id = this.color._id;
      this.selected.type = 'color';
      this.selected.cpnElement = this.color;
    }
    if (this.variable) {
      this.selected.id = this.variable._id;
      this.selected.type = 'var';
      this.selected.cpnElement = this.variable;
    }
    if (this.ml) {
      this.selected.id = this.ml._id;
      this.selected.type = 'ml';
      this.selected.cpnElement = this.ml;
    }
  }

}
