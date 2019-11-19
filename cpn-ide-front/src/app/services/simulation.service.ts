import { Injectable } from '@angular/core';
import { EventService } from './event.service';
import { AccessCpnService } from './access-cpn.service';
import { ModelService } from './model.service';
import { Message } from '../common/message';
import { EditorPanelService } from './editor-panel.service';

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
  multiStepLastTimeMs = 0;

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

  public isAnimation = true;
  public isAutoswitchPage = true;

  constructor(private eventService: EventService,
    public accessCpnService: AccessCpnService,
    public modelService: ModelService,
    private editorPanelService: EditorPanelService) {

    this.initEvents();
  }

  initEvents() {
    this.eventService.on(Message.SIMULATION_STARTED, () => { });
    this.eventService.on(Message.SIMULATION_STOPED, () => this.onStopSimulation());
    this.eventService.on(Message.SHAPE_HOVER, (event) => this.onShapeHover(event));
    this.eventService.on(Message.SHAPE_SELECT, (event) => this.onShapeSelect(event));
    this.eventService.on(Message.SIMULATION_SELECT_BINDING, (event) => this.onSimulationSelectBinding(event));
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
            this.accessCpnService.doStep(element.cpnElement._id).then(() => {
              this.animateModelEditor();
            });
            break;
          case this.SINGLE_STEP_CHOOSE_BINDING:
            this.accessCpnService.getBindings(element.cpnElement._id).then((data) => {
              if (data) {
                this.eventService.send(Message.SERVER_GET_BINDINGS, { data: data });
              }
            });
            break;
        }
      }
    }
  }

  animateModelEditor() {
    const modelEditor = this.editorPanelService.getSelectedModelEditor();
    console.log(this.constructor.name, 'animateModelEditor(), page = ', modelEditor);

    if (modelEditor) {
      modelEditor.updateElementStatus(this.isAnimation).then(() => {
        console.log(this.constructor.name, 'animateModelEditor(), modelEditor.updateElementStatus(), COMPLETE');
        this.onSimulationAnimateComplete();
      });
    }
  }


  onSimulationSelectBinding(event) {
    if (!this.accessCpnService.isSimulation) {
      return;
    }

    const element = event.element;

    if (element && element.type && element.type === 'cpn:Transition' && event.binding) {
      this.accessCpnService.doStepWithBinding(element.cpnElement._id, event.binding.bind_id).then(() => {
        this.animateModelEditor();
      });
    }
  }

  onSimulationAnimateComplete() {
    switch (this.mode) {
      case this.MULTI_STEP:
        this.runMultiStep();
        break;
    }
  }

  onSimulationStepDone() {
    return new Promise((resolve, reject) => {

      const firedData = this.accessCpnService.getFiredData();

      const readyData = this.accessCpnService.getReadyData();
      // stop simulation steps if no ready data
      if (Object.keys(readyData).length === 0) {
        this.multiStepCount = 0;
      }

      if (firedData && firedData.length > 0) {
        const page = this.modelService.getPageByElementId(firedData[0]);

        // let needLoadPage = true;
        // const modelEditorList = this.editorPanelService.getModelEditorList();
        // for (const modelEditor of modelEditorList) {
        //   if (modelEditor.pageId === page._id) {
        //     needLoadPage = false;
        //     break;
        //   }
        // }

        if (page && this.isAutoswitchPage) {
          // this.eventService.send(Message.PAGE_OPEN, { pageObject: page });
          this.editorPanelService.getEditorPanelComponent().openModelEditor(page).then(() => {
            resolve();
          });
        }
      }

      resolve();

    });
  }

  public getAnimationDelay() {
    switch (this.mode) {
      case this.MULTI_STEP:
        return (+this.simulationConfig.multi_step.delay);
      default:
        return 1000;
    }
  }

  runMultiStep() {
    const timeFromLastStep = new Date().getTime() - this.multiStepLastTimeMs;

    let delay = (+this.simulationConfig.multi_step.delay) - timeFromLastStep;
    if (delay < 0) {
      delay = 0;
    }

    console.log(this.constructor.name, 'runMultiStep(), this.multiStepCount = ', this.multiStepCount);
    console.log(this.constructor.name, 'runMultiStep(), delay = ', delay);

    setTimeout(() => {
      if (this.multiStepCount > 0) {
        this.accessCpnService.doStep('multistep').then(() => {
          this.multiStepCount--;
          this.multiStepLastTimeMs = new Date().getTime();
          this.onSimulationStepDone().then(() => {
            this.animateModelEditor();
          });
        });
      }
    }, delay);
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