import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-project-explorer-toolbar',
  templateUrl: './project-explorer-toolbar.component.html',
  styleUrls: ['./project-explorer-toolbar.component.scss']
})
export class ProjectExplorerToolbarComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

  uploadFile(event) {
    console.log('uploadFile(), event = ', JSON.stringify(event));
  }
}
