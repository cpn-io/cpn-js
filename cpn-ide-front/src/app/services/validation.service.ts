import { Injectable } from '@angular/core';
import { EventService } from './event.service';
import { ModelService } from './model.service';
import { Message } from '../common/message';

@Injectable()
export class ValidationService {

  VALIDATION_TIMEOUT = 1000;

  needValidation = false;

  constructor(private eventService: EventService,
    private modelService: ModelService) {

    // set vaidation if project is loaded
    this.eventService.on(Message.PROJECT_LOAD, () => {
      this.validate();
    });

    this.checkValidation();
  }

  /**
   * public method for setting validation flag
   */
  public validate() {
    this.needValidation = true;
  }

  /**
   * Regular checking validation
   */
  checkValidation() {
    if (this.needValidation) {
      this.needValidation = false;

      this.eventService.send(Message.SERVER_INIT_NET, { projectData: this.modelService.getProjectData() });
    }

    setTimeout(() => this.checkValidation(), this.VALIDATION_TIMEOUT);
  }
}
