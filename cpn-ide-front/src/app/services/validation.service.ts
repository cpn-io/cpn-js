import { Injectable } from '@angular/core';
import { EventService } from './event.service';
import { ModelService } from './model.service';
import { Message } from '../common/message';
import { AccessCpnService } from '../services/access-cpn.service';
@Injectable()
export class ValidationService {

  constructor(
    private eventService: EventService,
    private modelService: ModelService,
    private accessCpnService: AccessCpnService) {

    this.checkValidation();
  }

  VALIDATION_TIMEOUT = 1000;

  needValidation = false;

  lastProjectData = {};

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
    'bendpoint.0._id',
    'bendpoint.1._id',
    'bendpoint.2._id',
    'bendpoint.3._id',
    'bendpoint.4._id',
    'bendpoint.5._id',
    'bendpoint.6._id',
  ];

  geometryChanges = false;
  nobackupChanges = false;

  checkValidationBusy = false;

  /**
   * public method for setting validation flag
   */
  public validate() {
    if (!this.accessCpnService.isSimulation) {
      this.needValidation = true;
    }
  }

  getDiff = (string, diffBy) => string.split(diffBy).join('');

  detectChanges2(projectData) {
    // return (JSON.stringify(this.lastProjectData) !== JSON.stringify(projectData));

    const A = JSON.stringify(this.lastProjectData);
    const B = JSON.stringify(projectData);
    const C = this.getDiff(B, A);

    return (C && C !== '');
  }

  /**
   * Detect changes between two objects
   */
  detectChanges(obj1, obj2, key, path, pathHistory) {
    let isDifferent = false;

    if (key) {
      path = path + key + '.';
    }

    if (!obj1 || !obj2) {
      return isDifferent;
    }

    if (typeof obj1 === 'object' && typeof obj2 === 'object') {

      // if objects are arrays or objects
      if (Object.keys(obj1).length !== Object.keys(obj2).length) {

        pathHistory.push('DIFF KEY COUNT: ' + path);
        isDifferent = true;

      } else {

        for (const k in obj1) {
          if (k in obj2) {
            if (this.detectChanges(obj1[k], obj2[k], k, path, pathHistory)) {
              isDifferent = true;
            }
          } else {
            pathHistory.push('DIFF KEYS: ' + path);
            isDifferent = true;
          }

        }
      }

    } else {

      // if objects are simple values
      if (obj1 !== obj2) {
        pathHistory.push('DIFF VALUES: ' + path);
        isDifferent = true;
      }
    }

    return isDifferent;

  }

  filterChangeList(changeList, wordList) {
    return changeList.filter((p) => {
      for (const w of wordList) {
        if (p.includes(w)) {
          return false;
        }
      }
      return true;
    });
  }

  /**
   * Regular checking validation
   */
  checkValidation() {
    if (this.checkValidationBusy) {
      return;
    }
    this.checkValidationBusy = true;

    const startTime = new Date().getTime();
    if (this.modelService.getProjectData()) {
      // console.log('START detectChanges(), time = ', new Date().getTime(), this.modelService.getProjectData());

      const lastModel = this.lastProjectData;
      const currentModel = JSON.parse(JSON.stringify(this.modelService.getProjectData()));
      // const currentModel = this.modelService.getProjectData();

      this.geometryChanges = false;
      this.nobackupChanges = false;

      const path = '';
      const changeList = [];

      this.detectChanges(lastModel, currentModel, undefined, path, changeList);

      const noGeometryChangeList = this.filterChangeList(changeList, this.geometryKeyList);
      const backupChangeList = this.filterChangeList(changeList, this.nobackupKeyList);

      // console.log('END detectChanges(), changeList = ', changeList);
      // console.log('END detectChanges(), nonGeometryChangeList = ', nonGeometryChangeList);

      if (changeList.length > 0) {
        // console.log('detectChanges(), CHANGE DETECTED, A = ', JSON.stringify(currentModel));
        // console.log('detectChanges(), CHANGE DETECTED, B = ', JSON.stringify(lastModel));

        console.log('END DETECTED detectChanges(), changeList = ', changeList);
        console.log('END DETECTED detectChanges(), nonGeometryChangeList = ', noGeometryChangeList);

        if (noGeometryChangeList.length > 0) {
          this.validate();
        }

        if (backupChangeList.length > 0) {
          this.eventService.send(Message.MODEL_SAVE_BACKUP, { lastProjectData: this.lastProjectData });
        }

        for (const changePath of changeList) {
          this.eventService.send(Message.MODEL_CHANGED, { changesPath: changePath });
        }

        this.lastProjectData = currentModel;
      }

      const t = new Date().getTime() - startTime;
      if (t > 10) {
        console.log('END detectChanges(), time = ', t);
      }
    }

    if (this.needValidation) {
      this.needValidation = false;

      this.eventService.send(Message.SERVER_INIT_NET, { projectData: this.modelService.getProjectData() });
    }

    setTimeout(() => this.checkValidation(), this.VALIDATION_TIMEOUT);

    this.checkValidationBusy = false;
  }

}
