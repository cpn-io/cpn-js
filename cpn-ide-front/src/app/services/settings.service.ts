import { Injectable } from '@angular/core';

@Injectable()
export class SettingsService {
  public appSettings = [];

  constructor() {
    this.setDefaultAppSettings();
  }

  public getAppSettings() {
    return this.appSettings;
  }

  setDefaultAppSettings() {
    this.appSettings['color'] = 'newColor';
    this.appSettings['var'] = 'newVar';
    this.appSettings['ml'] = 'newMl';
    this.appSettings['globref'] = 'newGlobref';
    this.appSettings['block'] = 'newblock';
    this.appSettings['type'] = 'UNIT';
    this.appSettings['initmark'] = 'INIT MARK';
    this.appSettings['code'] = 'input();\noutput();\naction();';
    this.appSettings['cond'] = '[]';
    this.appSettings['time'] = '@+';
    this.appSettings['priority'] = 'P_NORMAL';
    this.appSettings['annot'] = 'empty';

    this.appSettings['block'] = 'New block';
    this.appSettings['declaration'] = '(* Empty declaration *)';
    this.appSettings['page'] = 'New page';

    this.appSettings['ellipse'] = { h: 40, w: 70 };
    this.appSettings['box'] = { h: 40, w: 70 };
  }
}
