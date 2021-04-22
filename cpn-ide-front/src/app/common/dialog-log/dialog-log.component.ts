import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: "app-dialog-log",
  templateUrl: "./dialog-log.component.html",
  styleUrls: ["./dialog-log.component.scss"],
})
export class DialogLogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<DialogLogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {}

  onCopy() {
    const selBox = document.createElement("textarea");
    selBox.style.position = "fixed";
    selBox.style.left = "0";
    selBox.style.top = "0";
    selBox.style.opacity = "0";
    selBox.value = document.getElementById("textMessage").textContent;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand("copy");
    document.body.removeChild(selBox);
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
