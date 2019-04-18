import {Component, OnDestroy, OnInit} from '@angular/core';
import {EmitterService} from '../services/emitter.service';
import {Message} from '../common/message';
import {EventService} from '../services/event.service';
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-project-console',
  templateUrl: './project-console.component.html',
  styleUrls: ['./project-console.component.scss'],
  providers: [DatePipe]
})
export class ProjectConsoleComponent implements OnInit, OnDestroy {

  success = false;

  nodes = [];
  logHtml = [];
  processing = false;

  constructor(private eventService: EventService,
              private emitterService: EmitterService) {
    this.subscribeToSmlVerify();
  }

  ngOnInit() {
    this.subscribeToAppMessage();
  }

  ngOnDestroy() {
  }

  subscribeToAppMessage() {
    this.eventService.on(Message.PROJECT_FILE_OPEN, (data) => {
      this.loadProjectData(data.project);
      this.logHtml = [];
    });

    // Subscribe on project load event
    this.eventService.on(Message.PROJECT_LOAD, (data) => {
      this.loadProjectData(data.project);
      this.logHtml = [];
    });

    // Subscribe on project xml update event
    this.eventService.on(Message.XML_UPDATE, (data) => {
      this.loadProjectData(data.project);
    });
  }

  subscribeToSmlVerify() {
    this.eventService.on(Message.SML_VERIFY, (data) => {
      if (data.sml) {
        this.log(data.sml.data.error.text);
      }
    });
  }


  getVerify(net: any) {
    this.getVerifyByJson(net);

    // const modelFile = 'discretemodel_task1.cpn';
    // this.getVerifyByXMl(modelFile);
  }

  logColor(text, className) {
    this.logHtml.push({
      date: new Date(),
      class: className,
      text: text
    });

    setTimeout(() => {
      const logScrollPane = document.getElementById("logScrollPane");
      logScrollPane.scrollTop = logScrollPane.scrollHeight;
    }, 100);
  }

  log(text) {
    this.logColor(text, 'normal');
  }

  logError(text) {
    this.logColor(text, 'error');
  }

  logSuccess(text) {
    this.logColor(text, 'success');
  }

  timeConversion(millisec) {
    const seconds: number = (millisec / 1000);
    const minutes = (millisec / (1000 * 60));
    const hours = (millisec / (1000 * 60 * 60));
    const days = (millisec / (1000 * 60 * 60 * 24));

    if (seconds < 60) {
      return seconds + " sec";
    } else if (minutes < 60) {
      return minutes + " min";
    } else if (hours < 24) {
      return hours + " hrs";
    } else {
      return days + " days"
    }
  }


  getVerifyByJson(net: any) {
    this.log('Verification process...');

    var timeStart = new Date().getTime();

    this.processing = true;
    this.emitterService.verifyAllNet(net)
      .subscribe(
        (data: any) => {
          const elapsed = new Date().getTime() - timeStart;
          this.logSuccess(data ? data : 'Complete in ' + this.timeConversion(elapsed) + '. Model is correct.');

          if (data != null) {
            console.log('DATA FROM WEB VERIFY = ', data);
          } else {
            this.success = true;
            this.processing = false;
            this.parseErrorText(undefined);
          }
          //  this.done = true;
        },
        error => {
          this.success = false;
          this.processing = false;
          console.log(error);

          const elapsed = new Date().getTime() - timeStart;
          this.logError('Complete in ' + this.timeConversion(elapsed) + '. Error: ' + error.error.text);

          this.parseErrorText(error.error.text);
        }
      );
  }

  parseErrorText(errorText) {
    if (errorText) {
      let errorWords = errorText.split(new RegExp('[.;\n ]', 'g'));
      errorWords = errorWords.filter(e => e.charAt(e.length - 1) === ':');
      // errorWords.map ( function(e) { return  e.slice(0, -1); });
      this.eventService.send(Message.MODEL_ERROR, {id: errorWords});
    } else
      this.eventService.send(Message.MODEL_ERROR, {id: []});
  }

  loadProjectData(project: any) {
    this.nodes = [];

    let projectData = project.data;
    this.getVerify(project.data);

    let cpnet;

    if (projectData.workspaceElements) {
      if (projectData.workspaceElements instanceof Array) {
        for (let workspaceElement of projectData.workspaceElements) {
          if (workspaceElement.cpnet) {
            cpnet = workspaceElement.cpnet;
            break;
          }
        }
      } else {
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
          for (let block of cpnet.globbox.block) {

            // Parameters
            // -------------------------------
            if (block.id === 'Variables') {
              this.nodes = block.var;
            }
            // -------------------------------
          }
        }
      }
    }

  }

}
