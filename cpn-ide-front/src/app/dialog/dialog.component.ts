import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  title = '';
  formData = [];

  action;

  constructor() { }

  ngOnInit() {
  }

  public show() {
    $('#modalDialog').modal('show');
  }

  public hide() {
    $('#modalDialog').modal('hide');
  }

  onAction(actionName) {
    this.hide();

    if (this.action) {
      this.action(actionName, this.formData);
    }
  }
}


export function showModalWindow(dialogElementRef, title, formData) {
  return new Promise((resolve, reject) => {
    dialogElementRef.title = title;
    dialogElementRef.formData = formData;
    dialogElementRef.action = (actionName, formData2) => {
      actionName === 'ok' ? resolve(formData2) : reject();
    };
    dialogElementRef.show();
  });
}
