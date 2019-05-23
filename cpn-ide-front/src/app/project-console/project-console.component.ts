import { Component, OnDestroy, OnInit } from '@angular/core';
import { AccessCpnService } from '../services/access-cpn.service';
import { Message } from '../common/message';
import { EventService } from '../services/event.service';
import { DatePipe } from "@angular/common";

@Component({
  selector: 'app-project-console',
  templateUrl: './project-console.component.html',
  styleUrls: ['./project-console.component.scss'],
  providers: [DatePipe]
})
export class ProjectConsoleComponent implements OnInit {

  success = false;

  nodes = [];
  logHtml = [];
  processing = false;

  constructor(private eventService: EventService,
    private accessCpnService: AccessCpnService) {
  }

  ngOnInit() {
    this.eventService.on(Message.PROJECT_LOAD, (data) => {
      this.logHtml = [];
    });


    // VERIFICATION

    this.eventService.on(Message.SERVER_INIT_NET_START, () => {
      this.log('VERIFICATION_START');
    });

    this.eventService.on(Message.SERVER_INIT_NET_DONE, (data) => {
      if (data) {
        this.logSuccess('VERIFICATION_DONE: ' + JSON.stringify(data));
      }
    });

    this.eventService.on(Message.SERVER_INIT_NET_ERROR, (data) => {
      if (data) {
        this.logError('VERIFICATION_ERROR: ' + JSON.stringify(data));
      }
    });


    // SIMULATION

    this.eventService.on(Message.SERVER_INIT_SIM_START, () => {
      this.log('SIM_INIT_START');
    });

    this.eventService.on(Message.SERVER_INIT_SIM_DONE, (data) => {
      if (data) {
        this.logSuccess('SIM_INIT_DONE: ' + JSON.stringify(data));
      }
      this.accessCpnService.getTokenMarks();
    });

    this.eventService.on(Message.SERVER_INIT_SIM_ERROR, (data) => {
      if (data) {
        this.logError('SIM_INIT_ERROR: ' + JSON.stringify(data));
      }
    });

    // TOKENS

    this.eventService.on(Message.SERVER_GET_TOKEN_MARKS, (data) => {
      if (data) {
        this.logSuccess('SERVER_GET_TOKEN_MARKS: ' + JSON.stringify(data));
      }
    });


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

  // getVerify(net: any) {
  //   this.getVerifyByJson(net);
  // }

  // getVerifyByJson(net: any) {
  //   // return;

  //   if (this.processing)
  //     return;

  //   this.log('Verification process...');

  //   var timeStart = new Date().getTime();

  //   this.processing = true;

  //   // this.accessCpnService.verifyAllNet(net);
  //   this.accessCpnService.initNet(net);
  //   //   .subscribe(
  //   //     (data: any) => {
  //   //       this.processing = false;

  //   //       console.log('VERIFICATION_DONE (1), data = ', data);

  //   //       const elapsed = new Date().getTime() - timeStart;
  //   //       this.logSuccess(data ? data : 'Complete in ' + this.timeConversion(elapsed) + '. Model is correct.');

  //   //       if (data != null) {
  //   //         console.log('DATA FROM WEB VERIFY = ', data);
  //   //       } else {
  //   //         this.success = true;
  //   //         this.parseErrorText(undefined);
  //   //       }
  //   //       //  this.done = true;

  //   //       console.log('VERIFICATION_DONE (2)');

  //   //       this.eventService.send(Message.VERIFICATION_DONE, { data: undefined });

  //   //     },
  //   //     error => {
  //   //       this.success = false;
  //   //       this.processing = false;
  //   //       console.log(error);

  //   //       const elapsed = new Date().getTime() - timeStart;
  //   //       this.logError('Complete in ' + this.timeConversion(elapsed) + '. Error: ' + error.error.text);

  //   //       this.parseErrorText(error.error.text);
  //   //     }
  //   //   );
  // }

  // parseErrorText(errorText) {
  //   if (errorText) {
  //     let errorWords = errorText.split(new RegExp('[.;\n ]', 'g'));
  //     errorWords = errorWords.filter(e => e.charAt(e.length - 1) === ':');
  //     // errorWords.map ( function(e) { return  e.slice(0, -1); });
  //     this.eventService.send(Message.MODEL_ERROR, { id: errorWords });
  //   } else
  //     this.eventService.send(Message.MODEL_ERROR, { id: [] });
  // }

  // loadProjectData(project: any) {
  //   this.nodes = [];

  //   let projectData = project.data;
  //   this.getVerify(project.data);

  //   let cpnet;

  //   if (projectData.workspaceElements) {
  //     if (projectData.workspaceElements instanceof Array) {
  //       for (let workspaceElement of projectData.workspaceElements) {
  //         if (workspaceElement.cpnet) {
  //           cpnet = workspaceElement.cpnet;
  //           break;
  //         }
  //       }
  //     } else {
  //       if (projectData.workspaceElements.cpnet) {
  //         cpnet = projectData.workspaceElements.cpnet;
  //       }
  //     }
  //   }

  //   // if (cpnet) {
  //   //   if (cpnet.globbox) {
  //   //     if (cpnet.globbox.block) {

  //   //       // GlobBox
  //   //       // --------------------------------------
  //   //       for (let block of cpnet.globbox.block) {

  //   //         // Parameters
  //   //         // -------------------------------
  //   //         if (block.id === 'Variables') {
  //   //           this.nodes = block.var;
  //   //         }
  //   //         // -------------------------------
  //   //       }
  //   //     }
  //   //   }
  //   // }

  // }

}
