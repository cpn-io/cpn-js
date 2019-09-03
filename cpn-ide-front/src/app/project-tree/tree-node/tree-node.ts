import { Component, Input } from "@angular/core";

@Component({
    selector: 'app-tree-node',
    template: `<div [ngClass]="{'selected': selected, 'node': true}" [style.color]="color">
                    <div class="caret">
                        <i [ngClass]="expanded ? 'fas fa-caret-down' : 'fas fa-caret-right'"></i>
                    </div>
                    <div class="title" [ngClass]="{ 'active' : expanded, 'bold': bold }">
                        {{ title }}
                    </div>
                </div>`,
    styleUrls: ['./tree-node.scss']
})
export class TreeNodeComponent {
    @Input() expanded = false;
    @Input() selected = false;
    @Input() title = '';
    @Input() bold = true;
    @Input() color = 'black';
}
