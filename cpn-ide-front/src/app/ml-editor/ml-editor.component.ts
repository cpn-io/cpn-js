import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Message } from '../common/message';
import { EventService } from '../services/event.service';
import { ModelService } from '../services/model.service';

@Component({
  selector: 'app-ml-editor',
  templateUrl: './ml-editor.component.html',
  styleUrls: ['./ml-editor.component.scss']
})
export class MlEditorComponent implements OnInit, OnDestroy {
  @Input() project: Object;

  textValue = '';
  cpnElement = {};
  declarationType;

  constructor(
    private eventService: EventService,
    private modelService: ModelService) {
  }

  ngOnInit() {
    this.eventService.on(Message.CHANGE_EXPLORER_TREE, (data) => {
      this.explorerTreeChangeHandler(data);
    });
  }

  explorerTreeChangeHandler(data) {
    // switch (data.action) {
    //   case 'add':
    //     this.textValue = data.node.data.name;
    //     break;

    //   case 'rename':
    //     this.textValue = data.node.data.name;
    //     break;

    //   case 'delete':
    //     this.textValue = '';
    //     break;

    //   default:
    // }

    if (data.action === 'select') {
      if (data.cpnElement && data.declarationType) {
        this.cpnElement = data.cpnElement;
        this.declarationType = data.declarationType;

        this.textValue = this.modelService.cpnDeclarationElementToString(
          this.cpnElement,
          this.declarationType);
      }
    }
  }

  ngAfterViewInit() {
  }

  ngOnDestroy() {
    // this.subscription.unsubscribe();
  }

  onKeyUp(event) {
    console.log('onKeyUp(), event -> ', event);
  }

  saveEditedData(event) {
    console.log('saveEditedData(), event = ', event);

    if (event.target && event.target.textContent) {
      // this.modelService.stringToCpnDeclarationElement(
      //   this.cpnElement,
      //   event.target.textContent);

      console.log('saveEditedData(), event.target.textContent = ', event.target.textContent);
      console.log('saveEditedData(), this.cpnElement = ', this.cpnElement);

      this.eventService.send(Message.UPDATE_TREE, {
        cpnElement: this.cpnElement,
        newTextValue: event.target.textContent });
    }
  }

}
