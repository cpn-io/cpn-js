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
}
