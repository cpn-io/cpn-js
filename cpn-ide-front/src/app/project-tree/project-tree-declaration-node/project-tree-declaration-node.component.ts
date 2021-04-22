import {
  Component,
  OnInit,
  Input,
  DoCheck,
  SimpleChanges,
  OnChanges,
  AfterViewInit,
  ViewChild,
  ElementRef,
} from "@angular/core";
import { ModelService } from "../../services/model.service";
import { EventService } from "../../services/event.service";
import { Message } from "../../common/message";
import { parseUiDeclarartionType } from "./declaration-parser";
import { AccessCpnService } from "../../services/access-cpn.service";
import { ContextMenuComponent } from "../../context-menu/context-menu.component";
import { getNextId } from "../../common/utils";
import { ITreeNode } from "../tree-node/tree-node";
import { TreeData } from "../project-tree.component";
import { DataTypes } from "../../common/constants";
import { BufferService } from "../../services/buffer.service";

@Component({
  selector: "app-project-tree-declaration-node",
  templateUrl: "./project-tree-declaration-node.component.html",
  styleUrls: ["./project-tree-declaration-node.component.scss"],
})
export class ProjectTreeDeclarationNodeComponent
  implements OnInit, OnChanges, ITreeNode {
  @Input() public tree: TreeData;
  @Input() public parentBlock: any;
  @Input() public declaration: any;
  @Input() public type: any;
  @Input() public containerId: any;

  public focused = false;

  constructor(
    private eventService: EventService,
    private modelService: ModelService,
    public accessCpnService: AccessCpnService,
    private bufferService: BufferService
  ) {}

  ngOnInit() {
    if (this.tree && this.declaration && this.parentBlock) {
      this.tree.parents[this.declaration._id] = this.parentBlock._id;
      this.tree.cpnElements[this.declaration._id] = this.declaration;
    }

    this.updateErrors();
  }

  ngOnChanges(changes: SimpleChanges) {
    for (let propName in changes) {
      // console.log(this.constructor.name, `ngOnChanges(), ${propName}: currentValue = ${cur}, previousValue = ${prev}`);
      if (propName === "errorData") {
        this.updateErrors();
      }
    }
  }

  updateErrors() {
    // console.log(this.constructor.name, 'updateErrors()');
  }

  getText() {
    let layout = this.modelService.cpnDeclarationToString(
      this.type,
      this.declaration
    );

    let declarationType = parseUiDeclarartionType(layout);

    if (
      this.focused ||
      declarationType === "ml" ||
      this.accessCpnService.errorIds.includes(this.declaration._id) ||
      layout.startsWith("(*")
    ) {
      return layout;
    }

    let regex = /[^\s]+\s+[^\s^\(^\:]+/;
    let transformed = regex.exec(layout);
    return transformed && transformed.length > 0 ? transformed[0] : layout;
  }

  isFiltered() {
    if (!this.tree.filter || this.tree.filter === "") {
      return true;
    }

    let layout = this.modelService.cpnDeclarationToString(
      this.type,
      this.declaration
    );

    if (layout.toLowerCase().includes(this.tree.filter.toLowerCase())) {
      return true;
    }

    return false;
  }

  setSelected(cpnParentElement, cpnElement, type) {
    this.tree.selected.treeNodeComponent = this;

    this.tree.selected.parentCpnElement = cpnParentElement;
    this.tree.selected.id = cpnElement._id;
    this.tree.selected.type = type;
    this.tree.selected.cpnElement = cpnElement;

    this.eventService.send(Message.TREE_SELECT_DECLARATION_NODE_NEW, {
      cpnType: type,
      cpnElement: cpnElement,
      cpnParentElement: cpnParentElement,
    });
  }

  onNewDeclaration() {
    console.log(
      this.constructor.name,
      "onNewDeclaration(), declaration = ",
      this.declaration
    );

    const newDeclaration = this.modelService.newDeclaration(
      this.parentBlock,
      this.type,
      this.tree.selected.cpnElement
    );
    if (newDeclaration) {
      this.focus(newDeclaration._id);
    }
  }

  onNewBlock() {
    console.log(
      this.constructor.name,
      "onNewBlock(), declaration = ",
      this.declaration
    );

    let parentElement = this.parentBlock;
    if (parentElement) {
      const newBlock = { id: "New block", _id: getNextId() };
      this.modelService.addCpnElement(parentElement, newBlock, "block");

      // set selected to new block
      this.setSelected(parentElement, newBlock, "block");

      this.focus(newBlock._id);
    }
  }

  focus(id) {
    setTimeout(() => {
      if (this.tree && this.containerId) {
        console.log(
          this.constructor.name,
          "focus(), this.containerId = ",
          this.containerId
        );

        const container = document.getElementById(this.containerId);

        if (container) {
          const inputElem: any = container.querySelector("#" + id);
          if (inputElem) {
            inputElem.focus();
          }
        }
      }
    }, 100);
  }

  // ITreeNode implements

  onSelect() {
    this.setSelected(this.parentBlock, this.declaration, this.type);
  }

  newSelect(parentBlock, declaration, type) {
    this.setSelected(parentBlock, declaration, type);
  }

  onClick() {
    this.onSelect();
  }

  onExpand() {
    throw new Error("Method not implemented.");
  }

  getMoveToSubEntries() {
    const subEntries = [];
    const allBlocks = this.modelService.getAllBlocks();
    allBlocks.forEach((block) => {
      subEntries.push({
        title: block.id,
        action: () => {
          // alert('Move to block ' + b.id)
          this.bufferService.cutObject(this.declaration, this.type);
          this.bufferService.pasteObject(block);
        },
        iconClass: "fas fa-cube",
      });
    });
    return subEntries;
  }

  onContextMenu(event) {
    if (this.tree && this.tree.contextMenu) {
      event.preventDefault();

      const entries = [];

      entries.push({
        title: "New declaration",
        action: () => this.onNewDeclaration(),
        iconClass: "fas fa-code",
      });
      if (this.tree && this.tree.treeType === "tree") {
        entries.push({
          title: "New block",
          action: () => this.onNewBlock(),
          iconClass: "fas fa-cube",
        });
      }
      entries.push({ title: "separator" });
      entries.push({
        title: "Cut",
        action: () => this.bufferService.cutObject(this.declaration, this.type),
        iconClass: "fas fa-cut",
      });
      entries.push({
        title: "Copy",
        action: () =>
          this.bufferService.copyObject(this.declaration, this.type),
        iconClass: "fas fa-copy",
      });
      if (
        !this.bufferService.isEmpty() &&
        !this.bufferService.isEqualTo(DataTypes.monitor)
      ) {
        entries.push({
          title: "Paste",
          action: () => this.bufferService.pasteObject(this.parentBlock),
          iconClass: "fas fa-paste",
        });
      }
      entries.push({ title: "separator" });
      // entries.push({title: 'Move to', action: () => this.bufferService.moveToObject(this.declaration, this.type), iconClass: 'fas fa-angle-double-right'});
      entries.push({
        title: "Move to",
        subEntries: this.getMoveToSubEntries(),
        iconClass: "fas fa-angle-double-right",
      });
      entries.push({ title: "separator" });
      entries.push({
        title: "Delete",
        action: () => this.onDelete(),
        iconClass: "fas fa-minus",
      });

      this.tree.contextMenu.setEntries(entries);
      this.tree.contextMenu.show({ x: event.clientX, y: event.clientY });
    }
  }

  onKeydown(event: any = undefined) {
    console.log(this.constructor.name, "onKeydown(), event = ", event);

    if (event.shiftKey) {
      switch (event.code) {
        case "Insert":
          event.preventDefault();
          this.onNewDeclaration();
          break;
        case "Delete":
          event.preventDefault();
          this.onDelete();
          break;
        case "ArrowUp":
          event.preventDefault();
          this.onUp();
          break;
        case "ArrowDown":
          event.preventDefault();
          this.onDown();
          break;
      }
    }
  }

  onUpdate(layout) {
    if (this.type !== "monitor") {
      this.modelService.updateDeclaration(
        this.declaration,
        this.type,
        this.parentBlock,
        layout
      );
    } else {
      this.declaration._name = layout;
    }
  }

  onNew(event: any = undefined) {
    this.onNewDeclaration();
  }

  onDelete(event: any = undefined) {
    this.modelService.removeCpnElement(
      this.parentBlock,
      this.declaration,
      this.type
    );
  }

  onUp(event: any = undefined) {
    this.modelService.moveCpnElement(
      this.parentBlock,
      this.declaration,
      this.type,
      "up"
    );
    this.focus(this.declaration._id);
  }

  onDown(event: any = undefined) {
    this.modelService.moveCpnElement(
      this.parentBlock,
      this.declaration,
      this.type,
      "down"
    );
    this.focus(this.declaration._id);
  }
}
