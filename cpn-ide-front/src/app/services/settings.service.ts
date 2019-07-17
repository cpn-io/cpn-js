import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { getDefaultSettings } from '../common/default-settings';

@Injectable()
export class SettingsService {
  public appSettings;

  constructor(private http: HttpClient) {
    const localSettings = localStorage.getItem('applicationSettings');

    console.log(this.constructor.name, 'constructor(), localSettings = ', localSettings);

    if (localSettings) {
      this.appSettings = localSettings;
    } else {
      this.appSettings = getDefaultSettings();
      // this.loadDefaultSettings();
    }

    console.log(this.constructor.name, 'constructor(), this.appSettings = ', this.appSettings);
  }

  public getAppSettings() {
    return this.appSettings;
  }

  public saveLocalSettings() {
    localStorage.setItem('applicationSettings', this.appSettings);
  }

  loadDefaultSettings() {
    const headers = new HttpHeaders()
      .set('Access-Control-Allow-Origin', '*')
      .set('Accept', 'application/json');

    const url = './assets/app/default_settings.json';
    this.http.get(url, { headers: headers, responseType: 'text' })
      .subscribe(
        (response: any) => {
          this.appSettings = JSON.parse(response);
          console.log(this.constructor.name, 'loadDefaultSettings(), this.appSettings = ', this.appSettings);
        },
        (error) => {
          console.error(this.constructor.name, 'loadDefaultSettings(), url, error = ', url, error);
        }
      );
  }

}
