import { Injectable } from '@angular/core';
import { EventService } from './event.service';
import { AccessCpnService } from './access-cpn.service';
import { ModelService } from './model.service';
import { Message } from '../common/message';

@Injectable({
  providedIn: 'root'
})
export class SimulationService {

  SINGLE_STEP = 1;
  SINGLE_STEP_CHOOSE_BINDING = 2;
  MULTI_STEP = 3;
  MULTI_STEP_FF = 4;
  REPLICATION = 5;

  mode = this.SINGLE_STEP;

  firedTransitionIdList = [];
  firedTransitionBindId;

  multiStepCount = 0;

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

  constructor(private eventService: EventService,
    public accessCpnService: AccessCpnService,
    public modelService: ModelService) {

    this.initEvents();
  }

  initEvents() {
    this.eventService.on(Message.SIMULATION_STARTED, () => { });
    this.eventService.on(Message.SIMULATION_STOPED, () => this.onStopSimulation());
    this.eventService.on(Message.SHAPE_HOVER, (event) => this.onShapeHover(event));
    this.eventService.on(Message.SHAPE_SELECT, (event) => this.onShapeSelect(event));
    this.eventService.on(Message.SIMULATION_TOKEN_ANIMATE_COMPLETE, (event) => this.onSimulationAnimateComplete(event));
    this.eventService.on(Message.SIMULATION_SELECT_BINDING, (event) => this.onSimulationSelectBinding(event));
    this.eventService.on(Message.SERVER_GET_TRANSITIONS, (event) => this.onSimulationGetTransitions(event));
  }

  public setMode(mode) {
    console.log(this.constructor.name, 'setMode(), mode = ', mode);

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

  onStopSimulation() {
    this.setMode(this.SINGLE_STEP);
    this.multiStepCount = 0;
    document.body.style.cursor = 'default';
  }

  onShapeHover(event) {
    console.log('onShapeHover(), event = ', event);

    if (!this.accessCpnService.isSimulation) {
      return;
    }

    const element = event.element;
    let setCursor = false;

    if (element && element.type && element.type === 'cpn:Transition') {
      switch (this.mode) {
        case this.SINGLE_STEP:
        case this.SINGLE_STEP_CHOOSE_BINDING:
          setCursor = true;
          break;
      }
    }
    // document.body.style.cursor = setCursor ? 'crosshair' : 'defualt';
  }

  onShapeSelect(event) {
    if (!this.accessCpnService.isSimulation) {
      return;
    }

    const element = event.element;
    this.firedTransitionIdList = [];

    if (element && element.type && element.type === 'cpn:Transition') {

      // console.log(this.constructor.name, 'onShapeSelect(), this.mode = ', this.mode);

      if (element.cpnElement._id in this.accessCpnService.getReadyData()) {
        switch (this.mode) {
          case this.SINGLE_STEP:
            this.firedTransitionIdList.push(element.cpnElement._id);
            this.transitionTokenAnimate(this.firedTransitionIdList);
            break;
          case this.SINGLE_STEP_CHOOSE_BINDING:
            this.firedTransitionIdList.push(element.cpnElement._id);
            this.accessCpnService.getBindings(this.firedTransitionIdList[0]);
            break;
        }
      }
    }
  }

  onSimulationSelectBinding(event) {
    if (!this.accessCpnService.isSimulation) {
      return;
    }

    const element = event.element;

    if (element && element.type && element.type === 'cpn:Transition' && event.binding) {
      this.firedTransitionBindId = event.binding.bind_id;
      this.transitionTokenAnimate(this.firedTransitionIdList);
    }
  }

  onSimulationAnimateComplete(event) {
    switch (this.mode) {
      case this.SINGLE_STEP:
        if (this.firedTransitionIdList.length === 1) {
          this.accessCpnService.doStep(this.firedTransitionIdList[0]);
          this.firedTransitionIdList = [];
        }
        break;

      case this.SINGLE_STEP_CHOOSE_BINDING:
        if (this.firedTransitionIdList.length === 1 && this.firedTransitionBindId) {
          this.accessCpnService.doStepWithBinding(this.firedTransitionIdList[0], this.firedTransitionBindId);
          this.firedTransitionIdList = [];
          this.firedTransitionBindId = undefined;
        }
        break;

      case this.MULTI_STEP:
        // if (this.firedTransitionIdList.length > 0) {
        //   if (this.multiStepCount > 0) {
        //     this.accessCpnService.doStep('multistep');
        //     this.multiStepCount--;
        //   }
        //   this.firedTransitionIdList = [];
        // }
        this.runMultiStep();
        break;
    }
  }

  onSimulationGetTransitions(event) {
    switch (this.mode) {
      case this.MULTI_STEP:
        this.animateFiredTransitions();
        // setTimeout(() => { this.runMultiStep(); }, +this.simulationConfig.multi_step.delay);
        break;
    }
  }

  transitionTokenAnimate(transIdList) {
    const arcIdList = [];
    for (const transId of transIdList) {
      for (const arc of this.modelService.getTransitionIncomeArcs(transId)) {
        arcIdList.push(arc._id);
      }
      for (const arc of this.modelService.getTransitionOutcomeArcs(transId)) {
        arcIdList.push(arc._id);
      }
    }
    if (arcIdList.length > 0) {
      this.eventService.send(Message.SIMULATION_TOKEN_ANIMATE, { arcIdList: arcIdList });
    }
  }

  animateFiredTransitions() {
    const firedTransIdList: any = this.accessCpnService.firedTransIdList;
    if (firedTransIdList && firedTransIdList.length > 0) {
      this.firedTransitionIdList = [];
      for (const transId of firedTransIdList) {
        this.firedTransitionIdList.push(transId);
      }
      this.transitionTokenAnimate(this.firedTransitionIdList);
    }
  }

  runMultiStep() {
    console.log(this.constructor.name, 'runMultiStep(), this.multiStepCount = ', this.multiStepCount);

    if (this.multiStepCount > 0) {
      // const firedTransIdList: any = this.accessCpnService.firedTransIdList;

      // if (firedTransIdList && firedTransIdList.length > 0) {
      //   this.firedTransitionIdList = [];
      //   for (const transId of firedTransIdList) {
      //     this.firedTransitionIdList.push(transId);
      //   }
      //   this.transitionTokenAnimate(this.firedTransitionIdList);
      // } else {
      if (this.multiStepCount > 0) {
        this.accessCpnService.doStep('multistep');
        this.multiStepCount--;
      }
      // }
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


}
