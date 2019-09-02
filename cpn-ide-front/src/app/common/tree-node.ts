import { Component, Input } from "@angular/core";

@Component({
    selector: 'app-tree-node',
    template: `<div class="node">
                    <div class="caret">
                        <i [ngClass]="expanded ? 'fas fa-caret-down' : 'fas fa-caret-right'"></i>
                    </div>
                    <div class="title" [ngClass]="expanded ? 'active' : ''">
                        {{ title }}
                    </div>
                </div>`,
    styleUrls: ['./tree-node.scss']
})
export class TreeNodeComponent {
    @Input() expanded = false;
    @Input() title = '';
}
