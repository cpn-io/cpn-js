import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as X2JS from 'src/lib/x2js/xml2json.js';
import { EventService } from './event.service';
import { Message } from '../common/message';
import { xmlBeautify } from '../../lib/xml-beautifier/xml-beautifier.js';
import { CpnServerUrl } from 'src/cpn-server-url';
import { cloneObject } from '../common/utils';

@Injectable()
export class AccessCpnService {

  sessionId;
  userSessionId;
  initNetProcessing;
  initSimProcessing;
  simInitialized = false;
  isSimulation = false;
  errorData = [];
  tokenData = [];
  readyData = [];
  stateData;

  constructor(private http: HttpClient,
    private eventService: EventService) {

    this.eventService.on(Message.SERVER_INIT_NET, (event) => {
      console.log('AccessCpnService(), SERVER_INIT_NET, data = ', event);
      if (event) {
        this.initNet(event.projectData, event.complexVerify);
      }
    });
  }

  getErrorData() {
    return this.errorData;
  }

  getTokenData() {
    if (!this.isSimulation) {
      return [];
    }

    return this.tokenData;
  }

  getReadyData() {
    if (!this.isSimulation) {
      return [];
    }

    const readyData = {};
    for (const id of this.readyData) {
      readyData[id] = 'Transition is ready.';
    }
    return readyData;
  }

  getStateData() {
    if (!this.isSimulation) {
      return undefined;
    }
    return this.stateData;
  }

  /**
   * Generate new user session
   */
  generateUserSession() {
    this.userSessionId = 'CPN-USER-SESSION-' + new Date().getTime();
    console.log('generateUserSession - new id -', this.userSessionId);
    return this.userSessionId;
  }

  /**
   * Get current user session
   */
  getUserSessionId() {
    return this.userSessionId;
  }

  /**
   * Access/CPN API
   */
  initNet(cpnJson, complexVerify) {
    if (this.initNetProcessing) {
      return;
    }

    if (!this.sessionId) {
      this.sessionId = 'CPN-IDE-SESSION-' + new Date().getTime();
    }

    console.log('AccessCpnService, initNet(), START, this.sessionId = ', this.sessionId);

    const x2js = new X2JS();
    let cpnXml = x2js.json2xml_str(cloneObject(cpnJson));

    cpnXml = cpnXml.toString('iso-8859-1');
    cpnXml = xmlBeautify(cpnXml);

    this.initNetProcessing = true;
    this.eventService.send(Message.SERVER_INIT_NET_START, {});

    localStorage.setItem('cpnXml', JSON.stringify(cpnXml));

    this.errorData = [];

    // complexVerify = true;
    localStorage.setItem('cpnXml', cpnXml);

    const url = CpnServerUrl.get() + '/api/v2/cpn/init';
    this.http.post(url, { xml: cpnXml, complex_verify: complexVerify }, { headers: { 'X-SessionId': this.sessionId } })
      .subscribe(
        (data: any) => {
          console.log('AccessCpnService, initNet(), SUCCESS, data = ', data);
          this.initNetProcessing = false;

          this.saveErrorData(data);

          this.eventService.send(Message.SERVER_INIT_NET_DONE, { data: data, errorIssues: data.issues });

          // Init simulator
          // if (!this.simInitialized) {
          //   this.initSim();
          // }
        },
        (error) => {
          console.error('AccessCpnService, initNet(), ERROR, data = ', error);
          this.initNetProcessing = false;
          this.eventService.send(Message.SERVER_INIT_NET_ERROR, { data: error });
        }
      );
  }

  saveErrorData(data) {
    this.errorData = [];

    if (!data.success) {
      for (const id of Object.keys(data.issues)) {
        for (const issue of data.issues[id]) {
          issue.description = issue.description.replace(issue.id + ':', '');
          issue.description = issue.description.replace(issue.id, '');
          issue.description = issue.description.replace(':', '');
          issue.description = issue.description.trim();
          this.errorData[issue.id] = issue.description;
        }
      }
    }
  }

  /**
   * Reset simulator initialization flag
   */
  resetSim() {
    this.simInitialized = false;
    this.generateUserSession();
  }

