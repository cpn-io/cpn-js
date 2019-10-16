import { Injectable } from '@angular/core';
import { clearArray } from '../common/utils';
import { ModelService } from './model.service';

@Injectable()
export class ElementStatusService {

  public errorData = [];
  public errorIds = [];
  public errorPagesIds = [];

  public readyIds = [];
  public readyPagesIds = [];

  constructor(private modelService: ModelService) { }

  updateErrorData(data) {
    clearArray(this.errorIds);
    clearArray(this.errorData);
    clearArray(this.errorPagesIds);

    if (!data.success) {
      for (const id of Object.keys(data.issues)) {
        for (const issue of data.issues[id]) {
          issue.description = issue.description.replace(issue.id + ':', '');
          issue.description = issue.description.replace(issue.id, '');
          issue.description = issue.description.replace(':', '');
          issue.description = issue.description.trim();

          this.errorData[issue.id] = issue.description;
          this.errorIds.push(issue.id);

          const page = this.modelService.getPageByElementId(issue.id);
          if (page && !this.errorPagesIds.includes(page._id)) {
            this.errorPagesIds.push(page._id);
          }
        }
      }

      // console.log(this.constructor.name, 'updateErrorData(), this.errorIds = ', this.errorIds);
      // console.log(this.constructor.name, 'updateErrorData(), this.errorPagesIds = ', this.errorPagesIds);
    }
  }

  updateReadyData(readyData) {
    clearArray(this.readyIds);
    clearArray(this.readyPagesIds);

    for (const id of readyData) {
      this.readyIds.push(id);

      const page = this.modelService.getPageByElementId(id);
      if (page && !this.readyPagesIds.includes(page._id)) {
        this.readyPagesIds.push(page._id);
      }
    }

    // console.log(this.constructor.name, 'updateReadyData(), this.readyIds = ', this.readyIds);
    // console.log(this.constructor.name, 'updateReadyData(), this.readyPagesIds = ', this.readyPagesIds);
  }
}
