import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as X2JS from 'src/lib/x2js/xml2json.js';
import { EventService } from './event.service';
import { Message } from '../common/message';

@Injectable()
export class AccessCpnService {

  sessionId;
  initNetProcessing;
  initSimProcessing;

  simInitialized = false;

  userSessionId;

  constructor(private http: HttpClient,
    private eventService: EventService) {

    this.eventService.on(Message.SERVER_INIT_NET, (data) => {
      console.log('AccessCpnService(), SERVER_INIT_NET, data = ', data);
      if (data) {
        this.initNet(data.projectData);
      }
    });

  }

  generateUserSession() {
    this.userSessionId = 'ID' + new Date().getTime();
    console.log('generateUserSession - new id -', this.userSessionId);
    return this.userSessionId;
  }

  getUserSessionId() {
    return this.userSessionId;
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
    let userId = this.getUserSessionId();
    console.log('verifyAllNet generate sessionID --', userId)
    return this.http.post('api/cpn/verifi', [{ 'xml': xml, 'sessionId': userId ? userId : this.generateUserSession() }]);
    // return this.http.post('api/cpn/verifi', [{'xml': JSON.stringify(netJson)}]);
  }

  getMarking(id: String) {
    console.log('getMarking for place ' + id);
    let userId = this.getUserSessionId();
    return this.http.post('api/cpn/marking', [{ 'id': id ? id : '', 'sessionId': userId }]);
  }

  makeStep(id: String) {
    console.log('makeStep for trans ' + id);
    let userId = this.getUserSessionId();
    return this.http.post('api/cpn/step', [{ 'id': id, 'sessionId': userId }]);
  }

  getEnableTransitions(id: String) {
    console.log('getMarking for place ' + id);
    let userId = this.getUserSessionId();
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


  /**
   * new Access/CPN API
   */

  initNet(cpnJson) {
    if (!this.sessionId) {
      this.sessionId = 'CPN-IDE-SESSION-' + new Date().getTime();
    }

    // this.verifyAllNet(cpnJson);

    const x2js = new X2JS();
    const cpnXml = x2js.json2xml_str(JSON.parse(JSON.stringify(cpnJson)));

    this.initNetProcessing = true;

    this.eventService.send(Message.SERVER_INIT_NET_START, {});

    console.log('AccessCpnService, initNet(), START, this.sessionId = ', this.sessionId);

    this.http.post('/api/v2/cpn/init', { 'xml': cpnXml }, { headers: { 'X-SessionId': this.sessionId } })
      .subscribe(
        (data: any) => {
          this.initNetProcessing = false;

          console.log('AccessCpnService, initNet(), SUCCESS, data = ', data);

          // const elapsed = new Date().getTime() - timeStart;
          // this.logSuccess(data ? data : 'Complete in ' + this.timeConversion(elapsed) + '. Model is correct.');

          // if (data != null) {
          //   console.log('DATA FROM WEB VERIFY = ', data);
          // } else {
          //   this.success = true;
          //   this.parseErrorText(undefined);
          // }
          //  this.done = true;

          // console.log('VERIFICATION_DONE (2)');

          this.eventService.send(Message.SERVER_INIT_NET_DONE, { data: data });

          // Init simulator
          // if (data.success && !this.simInitialized) {
          if (!this.simInitialized) {
            this.initSim();
          }

          // Get token marks and transition
          // if (data.success && this.simInitialized) {
          //   this.getTokenMarks();
          //   this.getTransitions();
          // }
        },
        (error) => {
          this.initNetProcessing = false;

          console.error('AccessCpnService, initNet(), ERROR, data = ', error);

          this.eventService.send(Message.SERVER_INIT_NET_ERROR, { data: error });

          // const elapsed = new Date().getTime() - timeStart;
          // this.logError('Complete in ' + this.timeConversion(elapsed) + '. Error: ' + error.error.text);
          // this.parseErrorText(error.error.text);
        }
      );
  }

  resetSim() {
    this.simInitialized = false;
    this.generateUserSession();
  }

  initSim() {
    this.simInitialized = false;

    if (!this.sessionId) {
      this.sessionId = 'CPN-IDE-SESSION-' + new Date().getTime();
    }

    this.initSimProcessing = true;
    this.eventService.send(Message.SERVER_INIT_SIM_START, {});

    console.log('AccessCpnService, initSim(), START, this.sessionId = ', this.sessionId);

    this.http.get('/api/v2/cpn/sim/init', { headers: { 'X-SessionId': this.sessionId } }).subscribe(
      (data: any) => {
        this.initSimProcessing = false;
        console.log('AccessCpnService, initSim(), SUCCESS, data = ', data);
        this.simInitialized = true;

        this.eventService.send(Message.SERVER_INIT_SIM_DONE, { data: data });

        // Get token marks and transition
        this.getTokenMarks();
        this.getTransitions();
      },
      (error) => {
        this.initSimProcessing = false;
        console.error('AccessCpnService, initSim(), ERROR, data = ', error);

        this.eventService.send(Message.SERVER_INIT_SIM_ERROR, { data: error });
      }
    );
  }


  getTokenMarks() {
    // console.log('AccessCpnService, getTokenMarks(), this.sessionId = ', this.sessionId);

    if (!this.simInitialized)
      return;

    if (!this.sessionId) {
      return;
    }

    this.http.get('/api/v2/cpn/sim/marks', { headers: { 'X-SessionId': this.sessionId } }).subscribe(
      (data: any) => {
        console.log('AccessCpnService, getTokenMarks(), SUCCESS, data = ', data);
        this.eventService.send(Message.SERVER_GET_TOKEN_MARKS, { data: data });
      },
      (error) => {
        console.error('AccessCpnService, getTokenMarks(), ERROR, data = ', error);
      }
    );
  }


  getTransitions() {
    if (!this.simInitialized)
      return;

    if (!this.sessionId) {
      return;
    }

    this.http.get('/api/v2/cpn/sim/transitions/enabled', { headers: { 'X-SessionId': this.sessionId } }).subscribe(
      (data: any) => {
        console.log('AccessCpnService, getTransitions(), SUCCESS, data = ', data);
        this.eventService.send(Message.SERVER_GET_TRANSITIONS, { data: data });
      },
      (error) => {
        console.error('AccessCpnService, getTransitions(), ERROR, data = ', error);
      }
    );
  }

}
