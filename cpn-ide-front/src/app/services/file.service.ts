import {Injectable, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ModelService} from './model.service';
import {AccessCpnService} from './access-cpn.service';
import {EventService} from './event.service';
import * as FileSaver from 'file-saver';
import {Message} from '../common/message';

@Injectable()
export class FileService implements OnInit {

  constructor(private modal: NgbModal,
              private modelService: ModelService,
              private accessCpnService: AccessCpnService,
              private eventService: EventService) {
  }

  ngOnInit(): void {
  }

  public saveAsText(charArray: string, fileName: string) {
    const blob = new Blob([charArray], {type: 'application/xml; charset=iso-8859-1'});
    FileSaver.saveAs(blob, fileName);
    this.eventService.send(Message.PROJECT_SAVED);
  }

}
