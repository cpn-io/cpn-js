import { Component, Input } from "@angular/core";

@Component({
    selector: 'app-tree-node',
    templateUrl: './tree-node.html',
    styleUrls: ['./tree-node.scss']
})
export class TreeNodeComponent {
    @Input() public expanded = [];
    @Input() public selected:any = {};
    @Input() id = '';
    @Input() title = '';
    @Input() type = '';
    @Input() cpnElement: any;
    @Input() bold = true;
    @Input() color = 'black';
    @Input() showBullet = true;
    @Input() editable = false;
    @Input() error = false;
    @Input() ready = false;

    onClick() {
        this.expanded[this.id] = !this.expanded[this.id];
        this.selected.type = this.type;
        this.selected.id = this.id;
        this.selected.cpnElement = this.cpnElement;

        console.log(this.constructor.name, 'onClick(), this.selected = ', this.selected);
    }
}
