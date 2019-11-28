import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../services/settings.service';

@Component({
  selector: 'app-application-settings',
  templateUrl: './application-settings.component.html',
  styleUrls: ['./application-settings.component.scss']
})
export class ApplicationSettingsComponent implements OnInit {

  Object = Object;

  public showTable = 'not';

  constructor(public settings: SettingsService) { }

  ngOnInit() {
  }

  getValueText(key) {
    // console.log('getValueText(), key = ', key, typeof this.settings.appSettings[key]);
    if (this.settings.appSettings[key] instanceof Object) {
      return JSON.stringify(this.settings.appSettings[key]);
    } else {
      return this.settings.appSettings[key];
    }
  }

  saveEditedData(event, key) {
    console.log('saveEditedData(), event, item = ', event, key);

    if (event.target) {
      const value = event.target.textContent;
      
      if (this.settings.appSettings[key] instanceof Object) {
        this.settings.appSettings[key] = JSON.parse(value);
      } else {
        this.settings.appSettings[key] = value;
      }

      this.settings.saveLocalSettings();
    }
  }

  getServerAddressList() {
    const addressList = [''];
    addressList.push('');
    addressList.push('http://localhost:8080');
    addressList.push('http://95.161.178.222:42020');
    return addressList;
  }

  onReset() {
    this.settings.reset();
  }

}
