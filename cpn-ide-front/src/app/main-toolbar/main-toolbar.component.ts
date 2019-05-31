import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../services/project.service';
import { AppVersion } from '../app.version';
import { ModelService } from '../services/model.service';
import { EventService } from '../services/event.service';
import { Message } from '../common/message';
import { ValidationService } from '../services/validation.service';
import { AccessCpnService } from '../services/access-cpn.service';
@Component({
  selector: 'app-main-toolbar',
  templateUrl: './main-toolbar.component.html',
  styleUrls: ['./main-toolbar.component.scss']
})
export class MainToolbarComponent implements OnInit {

  version = AppVersion.buildVersion;
  isStart;
  constructor(
    private projectService: ProjectService,
    private modelService: ModelService,
    private eventService: EventService,
    private validationService: ValidationService,
    private accessCpnService: AccessCpnService
    ) {
  }

  ngOnInit() {
    this.accessCpnService.setIsSimulation(false);
  }


  onDoStep() {
    this.accessCpnService.doStep();
  }

  onStartSimulation() {
    this.isStart = true;
    this.accessCpnService.initSim();
    this.eventService.on(Message.SERVER_INIT_SIM_DONE, (data) => {
      if (this.isStart) {
        this.accessCpnService.setIsSimulation(true);
      }
      this.isStart = false;
    });
  }

  onStopSimulation() {
    this.accessCpnService.setIsSimulation(false);
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
}
