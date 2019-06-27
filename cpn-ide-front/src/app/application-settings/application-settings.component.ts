import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../services/settings.service';

@Component({
  selector: 'app-application-settings',
  templateUrl: './application-settings.component.html',
  styleUrls: ['./application-settings.component.scss']
})
export class ApplicationSettingsComponent implements OnInit {

  showTable = 'not';
  appSettingsKeys;
  appSettings;

  constructor(private settings: SettingsService) { }

  ngOnInit() {
    this.appSettings = this.settings.getAppSettings();
    this.appSettingsKeys = Object.keys(this.appSettings);
  }

  // @HostListener('document:keydown', ['$event'])
  keyEvent(event: KeyboardEvent) {
    console.log(this.constructor.name, 'keyEvent(), event = ', event);

    let code: number | string;

    if (event.code !== undefined) {
      code = event.code;
    } else if (event.keyCode !== undefined) {
      code = event.keyCode;
    }

    if (code === 'Enter' || code === 'NumpadEnter' || code === 13) {
      const htmlElement: HTMLInputElement = <HTMLInputElement>event.target;
      if (htmlElement && htmlElement.nodeName === 'TD') {
        if (htmlElement.offsetParent) {
          const htmlTableElement: HTMLTableElement = <HTMLTableElement>document.getElementById(htmlElement.offsetParent.id);

          if (htmlTableElement.id === 'application-settings-table') {
            const rows = htmlTableElement.rows.length;
            for (let i = 0; i < rows; i += 1) {
              const value = htmlTableElement.rows[i].cells[1].textContent;
              const name = htmlTableElement.rows[i].cells[0].textContent;
              this.appSettings[name] = value;
            }
          }

          this.showTable = 'application-settings-table';
          setTimeout(() => {
            this.showTable = 'not';
          }, 0);

        }

      }
    }

  }

}
