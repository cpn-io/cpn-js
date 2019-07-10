import { Component, OnInit } from '@angular/core';
import { Message } from '../common/message';
import { EventService } from '../services/event.service';
import { AccessCpnService } from '../services/access-cpn.service';

@Component({
  selector: 'app-simulation-panel',
  templateUrl: './simulation-panel.component.html',
  styleUrls: ['./simulation-panel.component.scss']
})
export class SimulationPanelComponent implements OnInit {

  SINGLE_STEP = 1;
  SINGLE_STEP_CHOOSE_BINDING = 2;
  MULTI_STEP = 3;
  MULTI_STEP_FF = 4;

  mode = this.SINGLE_STEP;

  constructor(
    private eventService: EventService,
    public accessCpnService: AccessCpnService) { }

  ngOnInit() {

    this.eventService.on(Message.SIMULATION_STARTED, (data) => {
    });

    this.eventService.on(Message.SIMULATION_STOPED, (data) => {
      document.body.style.cursor = 'default';
    });

    // this.eventService.on(Message.SHAPE_HOVER, (data) => {
    //   const element = data.element;

    //   let setCursor = false;

    //   if (element && element.type && element.type === 'cpn:Transition') {

    //     switch (this.mode) {
    //       case this.SINGLE_STEP:
    //       case this.SINGLE_STEP_CHOOSE_BINDING:
    //         setCursor = true;
    //         break;
    //     }

    //   }

    //   document.body.style.cursor = setCursor ? 'crosshair' : 'defualt';
    // });

    this.eventService.on(Message.SHAPE_SELECT, (data) => {
      const element = data.element;

      console.log(this.constructor.name, 'Message.SHAPE_SELECT, element = ', element);

      if (element && element.type && element.type === 'cpn:Transition') {

        switch (this.mode) {
          case this.SINGLE_STEP:
            this.accessCpnService.doStep(element.cpnElement._id);
            break;
        }

      }
    });

    this.setMode(this.SINGLE_STEP);
  }

  public setMode(mode) {
    this.mode = mode;

    switch (this.mode) {
      case this.SINGLE_STEP:
        document.body.style.cursor = 'crosshair';
        break;
      case this.SINGLE_STEP_CHOOSE_BINDING:
        document.body.style.cursor = 'crosshair';
        break;
      case this.MULTI_STEP:
        document.body.style.cursor = 'default';
        break;
      case this.MULTI_STEP_FF:
        document.body.style.cursor = 'default';
        break;
    }
  }
}
