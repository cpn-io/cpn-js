import { Injectable, OnInit } from '@angular/core';
import { EventService } from './event.service';
import { Message } from '../common/message';
import * as FileSaver from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private eventService: EventService) {
  }

  public saveAsText(charArray: string, fileName: string) {
    const blob = new Blob([charArray], { type: 'application/xml; charset=iso-8859-1' });
    FileSaver.saveAs(blob, fileName);

    this.eventService.send(Message.PROJECT_SAVED);
  }
  // public saveAsText(charArray: string, fileName: string) {
  //   const { dialog, app } = require('electron');
  //
  //   const options = {
  //     defaultPath: app.getPath('cpn') + '/erdp.cpn',
  //   };
  //   dialog.showSaveDialog(null, options, (path) => {
  //     console.log(path);
  //   });
  // }


}

// import { Injectable, OnInit } from '@angular/core';
// import {FileSaverService} from 'ngx-filesaver';
// import { EventService } from './event.service';
// import { Message } from '../common/message';
// import {Http, ResponseContentType} from '@angular/http';
// @Injectable({
//   providedIn: 'root'
// })
// export class FileService {
//
//
//   constructor(private _http: Http, private _FileSaverService: FileSaverService) {
//   }
//
//   public saveAsText(charArray: string, fileName: string) {
//       this._FileSaverService.save(new Blob([charArray], { type: 'application/xml; charset=iso-8859-1'}), `${fileName}.cpn`);
//
//   }
// }
