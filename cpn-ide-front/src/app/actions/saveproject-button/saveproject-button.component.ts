import {Component, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import * as FileSaver from 'file-saver';
import {ModelService} from '../../services/model.service';
import * as X2JS from '../../../x2js/xml2json';

@Component({
  selector: 'app-saveproject-button',
  templateUrl: './saveproject-button.component.html',
  styleUrls: ['./saveproject-button.component.scss']
})
export class SaveprojectButtonComponent implements OnInit {

  fileNameInput = 'myPetriNet';

  constructor(private modal: NgbModal,
              private modelService: ModelService) {
  }

  ngOnInit() {
  }

  open(modalName) {
    this.modal.open(modalName, {ariaLabelledBy: 'modal-basic-title', centered: true}).result.then((result) => {

      const x2js = new X2JS();
      const xml = (x2js.json2xml_str(JSON.parse(JSON.stringify(this.modelService.getProjectData())))); /// netJson

      let bytes = []; // chars

      for (let i = 0; i < xml.length; ++i) {
        const char = xml.charAt(i);
        bytes = bytes.concat(char);
      }

      this.saveAsText(bytes, this.fileName);
    }, (reason) => {
    });
  }

  private get fileName() {
    return `${this.fileNameInput}.cpn`;
  }

  private saveAsText(charArray: any, fileName: string) {

    const blob = new Blob(charArray, {type: 'text/plain;charset=utf-8'});
    FileSaver.saveAs(blob, fileName);
  }


}
