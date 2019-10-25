import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-project-tree-toolbar',
  templateUrl: './project-tree-toolbar.component.html',
  styleUrls: ['./project-tree-toolbar.component.scss']
})
export class ProjectTreeToolbarComponent implements OnInit {

  @Output() newNode = new EventEmitter();
  @Output() deleteNode = new EventEmitter();
  @Output() upNode = new EventEmitter();
  @Output() downNode = new EventEmitter();

  filterText = '';

  constructor() { }

  ngOnInit() {
  }

  onNewNode() {
    this.newNode.emit('newNode');
  }

  onDeleteNode() {
    this.deleteNode.emit('deleteNode');
  }

  onUpNode() {
    this.upNode.emit('upNode');
  }

  onDownNode() {
    this.downNode.emit('downNode');
  }

  changeFilter(value) {
    this.filterText = value;
    console.log(this.constructor.name, 'changeFilter(), this.filterText = ', this.filterText);
  }
}
