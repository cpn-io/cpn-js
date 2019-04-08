import {Component, EventEmitter, Input, Output} from '@angular/core';
import {TabComponent} from '../tabs/tab.component';

@Component({
  selector: 'tabs',
  templateUrl: './tabs.container.html',
  styleUrls: ['./tabs.container.scss']
})
export class TabsContainer {
  @Input() disabled: boolean;
  @Output() currentTabChange = new EventEmitter<TabComponent>();

  ifTabSelected: boolean = false;
  tabs: TabComponent[] = [];

  selectedTab: TabComponent;

  addTab(tab: TabComponent) {
    this.tabs.push(tab);
  }

  selectTab(tab: TabComponent) {
    // console.log('TabsContainer, this.tabs = ', this.tabs);
    // console.log('TabsContainer, tab = ', tab);

    this.selectedTab = undefined;

    this.tabs.forEach(tab => {
      tab.active = false;
    });
    tab.active = true;
    this.selectedTab = tab;
    this.currentTabChange.emit(tab);
  }

  isDisabled() {
    if (this.disabled) {
      return 'block';
    } else return 'none';
  }

  ngAfterViewInit() {
    this.tabs.forEach(tab => {
      if (tab.active) {
        this.selectTab(tab);
        this.ifTabSelected = true;
      }
    });
    if (!this.ifTabSelected && this.tabs.length > 0) {
      this.selectTab(this.tabs[0]);
    }
  }

  getTabByID(id: string) {
    var result = undefined;
    this.tabs.forEach(tab => {
      // console.log('getTabByID(), tab.id, id = ', tab.id, id);
      if (tab.id === id) {
        result = tab;
      }
    });
    return result;
  }

  deleteTabById(id: string) {
    // @ts-ignore
    this.tabs = this.tabs.filter(tab => tab.id !== id);
  }

  getSelectedTab() {
    return this.selectedTab;
  }

  clear() {
    this.tabs = [];
  }


}
