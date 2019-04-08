import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {EmitterService} from '../services/emitter.service';
import {Message} from '../common/message';
import {EventService} from '../services/event.service';

@Component({
  selector: 'app-ml-editor',
  templateUrl: './ml-editor.component.html',
  styleUrls: ['./ml-editor.component.scss']
})
export class MlEditorComponent implements OnInit, OnDestroy {

  @Input() project: Object;

  constructor(private eventService: EventService,
              private emitterService: EmitterService) {
    this.subscripeToSmlFromFunnctions();
  }

  // subscription: Subscription;
  typesText = '';
  variablesText = '';
  functionsText = '';
  textValue = ' ';


  ngOnInit() {
    // console.log('MlEditorComponent, ngOnInit(), this.project -> ', this.project);

    // this.functionsText = this.getFunctions(this.project);
  }

  ngAfterViewInit() {
    // console.log('MlEditorComponent, ngAfterViewInit(), this.project -> ', this.project);

    // this.functionsText = this.getFunctions(this.project);
  }

  ngOnDestroy() {
    // this.subscription.unsubscribe();
  }

  evaluateSml(value: string): void {
    console.log('Value in text editor' + value);
    this.emitterService.postDataSml(value).subscribe(
      (data: any) => {
        if (data != null) {
          // console.log('DATA FROM WEBVERIFI sml==' + data.toString());
          // EmitterService.getAppMessageEmitter().emit({
          //   id: Constants.ACTION_SML_VERIFI,
          //   sml: { data: data }
          // });

          this.eventService.send(Message.SML_VERIFY, {sml: {data: data}});
        }
        //  this.done = true;
      },
      error => {
        console.error(error);
        // EmitterService.getAppMessageEmitter().emit({
        //   id: Constants.ACTION_SML_VERIFI,
        //   sml: {data: error}
        // });

        this.eventService.send(Message.SML_VERIFY, {sml: {data: error}});
      }
    );
  }


  subscripeToSmlFromFunnctions() {
    // this.subscription = EmitterService.getAppMessageEmitter().subscribe((data: any) => {
    //   if (data && data.id) {
    //     if (data.id === Constants.ACTION_SML_TO_EDITOR) {
    //       if (data.fn) {
    //         console.log('get data from editor--' + data.fn.data);
    //         this.textValue = data.fn.data;
    //       }
    //     }
    //   }
    // });

    this.eventService.on(Message.SML_TO_EDITOR, (data) => {
      if (data.fn) {
        // console.log('get data from editor--' + data.fn.data);
        this.textValue = data.fn.data;
      }
    });
  }

  textareaKeyUp(event) {
    console.log('textareaKeyUp(), event -> ', event);
    console.log('text in editor <<' + this.functionsText);

    // element.style.height = "5px";
    // element.style.height = (element.scrollHeight) + "px";
  }


  saveNotes = function (notes) {
    console.log(notes);
  };


  getFunctions(project: any) {
    var projectData = project.data;
    var projectName = project.name;

    var text = '';

    let cpnet;

    if (projectData.workspaceElements) {
      if (projectData.workspaceElements instanceof Array) {
        for (var workspaceElement of projectData.workspaceElements) {
          if (workspaceElement.cpnet) {
            cpnet = workspaceElement.cpnet;
            break;
          }
        }
      }
      else {
        if (projectData.workspaceElements.cpnet) {
          cpnet = projectData.workspaceElements.cpnet;
        }
      }
    }

    if (cpnet) {
      if (cpnet.globbox) {
        if (cpnet.globbox.block) {

          // GlobBox
          // --------------------------------------
          for (var block of cpnet.globbox.block) {

            // Parameters
            // -------------------------------
            if (block.id === 'Functions') {
              text += block.ml;
              text += '\n\n';
            }
            // -------------------------------
          }
        }
      }
    }

    return text;
  }

}
