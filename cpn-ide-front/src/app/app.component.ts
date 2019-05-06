import {Component, HostListener} from '@angular/core';
import {ElectronService} from 'ngx-electron';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'cpn-ide';

  constructor(private electronService: ElectronService) {
  }

  launchWindow() {
    this.electronService.shell.openExternal('http://yandex.ru');
  }

  @HostListener('document:contextmenu', ['$event'])
  onContextMenu(e) {
    console.log("AppComponent.onContextMenu, e = ", e);

    e.preventDefault();
  }
}
