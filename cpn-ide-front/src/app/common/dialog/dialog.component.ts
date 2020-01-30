import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

declare var $: any;

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  static YES = 1;
  static NO = 0;

  constructor(public dialogRef: MatDialogRef<DialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
  }

  onYes(): void {
    this.data.result = DialogComponent.YES;
  }

  onNo(): void {
    this.data.result = DialogComponent.NO;
    // this.dialogRef.close();
  }

  onCancel(): void {
    this.dialogRef.close();
  }

}


