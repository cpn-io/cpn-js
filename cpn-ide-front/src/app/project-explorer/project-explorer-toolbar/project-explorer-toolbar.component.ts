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

  // openProject() {
  //   EmitterService.getAppMessageEmitter().emit({ id: Constants.ACTION_PROJECT_OPEN_FILE, text: "ProjectExplorerToolbarComponent. Open project event!" });
  // }

  uploadFile(event) {
    console.log('uploadFile(), event = ', JSON.stringify(event));
  }
}
