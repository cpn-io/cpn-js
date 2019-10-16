import { Injectable } from '@angular/core';

@Injectable()
export class ErrorService {

  public errorIds = [];
  public errorData = [];

  constructor() { }

  updateErrorData(errorData) {
    console.log(this.constructor.name, 'updateErrorData(), errorData = ', errorData);

    this.clearArray(this.errorIds);
    this.clearArray(this.errorData);

    for (const id in errorData) {
      this.errorIds.push(id);
      this.errorData[id] = errorData[id];
    }
    console.log(this.constructor.name, 'updateErrorData(), this.errorIds = ', this.errorIds);
    console.log(this.constructor.name, 'updateErrorData(), this.errorData = ', this.errorData);
  }

  clearArray(array) {
    while (array.length) {
      array.pop();
    }
  }
}
