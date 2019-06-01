import {
  Component,
  ComponentFactoryResolver,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
  ViewContainerRef
} from '@angular/core';

import { ModelEditorComponent } from '../model-editor/model-editor.component';
import { TabsContainer } from './../tabs/tabs-container/tabs.container';
import { Message } from '../common/message';
import { EventService } from '../services/event.service';


@Component({
  selector: 'app-editor-panel',
  templateUrl: './editor-panel.component.html',
  styleUrls: ['./editor-panel.component.scss']
})
export class EditorPanelComponent implements OnInit, OnDestroy {

  @ViewChild('tabsComponent') tabsComponent: TabsContainer;

  @ViewChildren(ModelEditorComponent) modelEditorList: QueryList<ModelEditorComponent>;

  // subscription: Subscription;

  modelTabArray = [];
  mlTabArray = [];

  constructor(private eventService: EventService) {
  }

  ngOnInit() {
    // Subscribe on project load event
    this.eventService.on(Message.PROJECT_LOAD, (event) => {
      if (event.project) {
        this.loadProject(event.project);
      }
    });

    this.eventService.on(Message.PAGE_OPEN, (data) => {
      this.openModelEditor(data.pageObject, data.subPages);
    });

    this.eventService.on(Message.DELETE_PAGE, (data) => {
      this.deleteTab(data.id);
    });

    this.eventService.on(Message.CHANGE_NAME_PAGE, (data) => {
      this.changeName(data.id, data.name);
    });

  }

  ngOnDestroy() {
  }

  loadProject(data) {
    this.modelTabArray = [];
    this.mlTabArray = [];
    this.tabsComponent.clear();

    this.openMlEditor(data);
  }

  currentTabChange(event) {
    console.log('currentTabChange(), event = ', event);
  }

  deleteTab(id) {
    this.tabsComponent.deleteTabById(id);
  }

  changeName(id, name) {
    const tab = this.tabsComponent.getTabByID(id);
    if (tab) {
      tab.tabTitle = name;
    }
  }

  addTab(tabArray, id, name) {
    tabArray.push({ id: id, title: name });

    setTimeout(() => {
      const tab = this.tabsComponent.getTabByID(id);
      if (tab) {
        this.tabsComponent.selectTab(tab);
      }
    }, 0);
  }

  addMlTab(tabArray, id, name, project) {
    tabArray.push({ id: id, title: name });

    setTimeout(() => {
      const tab = this.tabsComponent.getTabByID(id);
      if (tab) {
        this.tabsComponent.selectTab(tab);
      }
    }, 0);
  }

  openModelEditor(pageObject, subPage) {
    console.log('openPage(), pageObject = ', pageObject);

    // var pageId = pageObject['@attributes'].id;
    // var pageName = pageObject.pageattr['@attributes'].name;
    const pageId = pageObject._id;
    const pageName = pageObject.pageattr._name;

    const tab = this.tabsComponent.getTabByID(pageId);

    if (tab) {
      this.tabsComponent.selectTab(tab);
    } else {

      this.addTab(this.modelTabArray, pageId, pageName);

      setTimeout(() => {
        if (this.modelEditorList) {
          const tab = this.tabsComponent.getSelectedTab();

          if (tab) {
            this.modelEditorList.forEach(editor => {
              if (editor.id === 'model_editor_' + tab.id) {
                editor.load(pageObject, subPage);
              }
            });
          }
        }
      }, 0);
    }
  }

  openMlEditor(project) {
    console.log('openMlEditor(), project = ', project);

    const pageId = 'ml-editor';
    const pageName = 'ML editor';

    const tab = this.tabsComponent.getTabByID(pageId);
    if (tab) {
      this.tabsComponent.selectTab(tab);
    } else {
      this.addMlTab(this.mlTabArray, pageId, pageName, project);

      setTimeout(() => {
        if (this.modelEditorList) {
          const tab = this.tabsComponent.getSelectedTab();
          if (tab) {
          }
        }
      }, 0);
    }
  }

}
