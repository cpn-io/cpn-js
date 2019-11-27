import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

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

  @Input() filterText = '';
  @Output() filterChanged = new EventEmitter();


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

  onChangeFilter(value) {
    this.filterText = value;
    console.log(this.constructor.name, 'onChangeFilter(), this.filterText = ', this.filterText);
    this.filterChanged.emit(value);
  }
}
