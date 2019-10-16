import { Injectable } from '@angular/core';

@Injectable()
export class ErrorService {

  public errorData = [];

  constructor() { }

  updateErrorData(errorData) {
    console.log(this.constructor.name, 'updateErrorData(), errorData = ', errorData);

    // this.errorData.length = 0;
    while (this.errorData.length) {
      this.errorData.pop();
    }

    for (const key in errorData) {
      this.errorData[key] = errorData[key];
    }
    console.log(this.constructor.name, 'updateErrorData(), this.errorData.length = ', this.errorData.length);
    console.log(this.constructor.name, 'updateErrorData(), this.errorData = ', this.errorData);
  }
}
