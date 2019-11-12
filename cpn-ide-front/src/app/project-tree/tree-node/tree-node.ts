import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-tree-node',
    templateUrl: './tree-node.html',
    styleUrls: ['./tree-node.scss']
})
export class TreeNodeComponent {
    @Input() public tree: any;

    @Input() id = '';
    @Input() title = '';
    @Input() type = '';
    @Input() cpnElement: any = undefined;
    @Input() bold = true;
    @Input() color = 'black';
    @Input() showBullet = true;
    @Input() iconClass = undefined;

    @Input() editable = false;
    @Input() error = false;
    @Input() ready = false;

    @Output() contextmenuAction = new EventEmitter();
    @Output() keydownAction = new EventEmitter();
    @Output() updateAction = new EventEmitter();

    onSelect() {
        this.tree.selected.type = this.type;
        this.tree.selected.id = this.id;
        this.tree.selected.cpnElement = this.cpnElement;
    }

    onClick() {
        this.tree.expanded[this.id] = true;

        this.onSelect();

        console.log(this.constructor.name, 'onClick(), this.tree.selected = ', this.tree.selected);
    }

    onExpand() {
        this.tree.expanded[this.id] = !this.tree.expanded[this.id];

        this.onSelect();

        console.log(this.constructor.name, 'onExpand(), this.tree.selected = ', this.tree.selected);
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

}
