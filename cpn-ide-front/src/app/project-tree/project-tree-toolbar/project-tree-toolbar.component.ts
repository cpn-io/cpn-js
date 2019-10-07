import { Component, OnInit } from '@angular/core';
import { Constants } from '../../common/constants';

@Component({
  selector: 'app-project-tree-toolbar',
  templateUrl: './project-tree-toolbar.component.html',
  styleUrls: ['./project-tree-toolbar.component.scss']
})
export class ProjectTreeToolbarComponent implements OnInit {

  filterText = '';

  constructor() { }

  ngOnInit() {
  }

  onNewNode() {
  }

  onDeleteNode() {
  }

  onUpNode() {
  }

  onDownNode() {
  }

  changeFilter(value) {
    this.filterText = value;
    console.log(this.constructor.name, 'changeFilter(), this.filterText = ', this.filterText);
  }
}
