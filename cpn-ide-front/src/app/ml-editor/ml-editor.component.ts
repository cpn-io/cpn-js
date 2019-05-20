import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {EmitterService} from '../services/emitter.service';
import {Message} from '../common/message';
import {EventService} from '../services/event.service';
import { ModelService } from '../services/model.service';

@Component({
  selector: 'app-ml-editor',
  templateUrl: './ml-editor.component.html',
  styleUrls: ['./ml-editor.component.scss']
})
export class MlEditorComponent implements OnInit, OnDestroy {
  @Input() project: Object;

  textValue = ' ';
  cpnElement;

  constructor(
    private eventService: EventService,
    private modelService: ModelService) {
    // this.subscripeToSmlFromFunnctions();
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
        this.textValue = this.modelService.cpnElementToString(data.cpnElement, data.declarationType);
      }
    }
  }

  ngAfterViewInit() {
  }

  ngOnDestroy() {
    // this.subscription.unsubscribe();
  }

  subscripeToSmlFromFunnctions() {
    this.eventService.on(Message.SML_TO_EDITOR, (data) => {
      if (data.fn) {
        this.textValue = data.fn.data;
      }
    });
  }

  textareaKeyUp(event) {
    console.log('textareaKeyUp(), event -> ', event);
  }

  saveNotes = function (notes) {
    console.log(notes);
  };

  saveEditedData(event) {
    console.log('saveEditedData(), event = ', event);
  }

}
