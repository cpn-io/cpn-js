import { Injectable } from '@angular/core';
import * as X2JS from '../../lib/x2js/xml2json.js';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventService } from './event.service';
import { Message } from '../common/message';

import { AccessCpnService } from './access-cpn.service';
import { ModelService } from './model.service';
import { CpnServerUrl } from 'src/cpn-server-url.js';

/**
 * Common service for getting access to project data from all application
 */
@Injectable()
export class ProjectService {

  public modelName = '';
  public project = undefined;
  private currentSelectedElement;
  currentPageId;

  constructor(private eventService: EventService,
    private http: HttpClient,
    private modelService: ModelService,
    private accessCpnService: AccessCpnService
    ) {

    // console.log('ProjectService instance CREATED!');

    this.loadEmptyProject();
  }

  public getProject() {
    return this.project;
  }

  setCurrentElement(element) {
    console.log('Selected element - ' + element.name);
    this.currentSelectedElement = element;
  }

  getCurrentElement() {
    return this.currentSelectedElement;
  }


  /**
   * Load project file to ProjectService instance for getting access from all application
   *
   * @param {File} file
   */
  loadProjectFile(file: File) {
    const reader: FileReader = new FileReader();
    reader.readAsText(file);
    reader.onload = e => {
      const text: any = reader.result;
      // console.log('File text : ' + text);

      this.loadProjectXml(file.name, text);
    };
  }

  parseXml(xml) {
    let dom = null;
    try {
      dom = (new DOMParser()).parseFromString(xml, 'text/xml');
    } catch (e) {
      dom = null;
    }

    return dom;
  }

  /**
   * Loading project data from XML string, parse XML and converting to project JSON object for all application
   *
   * @param {string} filename
   * @param {string} projectXml
   */
  loadProjectXml(filename: string, projectXml: string) {
    this.modelName = filename;

    // const parser = new DOMParser();
    // const xml = parser.parseFromString(projectXml, 'text/xml');

    const xml = this.parseXml(projectXml);

    if (!xml) {
      return;
    }

    // localStorage.setItem('testProjectJson', '');
    // const testProjectJson = xml2json(xml, '  ');
    // localStorage.setItem('testProjectJson', testProjectJson);

    const x2js = new X2JS();
    const json = x2js.xml_str2json(projectXml);

    console.log('ProjectService, first convert -----> ', json);
    if (!json) {
      return;
    }

    localStorage.setItem('projectJson-1', JSON.stringify(json));

    this.project = { data: json, name: filename };

    // reset simulator for new project file
    this.accessCpnService.resetSim();

    // reset model service
    this.modelService.markNewModel();

    // load new project
    this.eventService.send(Message.PROJECT_LOAD, { project: this.project } );
  }

  loadEmptyProject() {
    const headers = new HttpHeaders()
      .set('Access-Control-Allow-Origin', '*')
      .set('Accept', 'application/xml');

    // const modelFile = 'baseModel_ID1008016.cpn';
    // const modelFile = 'discretemodel_task1.cpn';

    const modelFile = 'erdp.cpn';
    // const modelFile = 'hoponhopoff-color.cpn';
    // const modelFile = 'mscProtocol.cpn'

    // const modelFile = 'emptynet.cpn';

    // const modelFile = 'test-1.cpn';
    // const modelFile = 'test-2.cpn';

    // const modelFile = 'mynet.cpn';
    // const modelFile = 'mynet2.cpn';
    // const modelFile = 'mynet-sub-1.cpn';

    // const modelFile = 'mynet-for-sim.cpn';

    // const modelFile = 'fuelstation.cpn';

    // const modelFile = 'monitors.cpn';

    const url = './assets/cpn/' + modelFile;
    this.http.get(url, { headers: headers, responseType: 'text' })
      .subscribe(
        (response: any) => {
          // console.log('GET ' + url + ', response = ' + JSON.stringify(response));
          this.loadProjectXml(modelFile, response);
        },
        (error) => {
          console.error('GET ' + url + ', error = ' + JSON.stringify(error));
        }
      );
  }
}
