import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Message} from '../common/message';
import {EventService} from '../services/event.service';
import {AccessCpnService} from '../services/access-cpn.service';
import {IpcService} from '../services/ipc.service';
import {getDefaultSplitSizes, getExpandedSplitSizes} from '../common/constants';
import {SplitSizes} from '../common/model';

@Component({
  selector: 'app-main-frame',
  // changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './main-frame.component.html',
  styleUrls: ['./main-frame.component.scss'],
})
export class MainFrameComponent implements OnInit, AfterViewInit {

  localStorageName = 'splitSettings';
  gutterSize = 3;

  expanded = false;
  panelsSize: SplitSizes;

  constructor(private eventService: EventService,
              public accessCpnService: AccessCpnService,
              private ipcService: IpcService) {
  }

  ngOnInit() {
    this.eventService.on(Message.MODEL_EDITOR_FULLSCREEN, () => this.toggleExpand());

    this.initSplitSizeSettings();
  }

  ngAfterViewInit(): void {
    this.ipcService.send('app.init.complete');
  }

  initSplitSizeSettings() {
    const settings = localStorage.getItem(this.localStorageName);
    this.panelsSize = settings ? JSON.parse(settings) : getDefaultSplitSizes();
  }

  toggleExpand() {
    if (!this.expanded) {
      this.panelsSize = getExpandedSplitSizes();
    } else {
      this.initSplitSizeSettings();
    }
    this.expanded = !this.expanded;
  }

  changeSplitSize(event, panel) {
    panel.size = event.sizes;
    localStorage.setItem(this.localStorageName, JSON.stringify(this.panelsSize));
  }

}
