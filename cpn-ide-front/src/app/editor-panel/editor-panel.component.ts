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
import { ModelService } from '../services/model.service';
import { ModelEditorComponent } from '../model-editor/model-editor.component';
import { TabsContainer } from '../../lib/tabs/tabs-container/tabs.container';
import { Message } from '../common/message';
import { EventService } from '../services/event.service';
import { ElementStatusService } from '../services/element-status.service';


@Component({
  selector: 'app-editor-panel',
  templateUrl: './editor-panel.component.html',
  styleUrls: ['./editor-panel.component.scss']
})
export class EditorPanelComponent implements OnInit, OnDestroy {

  @ViewChild('tabsComponent') tabsComponent: TabsContainer;

  @ViewChildren(ModelEditorComponent) modelEditorList: QueryList<ModelEditorComponent>;

  pageTabArray = [];
  mlTabArray = [];
  constructor(private eventService: EventService, 
    private modelService: ModelService,
    public elementStatusService: ElementStatusService) {
  }

  ngOnInit() {
    // Subscribe on project load event
    this.eventService.on(Message.PROJECT_LOAD, (event) => {
      if (event.project) {
        this.loadProject(event.project);
      }
    });

    this.eventService.on(Message.TREE_SELECT_DECLARATION_NODE, (event) => {
      if (event && event.openEditorTab) {
        this.openMlEditor();
      }
    });

    this.eventService.on(Message.PAGE_OPEN, (event) => {
      this.openModelEditor(event.pageObject, event.subPages);
    });

    this.eventService.on(Message.PAGE_DELETE, (event) => {
      this.deleteTab(event.id);

      // const filteredList = this.modelEditorList.filter(e => e.pageId !== event.id);
      // this.modelEditorList.reset(filteredList);
      // if (filteredList.length === 0) {
      //   this.loadProject(this.modelService.project);
      // }
      // console.log('editor-panel delete page --- ', this.modelEditorList);
    });

    this.eventService.on(Message.PAGE_CHANGE_NAME, (event) => {
      this.changeName(event.id, event.name);
    });

  }

  ngOnDestroy() {
  }

  loadProject(project) {
    this.pageTabArray = [];
    this.mlTabArray = [];
    this.tabsComponent.clear();

    this.openMlEditor();
  }

  currentTabChange(event) {
    console.log('currentTabChange(), event = ', event);
  }

  deleteTab(id) {
    console.log('deleteTab(), modelTabArray = ', this.pageTabArray);
    console.log('deleteTab(), mlTabArray = ', this.mlTabArray);

    for (const i in this.pageTabArray) {
      if (this.pageTabArray[i].id === id) {
        console.log('deleteTab(), i, this.modelTabArray[i] = ', i, this.pageTabArray[i]);
        this.pageTabArray.splice(parseInt(i, 0), 1);
        break;
      }
    }

    this.tabsComponent.deleteTabById(id);
  }

  changeName(id, name) {
    const tab = this.tabsComponent.getTabByID(id);
    if (tab) {
      tab.tabTitle = name;
    }
  }

  addPageTab(tabArray, pageObject) {
    const tabAttrs = { id: pageObject._id, pageObject: pageObject };
    tabArray.push(tabAttrs);

    setTimeout(() => {
      const tab = this.tabsComponent.getTabByID(tabAttrs.id);
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
      this.addPageTab(this.pageTabArray, pageObject);

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
