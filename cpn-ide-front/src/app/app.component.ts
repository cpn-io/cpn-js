import { Component, HostListener } from '@angular/core';
import { ElectronService } from 'ngx-electron';
import { SettingsService } from './services/settings.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'CPN-IDE';

  constructor(
    private electronService: ElectronService,
    private settings: SettingsService) {

    // const p = new Place({ x: 1, y: 2 });
    // p._z = 234;
    // console.log('TEST, p = ', p);
    // console.log('TEST, p = ', JSON.stringify(p));
  }

  launchWindow() {
    this.electronService.shell.openExternal('http://yandex.ru');
  }

  @HostListener('document:contextmenu', ['$event'])
  onContextMenu(e) {
    console.log('AppComponent.onContextMenu, e = ', e);

    e.preventDefault();
  }
}
