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

  fileNameModel = 'myPetriNet';

  xmlPrefix = '<?xml version="1.0" encoding="iso-8859-1"?>\n<!DOCTYPE workspaceElements PUBLIC "-//CPN//DTD CPNXML 1.0//EN" "http://cpntools.org/DTD/6/cpn.dtd">';

  constructor(private modal: NgbModal,
              private modelService: ModelService) {
  }

  ngOnInit() {
  }

  open(modalName) {
    this.modal.open(modalName, {ariaLabelledBy: 'modal-basic-title', centered: true}).result.then((result) => {

      const x2js = new X2JS();
      let xml = (x2js.json2xml_str(JSON.parse(JSON.stringify(this.modelService.getProjectData())))); /// netJson
      xml = `${this.xmlPrefix}\n${xml}`;
      this.saveAsText(xml, this.fileName);

    }, (reason) => {
    });
  }

  /**
   * Полное имя файла с расширением
   */
  private get fileName() {
    return `${this.fileNameModel}.cpn`;
  }

  private saveAsText(charArray: string, fileName: string) {
    const blob = new Blob([charArray], {type: 'text/plain;charset=utf-8'});
    FileSaver.saveAs(blob, fileName);
  }

}
