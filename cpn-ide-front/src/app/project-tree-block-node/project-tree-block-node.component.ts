import { Component, OnInit, Input } from '@angular/core';
import { nodeToArray } from '../common/utils';

@Component({
  selector: 'app-project-tree-block-node',
  templateUrl: './project-tree-block-node.component.html',
  styleUrls: ['./project-tree-block-node.component.scss']
})
export class ProjectTreeBlockNodeComponent implements OnInit {

  public nodeToArray = nodeToArray;

  @Input() block: object;
  @Input() expanded: object;
  @Input() selected: object;

  constructor() { }

  ngOnInit() {
  }

  onUpdateGlobref(value) {
    console.log(this.constructor.name, 'onUpdateGlobref(), value = ', value);
  }

  onUpdateColor(value) {
    console.log(this.constructor.name, 'onUpdateColor(), value = ', value);
  }

  onUpdateVar(value) {
    console.log(this.constructor.name, 'onUpdateVar(), value = ', value);
  }

  onUpdateMl(value) {
    console.log(this.constructor.name, 'onUpdateMl(), value = ', value);
  }
}
