import {Component, Input} from '@angular/core';
import {TabsContainer} from '../tabs-container/tabs.container';

@Component({
  selector: 'tab',
  host: {
    '[class.hidden]': '!active'
  },
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss']
})
export class TabComponent {
  @Input() active: boolean = false;
  @Input() tabTitle: string;
  @Input() id: string;
  @Input() isHidden: boolean = false;
  @Input() error: boolean = false;

  public viewContainerRef;

  constructor(tabs: TabsContainer) {
    tabs.addTab(this);
  }

  // constructor(private viewContainer: ViewContainerRef) {
  //   this.viewContainerRef = viewContainer;
  // }

  getTabTitle() {
    return this.tabTitle;
  }

  // getRef() {
  //   return this.ref;
  // }
}
