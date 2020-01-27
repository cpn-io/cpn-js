import {Component, OnInit} from '@angular/core';
import {ProjectService} from '../../services/project.service';
import {IpcService} from '../../services/ipc.service';
import {Message} from '../../common/message';
import {EventService} from '../../services/event.service';

@Component({
  selector: 'app-openproject-button',
  templateUrl: './openproject-button.component.html',
  styleUrls: ['./openproject-button.component.scss']
})
export class OpenprojectButtonComponent implements OnInit {

  constructor(private projectService: ProjectService,
              private ipcService: IpcService,
              private eventService: EventService) {
  }

  ngOnInit() {
    this.ipcService.on(Message.MAIN_MENU_OPEN_PROJECT, () => {
      document.getElementById('imageOpen').click();
    });
  }

  uploadFile(event) {
    const message = 'Save the changes to file before closing?';
    if (confirm(message)) {
      this.eventService.send(Message.MAIN_MENU_SAVE_PROJECT);
      return;
    }

    if (event && event.target && event.target.files) {
      const files: FileList = event.target.files;

      if (files.length === 0) {
        console.log('No file selected!');
        return;
      }

      const file: File = files[0];
      this.projectService.loadProjectFile(file);
    }
  }

}
