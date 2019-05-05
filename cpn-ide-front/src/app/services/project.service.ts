import {Injectable} from '@angular/core';
import * as X2JS from '../../lib/x2js/xml2json.js';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {EventService} from './event.service';
import {Message} from '../common/message';

/**
 * Common service for getting access to project data from all application
 */
@Injectable()
export class ProjectService {

  public modelName = '';
  public projectData = undefined;
  public appSettings = [];
  private currentSelectedElement;
  currentPageId;

  constructor(private eventService: EventService, private http: HttpClient) {
    console.log('ProjectService instance CREATED!');

    this.loadEmptyProject();
    this.setDefaultAppSettings();
  }

  public getProjectData() {
    return this.projectData;
  }

  public getAppSettings() {
    return this.appSettings;
  }

  setCurrentElement(element) {
    console.log('Selected element - ' + element.name)
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

  /**
   * Loading project data from XML string, parse XML and converting to project JSON object for all application
   *
   * @param {string} filename
   * @param {string} projectXml
   */
  loadProjectXml(filename: string, projectXml: string) {
    const parser = new DOMParser();
    this.modelName = filename;
    const xml = parser.parseFromString(projectXml, 'text/xml');

    if (!xml) {
      return;
    }

    const x2js = new X2JS();
    const json = x2js.xml_str2json(projectXml);

    console.log('ProjectService, first convert -----> ', json);
    if (!json) {
      return;
    }

    localStorage.setItem('projectJson', JSON.stringify(json));

    // EmitterService.getAppMessageEmitter().emit({
    //   id: Constants.ACTION_PROJECT_LOAD_DATA,
    //   project: {data: json, name: filename}
    // });

    this.projectData = { project: {data: json, name: filename}}

    this.eventService.send(Message.PROJECT_FILE_OPEN, this.projectData);
  }

  loadEmptyProject() {
    const headers = new HttpHeaders()
      .set('Access-Control-Allow-Origin', '*')
      .set('Accept', 'application/xml');

    // const modelFile = 'baseModel_ID1008016.cpn';
    //  const modelFile = 'discretemodel_task1.cpn';
    // const modelFile = 'erdp.cpn';
    // const modelFile = 'hoponhopoff-color.cpn';
    // const modelFile = 'mscProtocol.cpn'

    // const modelFile = 'emptynet.cpn';
    // const modelFile = 'test-1.cpn';
    const modelFile = 'mynet.cpn';

    const url = './assets/cpn/' + modelFile;
    this.http.get(url, {headers: headers, responseType: 'text'})
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

  setDefaultAppSettings() {
    this.appSettings['color'] = 'newColor';
    this.appSettings['var'] = 'newVar';
    this.appSettings['ml'] = 'newMl';
    this.appSettings['globref'] = 'newGlobref';
    this.appSettings['block'] = 'newblock';
    this.appSettings['type'] = 'UNIT';
    this.appSettings['initmark']  = 'empty';
    this.appSettings['code'] = 'empty';
    this.appSettings['cond'] = '[]';
    this.appSettings['time'] = '@++0.0';
    this.appSettings['priority'] = 'P_NORMAL';
    this.appSettings['annot'] = 'annot';
    this.appSettings['page'] = 'newpage';
  }

}
