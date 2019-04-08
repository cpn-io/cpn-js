import {Component, OnInit} from '@angular/core';
import {ProjectService} from '../services/project.service';
import {AppVersion} from "../app.version";
import {ModelService} from '../services/model.service';

@Component({
  selector: 'app-main-toolbar',
  templateUrl: './main-toolbar.component.html',
  styleUrls: ['./main-toolbar.component.scss']
})
export class MainToolbarComponent implements OnInit {

  version = AppVersion.buildVersion;

  constructor(private projectService: ProjectService, private modelService: ModelService) {
  }

  ngOnInit() {
  }

  newCPNet() {
    this.projectService.loadEmptyProject();

  }


  undoChanges() {
    this.modelService.cancelModelChanges();
  }

  openProject() {
    // EmitterService.getAppMessageEmitter().emit(
    //   {
    //     id: Constants.ACTION_PROJECT_OPEN_FILE,
    //     text:"MainToolbarComponent. Open project event!"
    //   });
  }
}
