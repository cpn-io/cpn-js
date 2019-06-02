import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as FileSaver from 'file-saver';
import { ModelService } from '../../services/model.service';
import * as X2JS from '../../../lib/x2js/xml2json';
import { AccessCpnService } from 'src/app/services/access-cpn.service';
import { xmlBeautify } from '../../../lib/xml-beautifier/xml-beautifier.js';

@Component({
  selector: 'app-saveproject-button',
  templateUrl: './saveproject-button.component.html',
  styleUrls: ['./saveproject-button.component.scss']
})
export class SaveprojectButtonComponent implements OnInit {

  fileNameModel: string;

  xmlPrefix = '<?xml version="1.0" encoding="iso-8859-1"?>\n<!DOCTYPE workspaceElements PUBLIC "-//CPN//DTD CPNXML 1.0//EN" "http://cpntools.org/DTD/6/cpn.dtd">\n';

  constructor(private modal: NgbModal,
    private modelService: ModelService,
    private accessCpnService: AccessCpnService) {
  }

  ngOnInit() {
  }

  open(modalName) {
    let idx = this.modelService.projectName.lastIndexOf('.');
    if (idx > 0) {
      this.fileNameModel = this.modelService.projectName.substr(0, idx);
    } else {
      this.fileNameModel = this.modelService.projectName;
    }

    this.modal.open(modalName, { ariaLabelledBy: 'modal-basic-title', centered: true }).result.then((result) => {
      const x2js = new X2JS();
      let xml = (x2js.json2xml_str(JSON.parse(JSON.stringify(this.modelService.getProjectData())))); /// netJson
      xml = `${this.xmlPrefix}\n${xml}`;

      xml = xmlBeautify(xml);

      this.saveAsText(xml, this.fileName);

      // this.accessCpnService.getXmlFromServer().then((data: any) => {
      //   console.log('AccessCpnService, saveAsText(), data.xml = ', data.xml);

      //   this.saveAsText(data.xml, this.fileName);
      // });

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
    const blob = new Blob([charArray], { type: 'application/xml; charset=iso-8859-1' });
    FileSaver.saveAs(blob, fileName);
  }

}
