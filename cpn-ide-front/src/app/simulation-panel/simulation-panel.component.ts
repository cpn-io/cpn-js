import { ModelService } from "./../services/model.service";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { AccessCpnService } from "../services/access-cpn.service";
import { SimulationService } from "../services/simulation.service";

@Component({
  selector: "app-simulation-panel",
  templateUrl: "./simulation-panel.component.html",
  styleUrls: ["./simulation-panel.component.scss"],
})
export class SimulationPanelComponent implements OnInit, OnDestroy {
  constructor(
    public accessCpnService: AccessCpnService,
    public modelService: ModelService,
    public simulationService: SimulationService
  ) {
    console.log(this.constructor.name, "constructor");
  }

  ngOnInit() {
    console.log(this.constructor.name, "ngOnInit()");

    this.simulationService.setMode(this.simulationService.mode);
  }

  ngOnDestroy() {}

  onRewind() {
    this.accessCpnService.initSim();
  }

  onAnimation() {
    this.simulationService.isAnimation = !this.simulationService.isAnimation;
  }

  onAutoswitchPages() {
    this.simulationService.isAutoswitchPage = !this.simulationService
      .isAutoswitchPage;
  }

  onRunMultiStep() {
    if (this.simulationService.multiStepCount > 0) {
      this.simulationService.multiStepCount = 0;
      return;
    }
    console.log(
      this.constructor.name,
      "runMultiStep(), simulationConfig = ",
      this.simulationService.simulationConfig
    );

    this.simulationService.multiStepCount = this.simulationService.simulationConfig.multi_step.steps;
    this.simulationService.runMultiStep();
  }

  onRunMultiStepFF() {
    console.log(
      this.constructor.name,
      "onRunMultiStepFF(), simulationConfig = ",
      this.simulationService.simulationConfig
    );
    this.simulationService.runMultiStepFF();
  }

  onRunReplication() {
    console.log(
      this.constructor.name,
      "onRunReplication(), simulationConfig = ",
      this.simulationService.simulationConfig
    );
    this.simulationService.runReplication();
  }

  getMultistepProgress() {
    return (
      (100 *
        (this.simulationService.simulationConfig.multi_step.steps -
          this.simulationService.multiStepCount)) /
        this.simulationService.simulationConfig.multi_step.steps +
      "%"
    );
  }
}
