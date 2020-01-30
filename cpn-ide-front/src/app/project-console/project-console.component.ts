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

  JSON = JSON;

  success = false;

  nodes = [];
  logHtml = [];
  changesHtml = [];
  processing = false;

  timeInitStart;
  timeSimStart;

  constructor(private eventService: EventService,
    public accessCpnService: AccessCpnService) {
  }

  ngOnInit() {
    this.eventService.on(Message.PROJECT_LOAD, (event) => {
      this.logHtml = [];
      this.changesHtml = [];
      this.nodes = [];

      if (event.project) {
        this.logSuccess('Project ' + event.project.name + ' loaded.');
      }
    });

    // VALIDATION

    this.eventService.on(Message.SERVER_INIT_NET_START, () => {
      this.logHtml = [];
      this.nodes = [];
      this.log('Validation process...');
      this.timeInitStart = new Date().getTime();
    });

    this.eventService.on(Message.SERVER_INIT_NET_DONE, (event) => {
      if (event && event.data) {
        const elapsed = new Date().getTime() - this.timeInitStart;

        if (event.data.success) {
          this.logSuccess('Complete in ' + this.timeConversion(elapsed) + '. Model is correct.');
        } else {
          this.logError('Complete in ' + this.timeConversion(elapsed) + ' with errors:');

          const errorData = this.accessCpnService.getErrorData();
          console.log('errorData: ', errorData);
          if (Object.keys(errorData).length > 0) {
            for (const id of Object.keys(errorData)) {
              this.logError(id + ': ' + errorData[id]);
            }
          }
        }
      }
    });

    this.eventService.on(Message.SERVER_INIT_NET_ERROR, (event) => {
      if (event) {
        if (event.data && event.data.error && event.data.error.stackTrace) {
          this.logError('Validation server error:\n' + event.data.error.stackTrace);
        } else {
          this.logError('Validation server error: ' + JSON.stringify(event.data));
        }
      }
    });

    // SIMULATION

    this.eventService.on(Message.SERVER_INIT_SIM_START, () => {
      this.logHtml = [];
      this.nodes = [];
      this.log('Simulator initializing...');
      this.timeSimStart = new Date().getTime();
    });


    this.eventService.on(Message.SERVER_INIT_SIM_DONE, () => {
      const elapsed = new Date().getTime() - this.timeSimStart;
      this.logSuccess('Simulator initialized in ' + this.timeConversion(elapsed) + '.');
    });

    this.eventService.on(Message.SERVER_ERROR, (event) => {
      if (event && event.data) {
        if (event.data.error && event.data.error.description) {
          this.logError('Simulator initializing error: ' + event.data.error.description);
          this.logError(event.data.error.stackTrace);
        } else if (event.data.error && event.data.error.stackTrace) {
          this.logError('Simulator initializing error:\n' + event.data.error.stackTrace);
        } else {
          this.logError('Simulator initializing error:\n' + JSON.stringify(event.data));
        }
      } else {
        this.logError('Simulator initializing error: UNDEFINED');
      }
    });

    // TOKENS
    this.eventService.on(Message.SIMULATION_STEP_DONE, () => {
        this.logSuccess('Tokens: ' + JSON.stringify(this.accessCpnService.tokenData));
        this.logSuccess('Fired transitions: ' + JSON.stringify(this.accessCpnService.getFiredData()));
        this.logSuccess('Ready transitions: ' + JSON.stringify(this.accessCpnService.getReadyData()));
    });


    // MODEL CHANGES
    this.eventService.on(Message.MODEL_CHANGED_DETAILS, (event) => {
      if (event && event.changesPath) {
        this.logChanges(event.changesPath);
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

  logChanges(text) {
    this.changesHtml.push({
      date: new Date(),
      class: 'normal',
      text: text
    });

    setTimeout(() => {
      const changesScrollPane = document.getElementById('changesScrollPane');
      changesScrollPane.scrollTop = changesScrollPane.scrollHeight;
    }, 100);
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
