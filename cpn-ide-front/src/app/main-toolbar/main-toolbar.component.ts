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
    private eventService: EventService,
    private validationService: ValidationService,
    public accessCpnService: AccessCpnService,
    public modelService: ModelService
  ) {
  }

  ngOnInit() {
    this.accessCpnService.setIsSimulation(false);
  }

  onDoStep() {
    this.accessCpnService.doStep('ID1412328496');
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

  onValidate() {
    // this.validationService.validate();
    this.eventService.send(Message.SERVER_INIT_NET, { projectData: this.modelService.getProjectData(), complexVerify: false });
  }

  newCPNet() {
    this.projectService.loadEmptyProject();
  }

  reloadProject() {
    this.eventService.send(Message.PROJECT_LOAD, { project: this.modelService.getProject() });
    this.validationService.validate();
  }

  fullScreen() {
    this.eventService.send(Message.MODEL_EDITOR_FULLSCREEN, {});
  }

  openProject() {
  }
}
