import { Injectable } from '@angular/core';
import { ModelService } from './model.service';
import { ModelEditorComponent } from '../model-editor/model-editor.component';
import { EditorPanelComponent } from '../editor-panel/editor-panel.component';

@Injectable({
  providedIn: 'root'
})
export class EditorPanelService {

  editorPanelComponent: EditorPanelComponent;

  modelEditorList: ModelEditorComponent[] = [];

  selectedModelEditor: ModelEditorComponent;

  constructor() { }

  public setEditorPanelComponent(editorPanelComponent: EditorPanelComponent) {
    this.editorPanelComponent = editorPanelComponent;
  }

  public getEditorPanelComponent(): EditorPanelComponent {
    return this.editorPanelComponent;
  }

  public setSelectedModelEditor(modelEditor: ModelEditorComponent) {
    this.selectedModelEditor = modelEditor;
  }

  public getSelectedModelEditor(): ModelEditorComponent {
    return this.selectedModelEditor;
  }

  public addModelEditor(modelEditor: ModelEditorComponent) {
    this.modelEditorList.push(modelEditor);

    console.log(this.constructor.name, 'addModelEditor(), this.modelEditorList = ', this.modelEditorList);
  }

  public removeModelEditor(modelEditor: ModelEditorComponent) {
    this.modelEditorList.push(modelEditor);

    this.modelEditorList = this.modelEditorList.filter(function (e) { return e !== modelEditor; });

    console.log(this.constructor.name, 'removeModelEditor(), this.modelEditorList = ', this.modelEditorList);
  }

  public clearModelEditorList() {
    this.modelEditorList = [];

    console.log(this.constructor.name, 'clearModelEditorList(), this.modelEditorList = ', this.modelEditorList);
  }

  public getModelEditorList(): ModelEditorComponent[] {
    return this.modelEditorList;
  }

}
