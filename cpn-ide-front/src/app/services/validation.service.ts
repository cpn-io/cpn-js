import { Injectable, OnInit, OnDestroy } from "@angular/core";
import { EventService } from "./event.service";
import { ModelService } from "./model.service";
import { Message } from "../common/message";
import { AccessCpnService } from "../services/access-cpn.service";
import { cloneObject, objectsEqual } from "../common/utils";
import { Observable, timer } from "rxjs";
import { IpcService } from "./ipc.service";

const deepEqual = require("deep-equal");
const diff = require("deep-diff").diff;

@Injectable()
export class ValidationService implements OnDestroy {
  VALIDATION_TIMEOUT = 200;
  timeTimer: Observable<number>;
  timeTimerSubscribtion;

  public isAutoValidation = false;

  geometryKeyList = [
    "aux",
    "token",
    "marking",
    "posattr",
    "fillattr",
    "lineattr",
    "textattr",
    "box",
    "ellipse",
    "bendpoint",
  ];

  // workspaceElements.cpnet.page.pageattr._name.

  nobackupKeyList = [
    "bendpoint",
    "bendpoint.0._id",
    "bendpoint.1._id",
    "bendpoint.2._id",
    "bendpoint.3._id",
    "bendpoint.4._id",
    "bendpoint.5._id",
    "bendpoint.6._id",
  ];

  needValidation = false;
  needCheckValidation = false;
  lastProjectData = {};
  checkValidationBusy = false;
  checkValidationScheduled = false;

  private MAX_SIZE = 1000;
  history = {
    models: [],
    currentModelIndex: 0,
    backupBusy: false,
    undoRedoBusy: false,
  };

  constructor(
    private eventService: EventService,
    private modelService: ModelService,
    private accessCpnService: AccessCpnService,
    private ipcService: IpcService
  ) {
    this.eventService.on(Message.PROJECT_LOAD, (event) => {
      this.init();
      this.validate();
      this.clearHistory();
    });
    this.eventService.on(Message.PROJECT_LOAD, () => this.init());
    this.eventService.on(Message.MODEL_RELOAD, () => this.init());
    this.eventService.on(Message.PROJECT_SAVED, () => this.clearHistory());
    this.eventService.on(Message.MAIN_MENU_NEW_PROJECT, () =>
      this.clearHistory()
    );

    // Check validation after 200 ms.
    // Any check will at the end check the validation again after 200 ms, which keeps the checking alive.
    // In this scheme, the time needed by the check is not part of the 200 ms.
    this.checkValidationLater();
    // This scheme checks validation every 200 ms. If the check takes more than 200 ms, the tool may become unresponsive.
    // this.timeTimer = timer(this.VALIDATION_TIMEOUT, this.VALIDATION_TIMEOUT);
    // this.timeTimerSubscribtion = this.timeTimer.subscribe(() =>
    //   this.checkValidation()
    // );
  }

  ngOnDestroy() {
    console.log(this.constructor.name, "ngOnDestroy()");
    this.timeTimerSubscribtion.unsubscribe();
  }

  init() {
    this.needValidation = false;
    this.lastProjectData = {};
  }

  /**
   * public method for setting validation flag
   */
  public validate() {
    if (!this.accessCpnService.isSimulation) {
      this.needValidation = true;
    }
  }

  filterDifferences(differences, wordList) {
    return differences.filter((d) => {
      if (!d.path) {
        return false;
      }
      for (const key of d.path) {
        if (wordList.includes(key)) {
          return false;
        }
      }
      return true;
    });
  }

  // Check the validation after 200 ms.
  checkValidationLater() {
    this.timeTimer = timer(this.VALIDATION_TIMEOUT);
    this.timeTimerSubscribtion = this.timeTimer.subscribe(() =>
      this.checkValidation()
    );
  }

  checkValidation() {
    if (this.accessCpnService.isSimulation) {
      this.checkValidationLater();
      return;
    }

    // console.log("checkValidation()");

    if (this.history.undoRedoBusy) {
      return;
    }
    if (this.checkValidationBusy) {
      return;
    }
    this.checkValidationBusy = true;

    const startTime = new Date().getTime();
    // console.log('START checkValidation(), startTime = ', startTime);

    // ------------------------------------------------------------------------------------------------------------

    const projectData = cloneObject(this.modelService.getProjectData()) || {};
    const deepEqualResult = objectsEqual(this.lastProjectData, projectData);

    if (!deepEqualResult) {
      const differences = diff(this.lastProjectData, projectData);
      console.log(
        this.constructor.name,
        "checkValidation(), differences = ",
        differences
      );

      if (differences && differences.length > 0) {
        const noGeometryChangeList = this.filterDifferences(
          differences,
          this.geometryKeyList
        );
        const backupChangeList = this.filterDifferences(
          differences,
          this.nobackupKeyList
        );

        console.log(
          this.constructor.name,
          "checkValidation(), differences, noGeometryChangeList = ",
          noGeometryChangeList
        );
        console.log(
          this.constructor.name,
          "checkValidation(), differences, backupChangeList = ",
          backupChangeList
        );

        if (noGeometryChangeList.length > 0) {
          this.validate();
        }

        if (backupChangeList.length > 0) {
          if (Object.keys(this.lastProjectData).length !== 0) {
            // console.log('HISTORY SAVE 2');
            this.archiveModelToHistory(this.lastProjectData);
            this.eventService.send(Message.MODEL_SAVE_BACKUP);
          }
        }

        for (const dif of differences) {
          this.eventService.send(Message.MODEL_CHANGED_DETAILS, {
            changesPath: JSON.stringify(dif.path),
          });
        }

        this.lastProjectData = cloneObject(projectData);
      }
    }

    // ------------------------------------------------------------------------------------------------------------

    const validationTime = new Date().getTime() - startTime;
    if (validationTime > 500) {
      console.error("END checkValidation(), validationTime = ", validationTime);
    } else if (validationTime > 200) {
      console.warn("END checkValidation(), validationTime = ", validationTime);
    } else if (validationTime > 100) {
      console.log("END checkValidation(), validationTime = ", validationTime);
    }


    if (this.needValidation && this.isAutoValidation) {
      this.needValidation = false;
      // this.eventService.send(Message.SERVER_INIT_NET, {projectData: this.modelService.getProjectData(), complexVerify: false});
      this.accessCpnService.initNet(this.modelService.getProjectData());
    }

    this.checkValidationBusy = false;
    // Check the validation again after 200 ms.
    this.checkValidationLater();
  }

