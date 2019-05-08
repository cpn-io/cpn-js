import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as X2JS from 'src/lib/x2js/xml2json.js';
import {ProjectService} from '../services/project.service';

@Injectable()
export class EmitterService {
  private static _emitters: { [channel: string]: EventEmitter<any> } = {};

  static get(channel: string): EventEmitter<any> {
    if (!this._emitters[channel]) {
      this._emitters[channel] = new EventEmitter();
    }
    return this._emitters[channel];
  }

  public static getApplicationErrorEmitter() {
    return this.get('applicationError');
  }

  public static getAppMessageEmitter() {
    return this.get('appMessage');
  }

  constructor(private http: HttpClient, private projectService: ProjectService) {
  }


  public postData(net: string, jsonnet: any) {
    // let temp;
    const headers = new HttpHeaders()
      .set('Access-Control-Allow-Origin', '*')
      .set('Accept', 'application/xml');
    // console.log('NET --' + net);
    // console.log('NET --' + JSON.stringify(net).toString());

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/xml', // <- To SEND XML
        'Accept': 'application/xml',       // <- To ask for XML
        'Response-Type': 'text'             // <- b/c Angular understands text
      })
    };
    // return this.http.post('api/cpn/verify', [{'xml': 'fun factorial n = if n <= 1 then 1 else factorial (n-1) * n; ' +
    //  'fun aux n = if n > 11 then  () else ( print (Int.toString n ^ "!=" ^ Int.toString (factorial n) ^ " "); aux (n + 1)); aux 0;'}]);
    //  return this.http.post('api/cpn/verify', [{'xml': JSON.parse(JSON.stringify(jsonnet))}]);
    // const xml = temp.size >0 ? '<userid>1</userid><title>title here</title><body>body text</body>' : temp ;
    //  return this.http.post('api/cpn/verify', net,  httpOptions);
    // return this.http.post('api/cpn/verify', [{'xml': net}]);
  }


  verifyAllNet(netJson: any) {
    // console.log('NET --js' + JSON.stringify(netJson));
    const x2js = new X2JS();
    //   const gr = this.getXMlDescription(netJson);
    const xml = (x2js.json2xml_str(JSON.parse(JSON.stringify(netJson)))); /// netJson
    // console.log('NET xml--' + xml);
    let userId = this.projectService.getUserSessionId();
    console.log('verifyAllNet generate sessionID --', userId)
    return this.http.post('api/cpn/verifi', [{ 'xml': xml, 'sessionId': userId ? userId : this.projectService.generateUserSession()}]);
    // return this.http.post('api/cpn/verifi', [{'xml': JSON.stringify(netJson)}]);
  }

  getMarking(id: String) {
    console.log('getMarking for place ' + id);
    let userId = this.projectService.getUserSessionId();
    return this.http.post('api/cpn/marking', [{ 'id': id ? id : '', 'sessionId': userId }]);
  }

  makeStep(id: String) {
    console.log('makeStep for trans ' + id);
    let userId = this.projectService.getUserSessionId();
    return this.http.post('api/cpn/step', [{ 'id': id, 'sessionId': userId }]);
  }

  getEnableTransitions(id: String) {
    console.log('getMarking for place ' + id);
    let userId = this.projectService.getUserSessionId();
    return this.http.post('api/cpn/enable', [{ 'id': id, 'sessionId': userId }]);
  }


  getXMlDescription(netJson: any): any {
    let cpnet;

    if (netJson.workspaceElements) {
      if (netJson.workspaceElements instanceof Array) {
        for (const workspaceElement of netJson.workspaceElements) {
          if (workspaceElement.cpnet) {
            cpnet = workspaceElement.cpnet;
            break;
          }
        }
      } else {
        if (netJson.workspaceElements.cpnet) {
          cpnet = netJson.workspaceElements.cpnet;
        }
      }
    }
    //  const retres = this.removeProp(netJson, 'Functions')


    const nCpnet = this.removeProp(netJson, 'Aux');


    /*if (cpnet) {
      if (cpnet.globbox) {
        if (cpnet.globbox.block) {
          // GlobBox
          // --------------------------------------
           for (let block in cpnet.globbox.block) {
             // console.log('fdfdfdfdfdfdfffffff'+cpnet.globbox.block['1'])
             // Parameters
             // -------------------------------
             var idBlolock = cpnet.globbox.block[block].id
             if (idBlolock === 'Variables') {
               delete cpnet.globbox.block[block];
              // console.log('NET  cpnet.globboxb[block]--' + cpnet.globbox.block[block].id);
             }
             if (idBlolock === 'Functions') {
               delete cpnet.globbox.block[block];
               // console.log('NET  cpnet.globboxb[block]--' + cpnet.globbox.block[block].id);
             }

             if (idBlolock === 'Parameters') {
               delete cpnet.globbox.block[block];
               // console.log('NET  cpnet.globboxb[block]--' + cpnet.globbox.block[block].id);
             }
             if (idBlolock === 'Types') {
               delete cpnet.globbox.block[block];
               // console.log('NET  cpnet.globboxb[block]--' + cpnet.globbox.block[block].id);
             }
             // -------------------------------
           }
        }
      }
    }*/
    return nCpnet;
  }


  removeProp(obj, propName) {

    for (const p in obj) {

      if (obj.hasOwnProperty(p)) {

        if (p === propName) {
          delete obj[p];

        } else if (typeof obj[p] === 'object') {
          this.removeProp(obj[p], propName);
        }
      }
    }
    return obj;
  }

  postDataSml(sml: string) {
    console.log('NET --sml' + sml);
    /*  const x2js = new X2JS();
      const json = (x2js.json2xml_str( JSON.parse(JSON.stringify(netJson)) ))
      console.log('NET --' + json);*/
    return this.http.post('api/cpn/verify', [{ 'sml': sml, 'sessionId': 'testid' }]);
    // return this.http.post('api/cpn/verify', [{'xml': JSON.stringify(netJson)}]);
  }


  postDataOriginXMl(netXml: string) {
    console.log('NET --' + netXml);
    return this.http.post('api/cpn/verify', [{ 'xml': netXml, 'sessionId': 'testid' }]);
  }
}
