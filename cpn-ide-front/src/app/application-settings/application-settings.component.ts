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

            localStorage.setItem('applicationSettings', JSON.stringify(this.appSettings));
          }

          this.showTable = 'application-settings-table';
          setTimeout(() => {
            this.showTable = 'not';
          }, 0);

        }

      }
    }

  }

  saveEditedData(event, item) {
    console.log('saveEditedData(), event, item = ', event, item);

    const htmlElement = event.srcElement || event.target;
    if (!htmlElement) {
      console.error('saveEditedData(), Error: fail to get html element, event = ', event);
      return;
    }

    let value = htmlElement.textContent;
  }

  getServerAddress() {
  }

  updateServerAddress(event) {
    console.log('updateServerAddress(), event = ', event);
  }

  getServerAddressList() {
    const addressList = [''];
    addressList.push('');
    addressList.push('http://localhost:8080');
    addressList.push('http://95.161.178.222:42020');
    return addressList;
  }

}
