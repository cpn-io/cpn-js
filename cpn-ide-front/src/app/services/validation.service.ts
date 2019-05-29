import { Injectable } from '@angular/core';
import { EventService } from './event.service';
import { ModelService } from './model.service';
import { Message } from '../common/message';

@Injectable()
export class ValidationService {

  VALIDATION_TIMEOUT = 1000;

  needValidation = false;

  lastProjectDataStr = '';

  constructor(
    private eventService: EventService,
    private modelService: ModelService) {

    this.checkValidation();
  }

  /**
   * public method for setting validation flag
   */
  public validate() {
    this.needValidation = true;
  }

  getDiff = (string, diffBy) => string.split(diffBy).join('');

  detectChanges(projectData) {
    // if (this.lastProjectDataStr !== JSON.stringify(projectData)) {
    //   console.log('detectChanges(), CHANGE DETECTED');
    //   this.lastProjectDataStr = JSON.stringify(projectData);
    //   this.validate();
    // }


    const A = this.lastProjectDataStr;
    const B = JSON.stringify(projectData);
    const C = this.getDiff(B, A);

    if (C && C !== '') {
      console.log('detectChanges(), CHANGE DETECTED, A = ', A);
      console.log('detectChanges(), CHANGE DETECTED, B = ', B);
      this.lastProjectDataStr = JSON.stringify(projectData);
      this.validate();
    }
  }

  /**
   * Regular checking validation
   */
  checkValidation() {
    const startTime = new Date().getTime();
    if (this.modelService.getProjectData()) {
      // console.log('START detectChanges(), time = ', new Date().getTime(), this.modelService.getProjectData());
      this.detectChanges(this.modelService.getProjectData());
      const t = new Date().getTime() - startTime;
      // if (t > 10) {
      console.log('END detectChanges(), time = ', t);
      // }
    }

    if (this.needValidation) {
      this.needValidation = false;

      this.eventService.send(Message.SERVER_INIT_NET, { projectData: this.modelService.getProjectData() });
    }

    setTimeout(() => this.checkValidation(), this.VALIDATION_TIMEOUT);
  }
}
