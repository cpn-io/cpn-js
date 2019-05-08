import {Component, OnInit} from '@angular/core';
import {ProjectService} from '../../services/project.service';

@Component({
  selector: 'app-openproject-button',
  templateUrl: './openproject-button.component.html',
  styleUrls: ['./openproject-button.component.scss']
})
export class OpenprojectButtonComponent implements OnInit {

  constructor(private projectService: ProjectService) {
  }

  ngOnInit() {
  }

  uploadFile(event) {
    if (event && event.target && event.target.files) {
      const files: FileList = event.target.files;

      if (files.length === 0) {
        console.log('No file selected!');
        return;
      }

      const file: File = files[0];
      // load project file to ProjectService instance for getting access from all application
      this.projectService.loadProjectFile(file);

      // EmitterService.getAppMessageEmitter().emit(
      //   {
      //     id: Constants.ACTION_PROJECT_OPEN_FILE,
      //     text: 'OpenprojectButtonComponent. Open project event!',
      //     file: file
      //   });
    }
  }

}
