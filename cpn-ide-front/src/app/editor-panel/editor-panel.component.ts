import {
  Component,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
  Input,
} from "@angular/core";

import { ModelService } from "../services/model.service";
import { ModelEditorComponent } from "../model-editor/model-editor.component";
import { TabsContainer } from "../../lib/tabs/tabs-container/tabs.container";
import { Message } from "../common/message";
import { EventService } from "../services/event.service";
import { AccessCpnService } from "../services/access-cpn.service";
import { EditorPanelService } from "../services/editor-panel.service";
import { ApplicationService } from "../services/application.service";
import { ElementRef, AfterViewInit } from "@angular/core";

@Component({
  selector: "app-editor-panel",
  templateUrl: "./editor-panel.component.html",
  styleUrls: ["./editor-panel.component.scss"],
})
export class EditorPanelComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild("documentationIFrame") documentationIFrame: ElementRef;
  @ViewChild("tabsComponent") tabsComponent: TabsContainer;

  @ViewChildren(ModelEditorComponent)
  modelEditorList: QueryList<ModelEditorComponent>;

  @Input() public readyPagesIds: any;
  @Input() public errorPagesIds: any;

  pageTabArray = [];
  mlTabArray = [];
  docTabArray = [];

  currentTab = undefined;

  constructor(
    private eventService: EventService,
    private modelService: ModelService,
    public accessCpnService: AccessCpnService,
    private editorPanelService: EditorPanelService,
    public applicationService: ApplicationService
  ) {}

  ngOnInit() {
    this.editorPanelService.setEditorPanelComponent(this);

    this.eventService.on(Message.PROJECT_LOAD, () => this.loadProject());
    this.eventService.on(Message.TREE_SELECT_DECLARATION_NODE, () =>
      this.openMlEditor()
    );
    this.eventService.on(Message.PAGE_TAB_OPEN, (event) =>
      setTimeout(() => this.openModelEditor(event.pageObject).then(), 1000)
    );
    this.eventService.on(Message.PAGE_TAB_CLOSE, (event) =>
      this.deleteTab(event.id)
    );
    this.eventService.on(Message.PAGE_CHANGE_NAME, (event) =>
      this.changeName(event.id, event.name)
    );
  }

  ngAfterViewInit() {
    if (this.documentationIFrame) {
      this.documentationIFrame.nativeElement.src =
        "./assets/documentation/index.html";
    }
  }

  ngOnDestroy() {}

  loadProject() {
    this.pageTabArray = [];
    this.mlTabArray = [];
    this.docTabArray = [];
    this.currentTab = undefined;

    this.tabsComponent.clear();

    this.openMlEditor();
    this.openDocumentation();
  }

  currentTabChange(event = undefined) {
    console.log("currentTabChange(), event = ", event);

    const tab = this.tabsComponent.getSelectedTab();
    if (tab && tab !== this.currentTab) {
      const modelEditor = this.modelEditorList
        .toArray()
        .find((e) => e.id === "model_editor_" + tab.id);
      console.log("currentTabChange(), editor = ", modelEditor);

      this.editorPanelService.setSelectedModelEditor(modelEditor);

      // update status for selected editor
      // if (modelEditor) {
      //   modelEditor.updateElementStatus();
      // }
    }
    this.currentTab = tab;
  }

  deleteTab(id) {
    for (const i in this.pageTabArray) {
      if (this.pageTabArray[i].id === id) {
        console.log(
          "deleteTab(), i, this.modelTabArray[i] = ",
          i,
          this.pageTabArray[i]
        );
        this.pageTabArray.splice(parseInt(i, 0), 1);
        break;
      }
    }

    this.tabsComponent.deleteTabById(id);

    const tabs = this.tabsComponent.tabs;
    if (tabs && tabs.length > 0) {
      this.selectTab(tabs[tabs.length - 1].id);
    }
  }

  changeName(id, name) {
    const tab = this.tabsComponent.getTabByID(id);
    if (tab) {
      tab.tabTitle = name;
    }
  }

  selectTab(id) {
    setTimeout(() => {
      const tab = this.tabsComponent.getTabByID(id);
      if (tab) {
        this.tabsComponent.selectTab(tab);
      }
    }, 0);
  }

  openModelEditor(pageObject) {
    this.applicationService.isShowDocumentation = false;

    return new Promise((resolve, reject) => {
      console.log("openPage(), pageObject = ", pageObject);

      const tab = this.tabsComponent.getTabByID(pageObject._id);
      this.modelService.checkPaintElement();
      if (tab) {
        this.tabsComponent.selectTab(tab);
        resolve();
      } else {
        const tabAttrs = { id: pageObject._id, pageObject: pageObject };
        this.pageTabArray.push(tabAttrs);
        this.selectTab(tabAttrs.id);

        setTimeout(() => {
          if (this.modelEditorList) {
            const tab = this.tabsComponent.getSelectedTab();
            if (tab) {
              const modelEditor = this.modelEditorList
                .toArray()
                .find((e) => e.id === "model_editor_" + tab.id);
              this.editorPanelService.setSelectedModelEditor(modelEditor);
              if (modelEditor) {
                modelEditor.loadPage(pageObject).then(() => {
                  modelEditor.updateElementStatus().then(() => {
                    resolve();
                  });
                });
              }
            } else {
              resolve();
            }
          } else {
            resolve();
          }
        }, 0);
      }
    });
  }

  openMlEditor() {
    this.applicationService.isShowDocumentation = false;

    const pageId = "ml-editor";
    const pageName = "ML editor";

    let tab = this.tabsComponent.getTabByID(pageId);
    if (tab) {
      this.tabsComponent.selectTab(tab);
    } else {
      this.mlTabArray.push({ id: pageId, title: pageName });
      this.selectTab(pageId);
    }
  }

  openDocumentation() {
    const pageId = "documentation";
    const pageName = "Documentation";

    let tab = this.tabsComponent.getTabByID(pageId);
    if (tab) {
      this.tabsComponent.selectTab(tab);
    } else {
      this.docTabArray.push({ id: pageId, title: pageName });
      this.selectTab(pageId);
    }
  }
}
