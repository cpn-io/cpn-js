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

  skipKeyList = [
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

  skipKeyList2 = [
    'bendpoint'
  ];

  geometryChanges = false;
  nobackupChanges = false;

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
  detectChanges(obj1, obj2, level, log) {

    if (obj1 instanceof Object && obj2 instanceof Object) {

      if (Object.keys(obj1).filter(key => !this.skipKeyList.includes(key)).length !==
        Object.keys(obj2).filter(key => !this.skipKeyList.includes(key)).length) {
        // console.log('detectChanges(), KEYS LENGTH DIFFERENT ', level, obj1, obj2);
        return true;
      }

      for (const key of Object.keys(obj1)) {

        // if (this.skipKeyList.includes(key.toLowerCase())) {
        //   continue;
        // }

        if (obj1.hasOwnProperty(key) && obj2.hasOwnProperty(key)) {
          if (this.detectChanges(obj1[key], obj2[key], level + 1, log)) {

            log.path = key + (log.path ? '.' + log.path : '');

            // console.log('detectChanges(), DETECTED, OBJECTS DIFFERENT, ', level, obj1[key], obj1[key]);

            if (this.skipKeyList.includes(key.toLowerCase())) {
              this.geometryChanges = true;
            }
            if (this.skipKeyList2.includes(key.toLowerCase())) {
              this.nobackupChanges = true;
            }
            return true;
          }
        } else {
          // console.log('detectChanges(), DETECTED, KEYS OBJECTS DIFFERENT, ', level, key, obj1, obj2, ' [', obj1[key], '] [', obj2[key], ']');

          if (this.skipKeyList.includes(key.toLowerCase())) {
            this.geometryChanges = true;
          }
          if (this.skipKeyList2.includes(key.toLowerCase())) {
            this.nobackupChanges = true;
          }
          return true;
        }

      }

      return false;

    } else if (obj1 instanceof Array && obj2 instanceof Array) {

      if (obj1.length !== obj2.length) {
        // console.log('detectChanges(), ARRAY LENGTH DIFFERENT ', level, obj1, obj2);
        return true;
      }

      for (let i = 0; i < obj1.length; i++) {
        if (obj1[i] && obj2[i]) {
          if (this.detectChanges(obj1[i], obj2[i], level + 1, log)) {
            return true;
          }
        } else {
          // console.log('detectChanges(), ARRAY OBJECTS DIFFERENT ', level, obj1[i], obj2[i]);
          return true;
        }
      }

      return false;

    }

    if (!(obj1 instanceof Object) && !(obj2 instanceof Object)) {
      if (obj1 !== obj2) {
        // console.log('detectChanges(), VALUES DIFFERENT ', level, obj1, obj2);
        return true;
      }
    }

    return false;
  }



  detectChanges3(obj1, obj2, log) {

    if (obj1 && obj2 && obj1 instanceof Object && obj2 instanceof Object) {

      if (Object.keys(obj1).length !== Object.keys(obj2).length) {
        log.path = 'keyLength' + (log.path ? '.' + log.path : '');
        log.pathHistory.push(log.path);
      }

      for (const key of Object.keys(obj1)) {

        if (obj1.hasOwnProperty(key) && obj2.hasOwnProperty(key)) {
          this.detectChanges3(obj1[key], obj2[key], log);

          // log.path = key + (log.path ? '.' + log.path : '');
          // log.pathHistory.push(log.path);
        } else {
          log.path = 'diffKeys' + (log.path ? '.' + log.path : '');
          log.pathHistory.push(log.path);
        }

      }

    } else if (obj1 instanceof Array && obj2 instanceof Array) {

      if (obj1.length !== obj2.length) {
        log.path = 'arrayLength' + (log.path ? '.' + log.path : '');
        log.pathHistory.push(log.path);
      }

      for (let i = 0; i < obj1.length; i++) {
        if (obj1[i] && obj2[i]) {
          this.detectChanges3(obj1[i], obj2[i], log);
        }
      }

    }

    if (!(obj1 instanceof Object) && !(obj2 instanceof Object)) {
      if (obj1 !== obj2) {
        log.path = 'value' + (log.path ? '.' + log.path : '');
        log.pathHistory.push(log.path);
      }
    }

  }




  /**
   * Regular checking validation
   */
  checkValidation() {
    const startTime = new Date().getTime();
    if (this.modelService.getProjectData()) {
      // console.log('START detectChanges(), time = ', new Date().getTime(), this.modelService.getProjectData());

      const lastModel = this.lastProjectData;
      const currentModel = JSON.parse(JSON.stringify(this.modelService.getProjectData()));
      // const currentModel = this.modelService.getProjectData();

      this.geometryChanges = false;
      this.nobackupChanges = false;

      const log = { path: undefined, pathHistory: [] };

      // this.detectChanges3(lastModel, currentModel, log);

      if (log.pathHistory.length > 0) {
        // console.log('detectChanges(), CHANGE DETECTED, A = ', JSON.stringify(currentModel));
        // console.log('detectChanges(), CHANGE DETECTED, B = ', JSON.stringify(lastModel));

        console.log('END detectChanges(), log = ', log);
        console.log('END detectChanges(), this.geometryChanges = ', this.geometryChanges);
        console.log('END detectChanges(), this.nobackupChanges = ', this.nobackupChanges);

        if (!this.geometryChanges) {
          this.validate();
        }

        if (!this.nobackupChanges) {
          this.eventService.send(Message.MODEL_CHANGED, { lastProjectData: this.lastProjectData, changesPath: log.path });
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
  }
}
