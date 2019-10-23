import { ModelService } from './../services/model.service';
import { Component, OnInit } from '@angular/core';
import { Message } from '../common/message';
import { EventService } from '../services/event.service';
import { AccessCpnService } from '../services/access-cpn.service';
import { delay } from 'q';

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
  REPLICATION = 5;

  mode = this.SINGLE_STEP;

  simulationConfig = {
    multi_step: {
      steps: 50,
      delay: 1000
    },

    multi_step_ff: {
      steps: 50,
      max_step: 0,
      time_step: 0,
      max_time: 0,
    }
  };

  multiStepCount = 0;

  constructor(
    private eventService: EventService,
    public accessCpnService: AccessCpnService,
    public modelService: ModelService) { }

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

    this.eventService.on(Message.SHAPE_SELECT, (event) => {

      if (!this.accessCpnService.isSimulation) {
        return;
      }

      const element = event.element;
      console.log(this.constructor.name, 'Message.SHAPE_SELECT, element = ', element);

      if (element && element.type && element.type === 'cpn:Transition') {
        switch (this.mode) {
          case this.SINGLE_STEP:
            this.animateTransition(element.cpnElement._id);
            this.accessCpnService.doStep(element.cpnElement._id);
            break;
          case this.SINGLE_STEP_CHOOSE_BINDING:
            this.animateTransition(element.cpnElement._id);
            this.accessCpnService.getBindings(element.cpnElement._id);
            break;
        }
      }

    });


    this.eventService.on(Message.SIMULATION_SELECT_BINDING, (event) => {
      if (!this.accessCpnService.isSimulation) {
        return;
      }

      console.log(this.constructor.name, 'Message.SIMULATION_SELECT_BINDING, event = ', event);

      const element = event.element;

      if (element &&
        element.type &&
        element.type === 'cpn:Transition' &&
        event.binding) {

        switch (this.mode) {
          case this.SINGLE_STEP_CHOOSE_BINDING:
            this.accessCpnService.doStepWithBinding(element.cpnElement._id, event.binding.bind_id);
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
      default:
        document.body.style.cursor = 'default';
    }
  }

  animateTransition(transId) {
    const arcs = this.modelService.getTransitionIncomeArcs(transId);
    for (const arc of arcs) {
      this.eventService.send(Message.SIMULATION_ANIMATE_ARC, { arcId: arc._id });
      // this.eventService.send(Message.SIMULATION_ANIMATE_ARC, { arcId: 'ID1243034573' });
    }
  }

  onRunMultiStep() {
    console.log(this.constructor.name, 'runMultiStep(), simulationConfig = ', this.simulationConfig);

    this.multiStepCount = this.simulationConfig.multi_step.steps;
    this.runMultiStep();
  }

  onRunMultiStepFF() {
    console.log(this.constructor.name, 'onRunMultiStepFF(), simulationConfig = ', this.simulationConfig);
    this.runMultiStepFF();
  }

  runMultiStep() {
    console.log(this.constructor.name, 'runMultiStep(), this.multiStepCount = ', this.multiStepCount);

    if (this.multiStepCount > 0) {
      const readyData: any = this.accessCpnService.getReadyData();
      if (readyData && Object.keys(readyData).length > 0) {
        // const transId = Object.keys(readyData)[0];
        // this.accessCpnService.doStep(transId);
        this.accessCpnService.doStep('multistep');
        this.multiStepCount--;

        setTimeout(() => { this.runMultiStep(); }, +this.simulationConfig.multi_step.delay);
      }
    }
  }

  runMultiStepFF() {
    console.log(this.constructor.name, 'runMultiStepFF(), this.multiStepCount = ', this.multiStepCount);

    const config = this.simulationConfig.multi_step_ff;
    const options = {
      addStep: config.steps,
      untilStep: config.max_step,
      untilTime: config.max_time,
      addTime: config.time_step,
      amount: config.steps
    };
    this.accessCpnService.doMultiStepFF(options);
  }


  onRewind() {
    this.accessCpnService.initSim();
  }
}
