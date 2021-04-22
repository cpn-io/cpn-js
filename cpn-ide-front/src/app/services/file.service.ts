import { Injectable, OnInit } from "@angular/core";
import { EventService } from "./event.service";
import { Message } from "../common/message";
import * as FileSaver from "file-saver";
import { ElectronService } from "ngx-electron";
import { AccessCpnService } from "./access-cpn.service";

@Injectable({
  providedIn: "root",
})
export class FileService {
  constructor(
    private eventService: EventService,
    private electronService: ElectronService,
    private accessCpnService: AccessCpnService
  ) {}

  public saveAsText(charArray: string, fileName: string, callback: any) {
    // const blob = new Blob([charArray], { type: 'application/xml; charset=iso-8859-1' });
    // FileSaver.saveAs(blob, fileName);if(this.electronService)
    if (this.electronService.isElectronApp) {
      this.electronService.remote.dialog.showSaveDialog(
        {
          title: "SSave as",
          defaultPath: fileName,
          filters: [{ name: "CPN models", extensions: ["cpn", "CPN"] }],
        },
        (newFileName, bookmark) => {
          if (newFileName) {
            console.log("saveAsText bookmark", bookmark);
            const fs = this.electronService.remote.require("fs");
            fs.writeFileSync(newFileName, charArray);
            this.accessCpnService.setFc({ fs: fs, path: newFileName });
            callback(newFileName);
          } else {
            console.error(
              this.constructor.name,
              "onSaveProject(), ERROR filename, f = ",
              newFileName
            );
          }
        }
      );
    } else {
      const blob = new Blob([charArray], {
        type: "application/xml; charset=iso-8859-1",
      });
      FileSaver.saveAs(blob, fileName);
    }

    // this.eventService.send(Message.PROJECT_SAVED);
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
