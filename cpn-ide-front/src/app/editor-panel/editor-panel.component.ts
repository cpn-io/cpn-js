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

import {ModelEditorComponent} from '../model-editor/model-editor.component';
import {TabsContainer} from './../tabs/tabs-container/tabs.container';
import {Message} from '../common/message';
import {EventService} from '../services/event.service';


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
    this.eventService.on(Message.PROJECT_LOAD, (data) => {
      this.loadProjectData(data);
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

  loadProjectData(data) {
    this.modelTabArray = [];
    this.mlTabArray = [];
    this.tabsComponent.clear();

    this.openMlEditor(data.project);
  }

  // subscribeToProject() {
  //   this.subscription = EmitterService.getAppMessageEmitter().subscribe((data: any) => {
  //     // console.log(data);
  //     if (data && data.id) {
  //
  //       // Load new project
  //       if (data.id === Constants.ACTION_PROJECT_LOAD_DATA) {
  //         console.log('TESTTTEMIT');
  //         this.modelTabArray = [];
  //         this.mlTabArray = [];
  //         this.tabsComponent.clear();
  //
  //         this.openMlEditor(data.project);
  //       }
  //
  //       // Open page
  //       if (data.id === Constants.ACTION_PAGE_OPEN) {
  //         this.openModelEditor(data.pageObject, data.subPages);
  //       }
  //     }
  //   });
  // }

  // @HostListener('window:resize', ['$event'])
  // onResize(event) {
  //   this.layout.updateSize();
  // }

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
    tabArray.push({id: id, title: name});

    setTimeout(() => {
      const tab = this.tabsComponent.getTabByID(id);
      if (tab) {
        this.tabsComponent.selectTab(tab);
      }
    }, 0);
  }

  addMlTab(tabArray, id, name, project) {
    tabArray.push({id: id, title: name});

    setTimeout(() => {
      const tab = this.tabsComponent.getTabByID(id);
      if (tab) {
        this.tabsComponent.selectTab(tab);
      }
    }, 0);
  }

  openModelEditor(pageObject, subPage) {
    // console.log('openPage(), pageObject = ', pageObject);

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
