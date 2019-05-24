import { Component, OnDestroy, OnInit } from '@angular/core';
import { AccessCpnService } from '../services/access-cpn.service';
import { Message } from '../common/message';
import { EventService } from '../services/event.service';
import { DatePipe } from '@angular/common';

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

  timeStart;

  constructor(private eventService: EventService,
    private accessCpnService: AccessCpnService) {
  }

  ngOnInit() {
    this.eventService.on(Message.PROJECT_LOAD, (event) => {
      this.logHtml = [];
      this.nodes = [];
      this.logSuccess('Project ' + event.name + ' loaded.');
    });

    // VALIDATION

    this.eventService.on(Message.SERVER_INIT_NET_START, () => {
      this.log('Validation process...');
      this.timeStart = new Date().getTime();
    });

    this.eventService.on(Message.SERVER_INIT_NET_DONE, (event) => {
      if (event && event.data) {
        const elapsed = new Date().getTime() - this.timeStart;
        //   //       this.logSuccess(data ? data : 'Complete in ' + this.timeConversion(elapsed) + '. Model is correct.');

        if (event.data.success) {
          this.logSuccess('Complete in ' + this.timeConversion(elapsed) + '.Model is correct.');
        } else {

          // this.logError('Error: ' + JSON.stringify(event));
          for (const id of Object.keys(event.data.issues)) {
            const issue = event.data.issues[id][0];
            if (issue.description.includes(issue.id))
              this.logError('Error: ' + issue.description);
            else
              this.logError('Error: ' + issue.id + ': ' + issue.description);
          }
        }
      }
      // this.accessCpnService.getTokenMarks();
      // this.accessCpnService.getTransitions();
    });

    this.eventService.on(Message.SERVER_INIT_NET_ERROR, (event) => {
      if (event) {
        this.logError('Validation server error: ' + JSON.stringify(event.data));
      }
    });


    // SIMULATION

    this.eventService.on(Message.SERVER_INIT_SIM_START, () => {
      // this.log('Simulator initializing...');
    });


    this.eventService.on(Message.SERVER_INIT_SIM_DONE, () => {
      this.logSuccess('Simulator initialized.');
    });

    this.eventService.on(Message.SERVER_INIT_SIM_ERROR, (event) => {
      if (event) {
        this.logError('Simulator initializing error: ' + JSON.stringify(event.data));
      }
    });

    // TOKENS
    this.eventService.on(Message.SERVER_GET_TOKEN_MARKS, (event) => {
      if (event) {
        this.logSuccess('Tokens: ' + JSON.stringify(event.data));
      }
    });

    // TRANSITIONS
    this.eventService.on(Message.SERVER_GET_TRANSITIONS, (event) => {
      if (event) {
        this.logSuccess('Ready transitions: ' + JSON.stringify(event.data));
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
      const logScrollPane = document.getElementById('logScrollPane');
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
      return seconds + ' sec';
    } else if (minutes < 60) {
      return minutes + ' min';
    } else if (hours < 24) {
      return hours + ' hrs';
    } else {
      return days + ' days';
    }
  }

}
