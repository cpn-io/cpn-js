import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../services/project.service';
import { AppVersion } from '../app.version';
import { ModelService } from '../services/model.service';
import { EventService } from '../services/event.service';
import { Message } from '../common/message';
import { ValidationService } from '../services/validation.service';
import { AccessCpnService } from '../services/access-cpn.service';
import { EditorPanelService } from '../services/editor-panel.service';
import { ApplicationService } from '../services/application.service';
import { ElectronService } from 'ngx-electron';
import { IpcService } from '../services/ipc.service';

@Component({
  selector: 'app-main-toolbar',
  templateUrl: './main-toolbar.component.html',
  styleUrls: ['./main-toolbar.component.scss']
})
export class MainToolbarComponent implements OnInit {

  version = AppVersion.buildVersion;
  isStart;
  undo = 0;
  redo = 0;

  constructor(
    private projectService: ProjectService,
    private eventService: EventService,
    private validationService: ValidationService,
    public accessCpnService: AccessCpnService,
    public modelService: ModelService,
    private editorPanelService: EditorPanelService,
    public applicationService: ApplicationService,
    private electronService: ElectronService,
    private ipcService: IpcService
  ) {
  }

  ngOnInit() {
    this.accessCpnService.setIsSimulation(false);

    this.ipcService.on(Message.MAIN_MENU_NEW_PROJECT, () => this.onNewProject());
    this.ipcService.on(Message.MAIN_MENU_OPEN_PROJECT, () => this.openProject());
    // this.ipcService.on(Message.MAIN_MENU_SAVE_PROJECT, () => this.onSaveProject());
    this.eventService.on(Message.MODEL_SAVE_BACKUP, () => this.refreshHistorySteps());
    this.eventService.on(Message.MODEL_RELOAD, () => this.refreshHistorySteps());
  }

  onDoStep() {
    // this.accessCpnService.doStep('ID1412328496');
  }

  onStartSimulation() {
    this.isStart = true;
    this.accessCpnService.initSim();
    this.eventService.on(Message.SERVER_INIT_SIM_DONE, (data) => {
      if (this.isStart) {
        this.accessCpnService.setIsSimulation(true);
        this.eventService.send(Message.SIMULATION_STARTED);
      }
      this.isStart = false;
    });
  }

  onStopSimulation() {
    this.accessCpnService.setIsSimulation(false);
    this.eventService.send(Message.SIMULATION_STOPED);
  }

  onValidate() {
    // this.validationService.validate();
    this.eventService.send(Message.SERVER_INIT_NET, { projectData: this.modelService.getProjectData(), complexVerify: true });
  }

  onValidateAuto() {
    this.validationService.isAutoValidation = this.validationService.isAutoValidation ? false : true;
  }

  onTest() {
    const modelEditor = this.editorPanelService.getSelectedModelEditor();
    console.log(this.constructor.name, 'onTest(), page = ', modelEditor);

    if (modelEditor) {
      modelEditor.testAnimation().then(() => {
        console.log(this.constructor.name, 'onTest(), modelEditor.testAnimation(), COMPLETE');
      });
    }
  }

  onDocumentation() {
    this.applicationService.isShowDocumentation = !this.applicationService.isShowDocumentation;
  }

  onNewProject() {
    this.onStopSimulation();
    this.projectService.loadEmptyProject();
  }

  reloadProject() {
    this.onStopSimulation();

    this.eventService.send(Message.PROJECT_LOAD, { project: this.modelService.getProject() });

    setTimeout(() => this.validationService.validate(), 500);
  }

  fullScreen() {
    this.eventService.send(Message.MODEL_EDITOR_FULLSCREEN, {});
  }

  openProject() {
    this.onStopSimulation();
  }

  getUndo() {
    this.validationService.undo();
  }

  getRedo() {
    this.validationService.redo();
  }

  refreshHistorySteps() {
    this.undo = this.validationService.history.currentModelIndex;
    this.redo = this.validationService.history.models.length - 1 - this.validationService.history.currentModelIndex;
  }
}
