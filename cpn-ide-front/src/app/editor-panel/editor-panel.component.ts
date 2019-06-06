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

    this.eventService.on(Message.SELECT_DECLARATION_NODE, (event) => {
      if (event && event.openEditorTab) {
        this.openMlEditor();
      }
    });

    this.eventService.on(Message.PAGE_OPEN, (event) => {
      this.openModelEditor(event.pageObject, event.subPages);
    });

    this.eventService.on(Message.DELETE_PAGE, (event) => {
      this.deleteTab(event.id);
    });

    this.eventService.on(Message.CHANGE_NAME_PAGE, (event) => {
      this.changeName(event.id, event.name);
    });

  }

  ngOnDestroy() {
  }

  loadProject(project) {
    this.modelTabArray = [];
    this.mlTabArray = [];
    this.tabsComponent.clear();

    this.openMlEditor();
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

  addMlTab(tabArray, id, name) {
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

  openMlEditor() {
    const pageId = 'ml-editor';
    const pageName = 'ML editor';

    let tab = this.tabsComponent.getTabByID(pageId);
    if (tab) {
      this.tabsComponent.selectTab(tab);
    } else {
      this.addMlTab(this.mlTabArray, pageId, pageName);

      setTimeout(() => {
        if (this.modelEditorList) {
          tab = this.tabsComponent.getSelectedTab();
          if (tab) {
          }
        }
      }, 0);
    }
  }

}
