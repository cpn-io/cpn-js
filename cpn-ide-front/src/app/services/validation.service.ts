import { Injectable, OnInit, OnDestroy } from '@angular/core';
import { EventService } from './event.service';
import { ModelService } from './model.service';
import { Message } from '../common/message';
import { AccessCpnService } from '../services/access-cpn.service';
import { cloneObject, objectsEqual } from '../common/utils';
import { Observable, timer } from 'rxjs';

const deepEqual = require('deep-equal');
const diff = require('deep-diff').diff;

@Injectable()
export class ValidationService implements OnDestroy {

  VALIDATION_TIMEOUT = 1000;
  timeTimer: Observable<number>;
  timeTimerSubscribtion;

  public isAutoValidation = false;

  geometryKeyList = [
    'aux',
    'token',
    'marking',
    'posattr',
    'fillattr',
    'lineattr',
    'textattr',
    'box',
    'ellipse',
    'bendpoint'
  ];

  // workspaceElements.cpnet.page.pageattr._name.

  nobackupKeyList = [
    'bendpoint',
    'bendpoint.0._id',
    'bendpoint.1._id',
    'bendpoint.2._id',
    'bendpoint.3._id',
    'bendpoint.4._id',
    'bendpoint.5._id',
    'bendpoint.6._id',
  ];

  needValidation = false;
  needCheckValidation = false;
  lastProjectData = {};
  checkValidationBusy = false;
  checkValidationScheduled = false;

  constructor(
    private eventService: EventService,
    private modelService: ModelService,
    private accessCpnService: AccessCpnService) {

    this.eventService.on(Message.PROJECT_LOAD, (event) => {
      this.init();
      this.validate();
    });
    this.eventService.on(Message.MODEL_RELOAD, () => {
      this.init();
    });

    this.timeTimer = timer(this.VALIDATION_TIMEOUT, this.VALIDATION_TIMEOUT);
    this.timeTimerSubscribtion = this.timeTimer.subscribe(() => this.checkValidation());
  }

  ngOnDestroy() {
    console.log(this.constructor.name, 'ngOnDestroy()');
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

  checkValidation() {
    if (this.accessCpnService.isSimulation) {
      return;
    }

    // console.log('checkValidation()');

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
      console.log(this.constructor.name, 'differences = ', differences);

      if (differences && differences.length > 0) {
        const noGeometryChangeList = this.filterDifferences(differences, this.geometryKeyList);
        const backupChangeList = this.filterDifferences(differences, this.nobackupKeyList);

        console.log(this.constructor.name, 'differences, noGeometryChangeList = ', noGeometryChangeList);
        console.log(this.constructor.name, 'differences, backupChangeList = ', backupChangeList);

        if (noGeometryChangeList.length > 0) {
          this.validate();
        }

        if (backupChangeList.length > 0) {
          this.eventService.send(Message.MODEL_SAVE_BACKUP, { lastProjectData: this.lastProjectData });
        }

        for (const dif of differences) {
          this.eventService.send(Message.MODEL_CHANGED_DETAILS, { changesPath: JSON.stringify(dif.path) });
        }

        this.lastProjectData = cloneObject(projectData);
      }
    }

    // ------------------------------------------------------------------------------------------------------------

    const validationTime = new Date().getTime() - startTime;
    if (validationTime > 10) {
      console.log('END checkValidation(), validationTime = ', validationTime);
    }

    if (this.needValidation && this.isAutoValidation) {
      this.needValidation = false;
      this.eventService.send(Message.SERVER_INIT_NET, { projectData: this.modelService.getProjectData(), complexVerify: false });
    }

    this.checkValidationBusy = false;
  }
}
