import { Component, Input, Output, EventEmitter } from "@angular/core";
import { TreeData } from "../project-tree.component";

export interface ITreeNode {
  onSelect();
  onClick();
  onExpand();
  onContextMenu(event);
  onKeydown(event);
  onUpdate(event);

  onNew(event);
  onDelete(event);
  onUp(event);
  onDown(event);
}

export class SelectedNode {
  type: string;
  id: string;
  cpnElement: any;
  parentCpnElement: any;
  treeNodeComponent: ITreeNode;

  reset() {
    this.type = undefined;
    this.id = undefined;
    this.cpnElement = undefined;
    this.parentCpnElement = undefined;
    this.treeNodeComponent = undefined;
  }

  clone(): SelectedNode {
    const newObject = new SelectedNode();
    newObject.type = this.type;
    newObject.id = this.id;
    newObject.cpnElement = this.cpnElement;
    newObject.parentCpnElement = this.parentCpnElement;
    newObject.treeNodeComponent = this.treeNodeComponent;
    return newObject;
  }
}

@Component({
  selector: "app-tree-node",
  templateUrl: "./tree-node.html",
  styleUrls: ["./tree-node.scss"],
})
export class TreeNodeComponent implements ITreeNode {
  @Input() public tree: any;

  @Input() id = "";
  @Input() title = "";
  @Input() type = "";
  @Input() cpnElement: any = undefined;
  @Input() bold = true;
  @Input() color = "black";
  @Input() showBullet = true;
  @Input() iconClass = undefined;

  @Input() editable = false;
  @Input() error = false;
  @Input() ready = false;

  @Output() contextmenuAction = new EventEmitter();
  @Output() keydownAction = new EventEmitter();
  @Output() updateAction = new EventEmitter();
  @Output() selectAction = new EventEmitter();
  @Output() inputAction = new EventEmitter();

  @Output() newAction = new EventEmitter();
  @Output() deleteAction = new EventEmitter();
  @Output() upAction = new EventEmitter();
  @Output() downAction = new EventEmitter();

  isExpanded() {
    return (
      (this.tree.filter && this.tree.filter !== "") ||
      this.tree.expanded[this.id]
    );
  }

  isFiltered() {
    if (!this.tree.filter || this.tree.filter === "") {
      return true;
    }

    if (this.title.toLowerCase().includes(this.tree.filter.toLowerCase())) {
      return true;
    }

    return false;
  }

  onInput(event) {
    this.inputAction.emit(event);
  }

  onSelect() {
    this.tree.selected.treeNodeComponent = this;

    this.tree.selected.type = this.type;
    this.tree.selected.id = this.id;
    this.tree.selected.cpnElement = this.cpnElement;

    this.selectAction.emit(event);
  }

  onClick() {
    this.tree.expanded[this.id] = true;

    this.onSelect();

    console.log(
      this.constructor.name,
      "onClick(), this.tree.selected = ",
      this.tree.selected
    );
  }

  onExpand() {
    this.tree.expanded[this.id] = !this.tree.expanded[this.id];

    this.onSelect();

    console.log(
      this.constructor.name,
      "onExpand(), this.tree.selected = ",
      this.tree.selected
    );
  }

  onContextMenu(event) {
    this.contextmenuAction.emit(event);
  }

  onKeydown(event) {
    this.keydownAction.emit(event);
  }

  onUpdate(event) {
    // this.updateAction.emit(event.target.textContent);
    this.updateAction.emit(event);
  }

  onNew(event: any) {
    this.newAction.emit(event);
  }
  onDelete(event: any) {
    this.deleteAction.emit(event);
  }
  onUp(event: any) {
    this.upAction.emit(event);
  }
  onDown(event: any) {
    this.downAction.emit(event);
  }
}
