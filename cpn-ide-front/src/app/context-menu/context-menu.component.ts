import { Component, OnInit, Input, HostListener, ViewChild } from '@angular/core';

@Component({
  selector: 'app-context-menu',
  templateUrl: './context-menu.component.html',
  styleUrls: ['./context-menu.component.scss']
})
export class ContextMenuComponent implements OnInit {

  // Sub menu
  @ViewChild('subMenu') subMenu: ContextMenuComponent;

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

  get hasSubMenu() {
    return this.entries && this.entries.find(e => e.subEntries !== undefined) ? true : false;
  }

  onAction(entry) {
    if (entry && entry.action)  {
      entry.action()
    }
  }

  onShowSubmenu(event, entry) {
    // console.log('onShowSubmenu(), event = ', event);

    if (this.subMenu) {
      if (entry.subEntries) {
        const br = event.target.getBoundingClientRect();

        // const entries = [];
        // entries.push({ title: 'Declarations', action: () => alert('Declarations'), iconClass: 'fas fa-cube' });

        this.subMenu.setEntries(entry.subEntries);
        this.subMenu.show({ x: br.right - 2, y: br.top - 6 });
      } else {
        this.subMenu.hide();
      }
    }
  }

}