  /**
   * Initialize access/cpn simulator
   */
  initSim() {
    if (this.initSimProcessing) {
      return;
    }

    this.simInitialized = false;

    this.tokenData = [];
    this.readyData = [];
    this.stateData = undefined;

    if (!this.sessionId) {
      this.sessionId = 'CPN-IDE-SESSION-' + new Date().getTime();
    }

    this.initSimProcessing = true;
    this.eventService.send(Message.SERVER_INIT_SIM_START, {});

    console.log('AccessCpnService, initSim(), START, this.sessionId = ', this.sessionId);

    const url = CpnServerUrl.get() + '/api/v2/cpn/sim/init';
    this.http.get(url, { headers: { 'X-SessionId': this.sessionId } }).subscribe(
      (data: any) => {
        this.initSimProcessing = false;
        console.log('AccessCpnService, initSim(), SUCCESS, data = ', data);
        this.simInitialized = true;

        this.eventService.send(Message.SERVER_INIT_SIM_DONE, { data: data });
        // Get token marks and transition
        if (data) {
          this.tokenData = data.tokensAndMark;
          this.eventService.send(Message.SERVER_GET_TOKEN_MARKS, { data: this.tokenData });
          this.readyData = data.enableTrans;
          this.eventService.send(Message.SERVER_GET_TRANSITIONS, { data: this.readyData });

        }

        //this.getTokenMarks();
        //this.getTransitions();
      },
      (error) => {
        this.initSimProcessing = false;
        console.error('AccessCpnService, initSim(), ERROR, data = ', error);

        this.eventService.send(Message.SERVER_INIT_SIM_ERROR, { data: error });
      }
    );
  }


  /**
   * Get token/marking state from simulator
   */
  getTokenMarks() {
    console.log('AccessCpnService, getTokenMarks(), this.sessionId = ', this.sessionId);

    if (!this.simInitialized || !this.sessionId) {
      return;
    }

    this.tokenData = [];

    const url = CpnServerUrl.get() + '/api/v2/cpn/sim/marks';
    this.http.get(url, { headers: { 'X-SessionId': this.sessionId } }).subscribe(
      (data: any) => {
        console.log('AccessCpnService, getTokenMarks(), SUCCESS, data = ', data);

        this.tokenData = data;

        this.eventService.send(Message.SERVER_GET_TOKEN_MARKS, { data: data });
      },
      (error) => {
        console.error('AccessCpnService, getTokenMarks(), ERROR, data = ', error);
      }
    );
  }

  /**
   * Get transitions state from simulator
   */
  getTransitions() {
    console.log('AccessCpnService, getTransitions(), this.sessionId = ', this.sessionId);

    if (!this.simInitialized || !this.sessionId) {
      return;
    }

    this.readyData = [];

    const url = CpnServerUrl.get() + '/api/v2/cpn/sim/transitions/enabled';
    this.http.get(url, { headers: { 'X-SessionId': this.sessionId } }).subscribe(
      (data: any) => {
        console.log('AccessCpnService, getTransitions(), SUCCESS, data = ', data);

        this.readyData = data;

        this.eventService.send(Message.SERVER_GET_TRANSITIONS, { data: data });
      },
      (error) => {
        console.error('AccessCpnService, getTransitions(), ERROR, data = ', error);
      }
    );
  }


  /**
   * Do simulation step for transition
   * @param transId - transition id
   */
  doStep(transId) {
    if (!this.simInitialized || !this.sessionId) {
      return;
    }

    const url = CpnServerUrl.get() + '/api/v2/cpn/sim/step/' + transId; // ID1412328496
    this.http.get(url, { headers: { 'X-SessionId': this.sessionId } }).subscribe(
      (data: any) => {
        console.log('AccessCpnService, doStep(), SUCCESS, data = ', data);
        if (data) {
          this.tokenData = data.tokensAndMark;
          this.eventService.send(Message.SERVER_GET_TOKEN_MARKS, { data: this.tokenData });
          this.readyData = data.enableTrans;
          this.eventService.send(Message.SERVER_GET_TRANSITIONS, { data: this.readyData });
        }

        this.getSimState();
      },
      (error) => {
        console.error('AccessCpnService, doStep(), ERROR, data = ', error);
      }
    );
  }