  archiveModelToHistory(model: any, hiddenPush?) {
    if (hiddenPush) {
      this.history.models.push(model);
      // console.log("[validation.services.ts] History after undo", cloneObject(this.history));
      return;
    }

    if (this.history.backupBusy) {
      return;
    }
    this.history.backupBusy = true;
    // console.log('HISTORY ARCH', model);
    if (this.history.models.length > this.history.currentModelIndex) {
      this.history.models.splice(this.history.currentModelIndex);
    }
    if (this.history.models.length > this.MAX_SIZE - 1) {
      this.history.models.splice(0, 1);
      --this.history.currentModelIndex;
    }

    this.history.models.push(model);
    this.history.currentModelIndex++;
    if (this.history.models.length !== this.history.currentModelIndex) {
      console.error(
        `History index is wrong! index:${this.history.currentModelIndex} and history.array size is: ${this.history.models.length}`
      );
    }
    this.ipcService.send(Message.MODEL_SAVE_BACKUP);
    this.history.backupBusy = false;
    // console.log("[validation.services.ts] History after push", cloneObject(this.history));
  }

  undo() {
    if (this.history.undoRedoBusy) {
      return;
    }
    if (this.history.currentModelIndex === this.history.models.length) {
      if (Object.keys(this.lastProjectData).length !== 0) {
        // No need to clone the lastProjectData, as it is cold (does not change). 
        this.archiveModelToHistory(this.lastProjectData, true);
      }
    }
    this.history.undoRedoBusy = true;
    const model = this.getPreviousModelFromHistory();
    // console.log('HISTORY UNDO', model);
    if (model) {
      // Clone the model, as it is hot (may change).
      const clonedModel = cloneObject(model);
      this.modelService.projectData = clonedModel;
      this.modelService.project = {
        data: clonedModel,
        name: this.modelService.projectName,
      };
      this.eventService.send(Message.MODEL_RELOAD);
    }
    this.history.undoRedoBusy = false;
    // console.log("[validation.services.ts] History after undo", cloneObject(this.history));
  }

  redo() {
    if (this.history.undoRedoBusy) {
      return;
    }
    this.history.undoRedoBusy = true;

    const model = this.getNextModelFromHistory();
    // console.log('HISTORY REDO', model);
    if (model) {
      // Clone the model, as it is hot (may change).
      const clonedModel = cloneObject(model);
      this.modelService.projectData = clonedModel;
      this.modelService.project = {
        data: clonedModel,
        name: this.modelService.projectName,
      };
      this.eventService.send(Message.MODEL_RELOAD);
    }
    this.history.undoRedoBusy = false;
    // console.log("[validation.services.ts] History after redo", cloneObject(this.history));
  }

  getPreviousModelFromHistory() {
    if (this.history.models[this.history.currentModelIndex - 1]) {
      // Unclear why we're setting this.lastPorjectData here.
      // A MODEL_RELOAD will follow, which will set it to {} anyway.
      // if (this.history.models[this.history.currentModelIndex - 2]) {
      //   this.lastProjectData = this.history.models[
      //     this.history.currentModelIndex - 2
      //   ];
      // } else {
      //   this.lastProjectData = this.history.models[
      //     this.history.currentModelIndex - 1
      //   ];
      // }
      return this.history.models[--this.history.currentModelIndex];
    }
    return null;
  }

  getNextModelFromHistory() {
    if (this.history.models[this.history.currentModelIndex + 1]) {
      // Unclear why we're setting this.lastPorjectData here.
      // A MODEL_RELOAD will follow, which will set it to {} anyway.
      // this.lastProjectData = this.history.models[
      //   this.history.currentModelIndex
      // ];
      return this.history.models[++this.history.currentModelIndex];
    }
    return null;
  }

  clearHistory() {
    const interval = setInterval(() => {
      if (!this.history.undoRedoBusy) {
        this.history.models = [];
        this.history.currentModelIndex = 0;
        clearInterval(interval);
        this.eventService.send(Message.MODEL_SAVE_BACKUP);
        this.ipcService.send(Message.PROJECT_SAVED);
      }
    }, 100);
    setTimeout(() => {
      clearInterval(interval);
      // console.error('Can`t clear history buffer', interval);
    }, 60000);
  }
}
