import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../services/project.service';
import { AppVersion } from '../app.version';
import { ModelService } from '../services/model.service';
import { EventService } from '../services/event.service';
import { Message } from '../common/message';

@Component({
  selector: 'app-main-toolbar',
  templateUrl: './main-toolbar.component.html',
  styleUrls: ['./main-toolbar.component.scss']
})
export class MainToolbarComponent implements OnInit {

  version = AppVersion.buildVersion;

  constructor(
    private projectService: ProjectService,
    private modelService: ModelService,
    private eventService: EventService) {
  }

  ngOnInit() {
  }

  newCPNet() {
    this.projectService.loadEmptyProject();
  }

  undoChanges() {
    this.modelService.cancelModelChanges('undo');
  }

  redoChanges() {
    this.modelService.cancelModelChanges('redo');
  }

  fullScreen() {
    this.eventService.send(Message.MODEL_EDITOR_FULLSCREEN, {});
  }

  openProject() {
  }

  verify() {
    // verify loaded project
    this.eventService.send(Message.SERVER_INIT_NET, { projectData: this.modelService.getProjectData() });
  }
}
