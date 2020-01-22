import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { cloneObject } from '../common/utils';
import { DEFAULT_SETTINGS } from '../common/default-settings';
import {EventService} from './event.service';
import {Message} from '../common/message';

@Injectable()
export class SettingsService {
  public appSettings;

  constructor(private eventService: EventService) {
    this.loadLocalSettings();

    this.saveLocalSettings();
  }

  public loadLocalSettings() {
    const localSettings = localStorage.getItem('applicationSettings');

    console.log(this.constructor.name, 'loadLocalSettings(), localSettings = ', localSettings);

    if (localSettings) {
      this.appSettings = JSON.parse(localSettings);
    } else {
      this.appSettings = cloneObject(DEFAULT_SETTINGS);
    }

    console.log(this.constructor.name, 'loadLocalSettings(), this.appSettings = ', this.appSettings);
  }

  public saveLocalSettings(key?) {
    console.log(this.constructor.name, 'saveLocalSettings(), this.appSettings = ', this.appSettings);
    this.eventService.send(Message.SETTING_CHANGED, {key: key, value: this.appSettings[key]});
    localStorage.setItem('applicationSettings', JSON.stringify(this.appSettings));
  }

  public reset() {
    this.appSettings = cloneObject(DEFAULT_SETTINGS);

    this.saveLocalSettings();
  }

  public getServerUrl() {
    // if (this.appSettings['localServer'] == 1 || this.appSettings['localServer'] == 'true') {
    //   return '';
    // }
    return this.appSettings['serverAddress'];
  }
}
