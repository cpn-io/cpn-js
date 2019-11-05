import { Injectable } from '@angular/core';
import { ModelService } from './model.service';
import { ModelEditorComponent } from '../model-editor/model-editor.component';

@Injectable({
  providedIn: 'root'
})
export class EditorPanelService {

  selectedModelEditor;

  constructor() { }

  public setSelectedModelEditor(modelEditor: ModelEditorComponent) {
    this.selectedModelEditor = modelEditor;
  }

  public getSelectedModelEditor(): ModelEditorComponent {
    return this.selectedModelEditor;
  }
}