  doStepWithBinding(transId, bindId) {
    if (!this.simInitialized || !this.sessionId) {
      return;
    }

    const postData = {
      bind_id: bindId
    };

    console.log('AccessCpnService, doStepWithBinding(), postData = ', postData);

    // POST /api/v2/cpn/sim/step_with_binding/{transId}
    const url = CpnServerUrl.get() + '/api/v2/cpn/sim/step_with_binding/' + transId;
    this.http.post(url, postData, { headers: { 'X-SessionId': this.sessionId } }).subscribe(
      (data: any) => {
        console.log('AccessCpnService, doStepWithBinding(), SUCCESS, data = ', data);
        if (data) {
          this.tokenData = data.tokensAndMark;
          this.eventService.send(Message.SERVER_GET_TOKEN_MARKS, { data: this.tokenData });
          this.readyData = data.enableTrans;
          this.eventService.send(Message.SERVER_GET_TRANSITIONS, { data: this.readyData });

          this.getSimState();
        }
      },
      (error) => {
        console.error('AccessCpnService, doStepWithBinding(), ERROR, data = ', error);
      }
    );
  }


  doMultiStepFF(options) {
    if (!this.simInitialized || !this.sessionId) {
      return;
    }

    const postData = options;

    console.log('AccessCpnService, doMultiStepFF(), postData = ', postData);

    // POST /api/v2/cpn/sim/step_with_binding/{transId}
    const url = CpnServerUrl.get() + '/api/v2/cpn/sim/step_fast_forward';
    this.http.post(url, postData, { headers: { 'X-SessionId': this.sessionId } }).subscribe(
      (data: any) => {
        console.log('AccessCpnService, doStepWithBinding(), SUCCESS, data = ', data);
        if (data) {
          this.tokenData = data.tokensAndMark;
          this.eventService.send(Message.SERVER_GET_TOKEN_MARKS, { data: this.tokenData });
          this.readyData = data.enableTrans;
          this.eventService.send(Message.SERVER_GET_TRANSITIONS, { data: this.readyData });

          this.getSimState();
        }
      },
      (error) => {
        console.error('AccessCpnService, doStepWithBinding(), ERROR, data = ', error);
      }
    );
  }


  /**
   * Get bindings for transition
   * @param transId - transition id
   */
  getBindings(transId) {
    if (!this.simInitialized || !this.sessionId) {
      return;
    }

    const url = CpnServerUrl.get() + '/api/v2/cpn/sim/bindings/' + transId; // ID1412328496
    this.http.get(url, { headers: { 'X-SessionId': this.sessionId } }).subscribe(
      (data: any) => {
        console.log('AccessCpnService, getBindings(), SUCCESS, data = ', data);
        if (data) {
          this.eventService.send(Message.SERVER_GET_BINDINGS, { data: data });
        }
      },
      (error) => {
        console.error('AccessCpnService, getBindings(), ERROR, data = ', error);
      }
    );
  }

  getSimState() {
    if (!this.simInitialized || !this.sessionId) {
      return;
    }

    this.stateData = undefined;

    const url = CpnServerUrl.get() + '/api/v2/cpn/sim/state';
    this.http.get(url, { headers: { 'X-SessionId': this.sessionId } }).subscribe(
      (data: any) => {
        console.log('AccessCpnService, getSimState(), SUCCESS, data = ', data);
        if (data) {
          this.stateData = data;
          this.eventService.send(Message.SIMULATION_UPDATE_STATE);
        }
      },
      (error) => {
        console.error('AccessCpnService, getSimState(), ERROR, data = ', error);
      }
    );
  }


  public setIsSimulation(state) {
    this.isSimulation = state;
    this.eventService.send(Message.SIMULATION_UPDATE_STATE);
  }

  public getIsSimulation() {
    return this.isSimulation;
  }

  /**
   * Get token/marking state from simulator
   */
  getXmlFromServer() {
    return new Promise((resolve, reject) => {

      console.log('AccessCpnService, getXmlFromServer(), this.sessionId = ', this.sessionId);

      if (!this.sessionId) {
        reject('ERROR: sessionId not defined!');
      }

      const url = CpnServerUrl.get() + '/api/v2/cpn/xml/export';
      this.http.get(url, { headers: { 'X-SessionId': this.sessionId } }).subscribe(
        (data: any) => {
          console.log('AccessCpnService, getXmlFromServer(), SUCCESS, data = ', data);
          resolve(data);
        },
        (error) => {
          console.error('AccessCpnService, getXmlFromServer(), ERROR, data = ', error);
          reject(error);
        }
      );

    });
  }


}
