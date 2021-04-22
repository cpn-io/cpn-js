import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  ElementRef,
  DoCheck,
} from "@angular/core";
import { EventService } from "../services/event.service";
import { ModelService } from "../services/model.service";

import {
  nodeToArray,
  cloneObject,
  getNextId,
  arrayToNode,
} from "../common/utils";
import { Message } from "../common/message";
import { ContextMenuComponent } from "../context-menu/context-menu.component";
import { TreeData } from "../project-tree/project-tree.component";
import { DataTypes } from "../common/constants";

@Component({
  selector: "app-project-declarations",
  templateUrl: "./project-declarations.component.html",
  styleUrls: ["./project-declarations.component.scss"],
})
export class ProjectDeclarationsComponent
  implements OnInit, AfterViewInit, DoCheck {
  @ViewChild("contextMenu") contextMenu: ContextMenuComponent;

  public nodeToArray = nodeToArray;
  public JSON = JSON;

  public project;
  public cpnet;

  public tree = this.getDefaultTree();

  tabList = [
    { id: "all", name: "All", declarationType: "all" },
    { id: "globref", name: "Globref", declarationType: "globref" },
    { id: "color", name: "Color", declarationType: "color" },
    { id: "var", name: "Var", declarationType: "var" },
    { id: "ml", name: "ML", declarationType: "ml" },
    { id: "monitor", name: "Monitors", declarationType: "monitor" },
  ];

  constructor(
    public eventService: EventService,
    public modelService: ModelService
  ) {}

  ngOnInit() {
    this.eventService.on(Message.PROJECT_LOAD, () => this.loadProject());
    this.eventService.on(Message.MODEL_RELOAD, () => this.loadProject());
    this.eventService.on(Message.SERVER_INIT_NET_DONE, () =>
      this.dragAndDropHandler()
    );
    this.eventService.on(Message.SIMULATION_UPDATE_STATE, () =>
      this.loadProject()
    );
  }

  dragAndDropHandler() {
    const self = this;
    let dragSrcEl = null;
    setTimeout(function () {
      function handleDragStart(e) {
        this.style.opacity = "0.4";

        dragSrcEl = this;

        e.dataTransfer.effectAllowed = "move";
        e.dataTransfer.setData("text/html", this.innerHTML);
      }

      function handleDragEnd(e) {
        this.style.opacity = "1";

        items.forEach(function (item) {
          item.classList.remove("over");
        });
      }

      function handleDragOver(e) {
        if (e.preventDefault) {
          e.preventDefault();
        }

        return false;
      }

      function handleDragEnter(e) {
        this.classList.add("over");
      }

      function handleDragLeave(e) {
        this.classList.remove("over");
      }

      function searchElemForInsert(obj, parentObj, result, id, index) {
        for (let prop in obj) {
          if (obj[prop] === Object(obj[prop])) {
            searchElemForInsert(obj[prop], obj, result, id, prop);
          } else if (prop === "_id" && obj[prop] === id) {
            result.array = parentObj;
            result.index = index;
          }
        }
      }

      function handleDrop(e) {
        if (e.stopPropagation) {
          e.stopPropagation(); // stops the browser from redirecting.
        }

        if (dragSrcEl !== this) {
          // let objNew  = {
          //   id: "STRINGd",
          //   string: "",
          //   _id: "ID211222",
          // };
          // const testId = "ID85042";
          // let result = { array: undefined};
          // searchElemForInsert(self.cpnet.globbox.block, self.cpnet.globbox, result, testId, -1  );
          // console.log('drop',result);
          // let block = self.cpnet.globbox.block[1].color.push(objNew);
          // dragSrcEl.innerHTML = this.innerHTML;
          // console.log('drop', items);
          // for ( let i = 0; i < items.length; i++) {
          //   if (items[i] === this) {
          //     break;
          //   } else {
          //     dragSrcEl.innerHTML = items[i].innerHTML;
          //     items[i].innerHTML = e.dataTransfer.getData('text/html');
          //     dragSrcEl = items[i];
          //   }
          // }
          // this.innerHTML = e.dataTransfer.getData('text/html');

          let idFrom = dragSrcEl.id;
          let idTo = this.id;
          let resultFrom = { array: undefined, index: "-1" };
          let resultTo = { array: undefined, index: "-1" };
          searchElemForInsert(
            self.cpnet.globbox.block,
            self.cpnet.globbox,
            resultFrom,
            idFrom,
            resultFrom.index
          );
          searchElemForInsert(
            self.cpnet.globbox.block,
            self.cpnet.globbox,
            resultTo,
            idTo,
            resultTo.index
          );
          // resultTo.array.push(resultFrom.array[resultFrom.index]);
          // if (!(resultFrom.array.length)) {
          //   resultFrom.array.index = [resultFrom.array.index];
          // }
          // if (!(resultTo.array.length)) {
          //   resultTo.array.index = [resultTo.array.index];
          // }
          resultTo.array.splice(
            parseInt(resultTo.index, 10),
            0,
            resultFrom.array[resultFrom.index]
          );
          resultFrom.array.splice(parseInt(resultFrom.index, 10), 1);
          this.classList.remove("over");
        }

        return false;
      }

      // const items = document.getElementById('projectDeclarationsComponentContainer').querySelectorAll('.tab-container-with-toolbar .editablenode');
      const items = document.querySelectorAll(".editablenode");
      items.forEach(function (item) {
        item.addEventListener("dragstart", handleDragStart, false);
        item.addEventListener("dragenter", handleDragEnter, false);
        item.addEventListener("dragover", handleDragOver, false);
        item.addEventListener("dragleave", handleDragLeave, false);
        item.addEventListener("drop", handleDrop, false);
        item.addEventListener("dragend", handleDragEnd, false);
      });
    }, 400);
  }

  ngAfterViewInit() {
    this.loadProject();
  }

  ngDoCheck() {
    if (this.tree.selectedOld.id !== this.tree.selected.id) {
      this.tree.selectedOld = this.tree.selected.clone();
      this.onSelectedChange();
    }
  }

  reset() {
    this.tree = this.getDefaultTree();
  }

  getDefaultTree() {
    const treeData = new TreeData();
    treeData.reset();

    // Context menu
    treeData.contextMenu = this.contextMenu;

    // Tree component
    treeData.treeComponent = this;
    treeData.treeType = "declarations";

    return treeData;
  }

  loadProject() {
    this.reset();

    this.cpnet = this.modelService.getCpn();
    this.project = this.modelService.getProject();
  }

  // Toolbar action handlers
  onNewNode() {
    console.log(
      this.constructor.name,
      "onNewNode(), this.selected = ",
      this.tree.selected
    );
    if (this.tree.selected && this.tree.selected.treeNodeComponent) {
      this.tree.selected.treeNodeComponent.onNew(undefined);
    }
  }

  onDeleteNode() {
    console.log(
      this.constructor.name,
      "onDeleteNode(), this.selected = ",
      this.tree.selected
    );
    if (this.tree.selected && this.tree.selected.treeNodeComponent) {
      this.tree.selected.treeNodeComponent.onDelete(undefined);
    }
  }

  onUpNode() {
    console.log(
      this.constructor.name,
      "onUpNode(), this.selected = ",
      this.tree.selected
    );
    if (this.tree.selected && this.tree.selected.treeNodeComponent) {
      this.tree.selected.treeNodeComponent.onUp(undefined);
    }
  }

  onDownNode() {
    console.log(
      this.constructor.name,
      "onDownNode(), this.selected = ",
      this.tree.selected
    );
    if (this.tree.selected && this.tree.selected.treeNodeComponent) {
      this.tree.selected.treeNodeComponent.onDown(undefined);
    }
  }

  onFilterChanged(event) {
    console.log(this.constructor.name, "onFilterChanged(), event = ", event);
    this.tree.filter = event;
  }

  onSelectedChange() {
    switch (this.tree.selected.type) {
      case "monitor":
        this.eventService.send(Message.MONITOR_OPEN, {
          monitorObject: this.tree.selected.cpnElement,
        });
        break;
    }
  }

  onContextNewNode(block, type) {
    //  this.setSelected(block, block, 'var');
    // this.onNewNode();
    const newDeclaration = this.modelService.newDeclaration(
      block,
      type,
      undefined
    );
  }

  onContextMenu(newElemInfo) {
    const event = newElemInfo.event;
    const type = newElemInfo.type;
    if (newElemInfo.block) {
      this.onContextNewNode(newElemInfo.block, type);
    } else {
      const entries = [];
      for (const block of nodeToArray(
        type === "monitor"
          ? this.cpnet.monitorblock.monitorblock
          : this.cpnet.globbox.block
      )) {
        entries.push({
          title: block.id,
          action: () => this.onContextNewNode(block, type),
          iconClass: "fas fa-cube",
        });
      }
      // entries.push({ title: this, action: () => this. onNewNode(), iconClass: 'fas fa-cube' });
      // entries.push({ title: 'New page', action: () => this.onNewNode(), iconClass: 'fas fa-project-diagram' });
      if (entries.length > 0) {
        this.tree.contextMenu.setEntries(entries);
        this.tree.contextMenu.show({ x: event.clientX, y: event.clientY });
      }
    }
  }
}
