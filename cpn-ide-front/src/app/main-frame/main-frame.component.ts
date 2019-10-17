import { Component, OnDestroy, OnInit } from '@angular/core';
import { Message } from '../common/message';
import { EventService } from '../services/event.service';
import { ModelService } from '../services/model.service';
import { ElementStatusService } from '../services/element-status.service';

@Component({
  selector: 'app-main-frame',
  // changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './main-frame.component.html',
  styleUrls: ['./main-frame.component.scss'],
})
export class MainFrameComponent implements OnInit, OnDestroy {
  localStorageName = 'angular-split-ws';

  explorerWidth = 25;

  gutterSize = 3;

  leftSplitPaneSize = 25;
  centerSplitPaneSize = 55;
  rightSplitPaneSize = 20;

  editorSplitPaneSize = 70;
  consoleSplitPaneSize = 30;

  constructor(private eventService: EventService, 
    public modelService: ModelService,
    public elementStatusService: ElementStatusService) {
  }

  ngOnInit() {
    // Subscribe on project load event
    this.eventService.on(Message.PROJECT_LOAD, (event) => {
      if (event.project) {
        this.loadProject(event.project);
      }
    });

    // if (localStorage.getItem(this.localStorageName)) {
    //   this.config = JSON.parse(localStorage.getItem(this.localStorageName));
    // }
    // else {
    //   this.resetConfig();
    // }

    this.eventService.on(Message.MODEL_EDITOR_FULLSCREEN, () => {
      console.log('MainFrameComponent, MODEL_EDITOR_FULLSCREEN');

      if (this.centerSplitPaneSize === 100) {
        this.leftSplitPaneSize = 25;
        this.rightSplitPaneSize = 20;
        this.consoleSplitPaneSize = 30;
      } else {
        this.leftSplitPaneSize = 0;
        this.rightSplitPaneSize = 0;
        this.consoleSplitPaneSize = 0;
      }

      this.centerSplitPaneSize = 100 - (this.leftSplitPaneSize + this.rightSplitPaneSize);
      this.editorSplitPaneSize = 100 - this.consoleSplitPaneSize;
    });
  }

  ngOnDestroy() {
  }

  loadProject(project: any) {
    console.log('MainFrameComponent, loadProject(), project = ', project);
    this.explorerWidth = 25;
  }
}
