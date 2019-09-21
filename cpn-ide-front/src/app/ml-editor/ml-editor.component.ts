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
  cpnType;

  constructor(
    private eventService: EventService,
    private modelService: ModelService) {
  }

  ngOnInit() {
    this.eventService.on(Message.TREE_SELECT_DECLARATION_NODE, (event) => {
      this.selectDeclarationNode(event);
    });
  }

  selectDeclarationNode(event) {
    console.log(this.constructor.name, 'selectDeclarationNode(), event = ', event);

    if (event.cpnElement && event.cpnType) {
      this.cpnElement = event.cpnElement;
      this.cpnType = event.cpnType;

      this.textValue = this.modelService.cpnDeclarationElementToString(
        this.cpnElement,
        this.cpnType);
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
      // console.log('saveEditedData(), event.target.textContent = ', event.target.textContent);
      // console.log('saveEditedData(), this.cpnElement = ', this.cpnElement);

      this.eventService.send(Message.DECLARATION_CHANGED, {
        cpnElement: this.cpnElement,
        newTextValue: event.target.textContent
      });

      // this.eventService.send(Message.MODEL_CHANGED);
    }
  }

}
