import { Message } from './../common/message';
import { ModelService } from './../services/model.service';
import { EventService } from './../services/event.service';
import { Component, OnInit } from '@angular/core';
import { nodeToArray } from '../common/utils';

@Component({
  selector: 'app-project-tree',
  templateUrl: './project-tree.component.html',
  styleUrls: ['./project-tree.component.scss']
})
export class ProjectTreeComponent implements OnInit {

  public nodeToArray = nodeToArray;

  cpnet;

  constructor(private eventService: EventService,
    private modelService: ModelService) { }

  ngOnInit() {
    this.eventService.on(Message.PROJECT_LOAD, (event) => {
      if (event.project) {
        this.cpnet = this.modelService.getCpn();
      }
    });
  }

  onChange(event) {
    console.log(this.constructor.name, 'onChange(), event = ', event);
  }
}
