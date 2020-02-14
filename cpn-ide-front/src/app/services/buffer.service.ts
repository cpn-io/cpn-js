import {Injectable} from '@angular/core';
import {ModelService} from './model.service';

@Injectable({
  providedIn: 'root'
})
export class BufferService {

  private bufferNode = {
    type: null,
    object: null,
    cut: null
  };

  constructor(private modelService: ModelService) {
  }

  isEqualTo(dataTypes) {
    return this.bufferNode.object ? this.bufferNode.type === dataTypes : null;
  }

  isEmpty() {
    return !this.bufferNode.object;
  }

  copyObject(node, type): void {
    this.bufferNode.object = {...node};
    this.bufferNode.type = type;
    this.bufferNode.cut = false;
  }

  cutObject(node, type): void {
    this.copyObject(node, type);
    // this.bufferNode.object = {...node};
    // this.bufferNode.type = type;
    this.bufferNode.cut = true;
  }

  pasteObject(parent): void {
    if (this.bufferNode.cut) {
      this.modelService.deleteFromModel(this.bufferNode.object);
    }
    this.modelService.addCpnElement(parent, this.bufferNode.object, this.bufferNode.type);
    this.bufferNode = {object: null, type: null, cut: null};
  }


}
