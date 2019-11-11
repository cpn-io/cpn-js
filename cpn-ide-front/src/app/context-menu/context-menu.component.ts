import { Component, OnInit, Input, HostListener } from '@angular/core';

@Component({
  selector: 'app-context-menu',
  templateUrl: './context-menu.component.html',
  styleUrls: ['./context-menu.component.scss']
})
export class ContextMenuComponent implements OnInit {

  @Input() x = 0;
  @Input() y = 0;
  @Input() point = { x: 0, y: 0 };

  entries = [];
  visible = false;

  constructor() { }

  ngOnInit() {
  }

  @HostListener('document:click', ['$event'])
  onClick(e) {
    if (this.visible) {
      console.log(this.constructor.name, 'onClick, e = ', e);
      this.visible = false;
    }
  }
  @HostListener('document:contextmenu', ['$event'])
  onContextMenu(e) {
    if (this.visible) {
      console.log(this.constructor.name, 'onContextMenu, e = ', e);
      this.visible = false;
    }
  }

  public show(point) {
    this.point = point;
    this.x = point.x;
    this.y = point.y;

    setTimeout(() => { this.visible = true; }, 100);
  }

  public hide() {
    setTimeout(() => { this.visible = false; }, 100);
  }

  public setEntries(entries) {
    this.entries = entries;
  }
}
