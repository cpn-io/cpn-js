import { Component, OnInit } from '@angular/core';
import { EventService } from '../services/event.service';
import { Message } from '../common/message';

@Component({
  selector: 'app-project-monitors',
  templateUrl: './project-monitors.component.html',
  styleUrls: ['./project-monitors.component.scss']
})
export class ProjectMonitorsComponent implements OnInit {

  text = '';

  constructor(private eventService: EventService) { }

  ngOnInit() {
    this.eventService.on(Message.MONITOR_OPEN, (event) => this.onLoadMonitor(event.monitorObject));
  }

  onLoadMonitor(cpnElement) {
    this.text = JSON.stringify(cpnElement);
  }
}
