import { Component, Input, OnInit } from "@angular/core";
import { ModelEditorComponent } from "../model-editor.component";

@Component({
  selector: "app-model-editor-toolbar",
  templateUrl: "./model-editor-toolbar.component.html",
  styleUrls: ["./model-editor-toolbar.component.scss"],
})
export class ModelEditorToolbarComponent implements OnInit {
  @Input()
  editorRef: ModelEditorComponent;

  constructor() {}

  ngOnInit() {}

  lassoTool() {}

  createPlace() {}

  createTransition() {}
}
