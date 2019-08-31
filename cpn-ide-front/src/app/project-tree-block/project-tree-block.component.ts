import { Component, OnInit, Input } from '@angular/core';
import { nodeToArray } from '../common/utils';

@Component({
  selector: 'app-project-tree-block',
  templateUrl: './project-tree-block.component.html',
  styleUrls: ['./project-tree-block.component.scss']
})
export class ProjectTreeBlockComponent implements OnInit {

  public nodeToArray = nodeToArray;

  @Input() block: object;

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
