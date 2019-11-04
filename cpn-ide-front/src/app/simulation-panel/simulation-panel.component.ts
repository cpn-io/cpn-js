import { ModelService } from './../services/model.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AccessCpnService } from '../services/access-cpn.service';
import { SimulationService } from '../services/simulation.service';

@Component({
  selector: 'app-simulation-panel',
  templateUrl: './simulation-panel.component.html',
  styleUrls: ['./simulation-panel.component.scss']
})
export class SimulationPanelComponent implements OnInit, OnDestroy {

  constructor(public accessCpnService: AccessCpnService,
    public modelService: ModelService,
    public simulationService: SimulationService) {
    console.log(this.constructor.name, 'constructor');
  }

  ngOnInit() {
    console.log(this.constructor.name, 'ngOnInit()');

    this.simulationService.setMode(this.simulationService.mode);
  }

  ngOnDestroy() {
  }

  onRewind() {
    this.accessCpnService.initSim();
  }

  onRunMultiStep() {
    console.log(this.constructor.name, 'runMultiStep(), simulationConfig = ', this.simulationService.simulationConfig);

    this.simulationService.multiStepCount = this.simulationService.simulationConfig.multi_step.steps;
    this.simulationService.runMultiStep();
  }

  onRunMultiStepFF() {
    console.log(this.constructor.name, 'onRunMultiStepFF(), simulationConfig = ', this.simulationService.simulationConfig);
    this.simulationService.runMultiStepFF();
  }

}
