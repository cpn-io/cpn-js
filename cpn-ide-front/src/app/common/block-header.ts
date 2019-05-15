import { Component, Input } from "@angular/core";

@Component({
    selector: 'app-block-header',
    template: `<div class="blockHeader">
    <span class="caret"><i [ngClass]="opened ? 'fas fa-caret-down' : 'fas fa-caret-right'"></i></span>
    <span [ngClass]="opened ? 'active' : ''">
      {{opened ? title + ' Details' : title + ' Layout'}}
    </span>
    </div>`
})
export class BlockHeaderComponent {
    @Input('opened') opened: boolean = false;
    @Input('title') title: string = '';
}