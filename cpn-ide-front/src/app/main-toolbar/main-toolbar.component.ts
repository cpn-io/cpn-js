import {Component, HostListener, OnInit} from '@angular/core';
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
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../common/dialog/dialog.component';

const fileDialog = require('file-dialog');
// const fs = require('fs');

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
    public validationService: ValidationService,
    public accessCpnService: AccessCpnService,
    public modelService: ModelService,
    private editorPanelService: EditorPanelService,
    public applicationService: ApplicationService,
    private electronService: ElectronService,
    private ipcService: IpcService,
    public dialog: MatDialog
  ) {
  }

  ngOnInit() {
    this.accessCpnService.setIsSimulation(false);
    this.ipcService.on(Message.MAIN_MENU_NEW_PROJECT, () => this.onNewProject());
    this.ipcService.on(Message.MAIN_MENU_OPEN_PROJECT, () => this.onOpenProject());
    this.ipcService.on(Message.MAIN_MENU_SAVE_PROJECT, () => {
      const fs =  this.accessCpnService.getFs();
      if (fs) {
        fs.fs.writeFile(fs.path, this.projectService.getStringProjectDataForSave(), err => {
          console.log('Save project error');
        });
      } else {
        this.onSaveProject(false);
      }
    });
    this.ipcService.on(Message.MAIN_MENU_SAVE_AS_PROJECT, () => {
        this.onSaveProject(true);
    });
    this.ipcService.on(Message.MAIN_MENU_UNDO, () => this.getUndo());
    this.ipcService.on(Message.MAIN_MENU_REDO, () => this.getRedo());

    this.eventService.on(Message.MODEL_SAVE_BACKUP, () => this.refreshHistorySteps());
    this.eventService.on(Message.MODEL_RELOAD, () => this.refreshHistorySteps());

    // ipcRenderer.on(Message.MAIN_MENU_OPEN_PROJECT, (event, arg) => {
    //   console.log('Message.MAIN_MENU_OPEN_PROJECT', arg);
    //   this.onOpenProject();
    // });

    this.eventService.on(Message.SERVER_INIT_SIM_DONE, (data) => {
      if (this.isStart) {
        this.accessCpnService.setIsSimulation(true);
        this.eventService.send(Message.SIMULATION_STARTED);
      }
      this.isStart = false;
    });


    const self = this;
    $(document).on('keypress', function (evt) {
      if ((evt.ctrlKey || evt.metaKey) ) {
        if (evt.key.charCodeAt(0) === 26) {
          // evt.preventDefault();
          console.log('ctr z');
          self.getUndo();
        } else if (evt.key.charCodeAt(0) === 25) {
          // evt.preventDefault();
          console.log('ctr y', evt.which);
          self.getRedo();
        }
      }
      return true;
    });
  }

  onDoStep() {
    // this.accessCpnService.doStep('ID1412328496');
  }

  onStartSimulation() {
    this.isStart = true;

    this.accessCpnService.initNet(this.modelService.getProjectData(), true).then(() => {
      this.accessCpnService.initSim();
    });
  }

  onStopSimulation() {
    this.accessCpnService.setIsSimulation(false);
    this.eventService.send(Message.SIMULATION_STOPED);
  }

  onValidate() {
    // this.validationService.validate();
    // this.eventService.send(Message.SERVER_INIT_NET, { projectData: this.modelService.getProjectData(), complexVerify: true });
    this.accessCpnService.initNet(this.modelService.getProjectData(), true);
  }

  onValidateAuto() {
    this.validationService.isAutoValidation = this.validationService.isAutoValidation ? false : true;
  }

  onTest() {
    // const regex = /[^\/]+$/gm;
    // const filename = regex.exec('/home/s-egorov/Downloads/myne skdj fsldkfj  ыврпа ыовра t.cpn');
    // console.log(this.constructor.name, 'onTest(), filename = ', filename);
    // console.log(this.constructor.name, 'onTest(), filename[0] = ', filename[0]);

    const modelEditor = this.editorPanelService.getSelectedModelEditor();
    console.log(this.constructor.name, 'onTest(), page = ', modelEditor);

    if (modelEditor) {
      modelEditor.testAnimation().then(() => {
        console.log(this.constructor.name, 'onTest(), modelEditor.testAnimation(), COMPLETE');
      });
    }

    // if (this.electronService.isElectronApp) {
    //   this.electronService.remote.dialog.showOpenDialog({
    //     properties: ['openFile'],
    //     filters: [{ name: 'CPN models', extensions: ['cpn', 'CPN'] }]
    //   }, (files) => {
    //     if (files !== undefined) {
    //       console.log(this.constructor.name, 'onTest(), electron dialog files, files = ', files);
    //     }

    //     const fs = this.electronService.remote.require('fs');
    //     fs.readFile(files[0], 'utf-8', function (err, data) {
    //       console.log(this.constructor.name, 'onTest(), file data = ', data);
    //     });
    //   });
    // }
  }

  onDocumentation() {
    this.applicationService.isShowDocumentation = !this.applicationService.isShowDocumentation;
  }


  onNewProject() {
    this.onStopSimulation();

    this.checkSaveChanges().then((resolve) => {
      this.projectService.loadEmptyProject();
    });
  }

  onOpenProject() {
    console.log(this.constructor.name, 'onOpenProject(), this = ', this);

    this.onStopSimulation();

    this.checkSaveChanges().then((resolve) => {

      if (this.electronService.isElectronApp) {

        this.electronService.remote.dialog.showOpenDialog({
          properties: ['openFile'],
          filters: [{ name: 'CPN models', extensions: ['cpn', 'CPN'] }]
        }, (files) => {
          if (files !== undefined) {
            console.log(this.constructor.name, 'onOpenProject(), electron dialog files, files = ', files);
          }

          const fullFilePath = files[0];

          // TODO: выделить имя файла без пути!
          const regex = /[^\/^\\]+$/gm;
          const r = regex.exec(fullFilePath);
          const filename = r ? r[0] : undefined;

          if (filename) {
            const fs = this.electronService.remote.require('fs');
            fs.readFile(fullFilePath, 'utf-8', (err, data) => {
              console.log(this.constructor.name, 'onOpenProject(), file data = ', data);
              this.projectService.loadProjectXml(filename, data);
            });
            this.accessCpnService.setFc({fs: fs, path: fullFilePath});
          } else {
            console.error(this.constructor.name, 'onOpenProject(), ERROR filename, f = ', r);
          }

        });

      } else {

        fileDialog({ accept: '.cpn, .CPN' })
          .then(files => {
            console.log(this.constructor.name, 'onOpenProject(), files = ', files);

            if (files.length > 0) {
              const file: File = files[0];
              this.projectService.loadProjectFile(file);
            } else {
              console.error(this.constructor.name, 'NO FILE SELECTED!');
              return;
            }
          });
      }
    });
  }

  onSaveProject(isSaveAs) {
    this.onStopSimulation();
    const fs =  this.accessCpnService.getFs();
    if (fs && !isSaveAs) {
      fs.fs.writeFile(fs.path, this.projectService.getStringProjectDataForSave(), err => {
        console.log('Save project error', err);
      });
    } else {
      if (this.electronService.isElectronApp) {
        this.projectService.saveToFile(this.modelService.projectName);
      } else {
        const dialogRef = this.dialog.open(DialogComponent, {
          width: '500px',
          data: {
            title: 'Save the changes to file',
            input: [{title: 'Filename', value: this.modelService.projectName}]
          }
        });
        dialogRef.afterClosed().subscribe(data => {
          if (data && data.result === DialogComponent.YES) {
            console.log(this.constructor.name, 'onSaveProject(), YES clicked, data = ', data);

            // Save to file
            this.projectService.saveToFile(data.input[0].value);
            this.projectService.setModelName(data.input[0].value);

          }
        });
      }
    }
  }

  checkSaveChanges() {
    return new Promise((resolve, reject) => {

      // if Undo buffer is empty just return
      if (this.validationService.history.currentModelIndex === 0) {
        resolve();
        return;
      }

      // else open save dialog
      const dialogRef = this.dialog.open(DialogComponent, {
        width: '500px',
        data: {
          title: 'Save the changes to file before closing?',
          // input: [{ title: 'Filename', value: this.modelService.projectName }]
        }
      });

      dialogRef.afterClosed().subscribe(data => {
        if (data) {
          console.log(this.constructor.name, 'checkSaveChanges(), data = ', data);

          switch (data.result) {
            case DialogComponent.YES:
              // Save to file
              // this.projectService.saveToFile(data.input[0].value);
              this.projectService.saveToFile(this.modelService.projectName);

              resolve();
              return;
              break;

            case DialogComponent.NO:
              resolve();
              return;
              break;
          }
        }
      });
    });
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
