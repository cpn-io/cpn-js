import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as X2JS from 'src/lib/x2js/xml2json.js';
import { EventService } from './event.service';
import { Message } from '../common/message';
import { xmlBeautify } from '../../lib/xml-beautifier/xml-beautifier.js';
import { CpnServerUrl } from 'src/cpn-server-url';
import { cloneObject, clearArray } from '../common/utils';
import { ModelService } from './model.service';

@Injectable()
export class AccessCpnService {

  public isSimulation = false;


  public errorData = [];
  public errorIds = [];
  public errorPagesIds = [];

  public stateData = undefined;
  public readyData = [];
  public readyIds = [];
  public readyPagesIds = [];

  public firedTransIdList = [];

  public tokenData = [];
  public tokenDiff = [];
  public tokenPageId = undefined;

  sessionId;
  userSessionId;
  initNetProcessing;
  initSimProcessing;
  simInitialized = false;

  constructor(private http: HttpClient,
    private eventService: EventService,
    private modelService: ModelService) {

    this.eventService.on(Message.SERVER_INIT_NET, (event) => {
      console.log('AccessCpnService(), SERVER_INIT_NET, data = ', event);
      if (event) {
        this.initNet(event.projectData, event.complexVerify || false, event.restartSimulator || false);
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
      readyData[id] = 'Ready';
    }
    return readyData;
  }

  getStateData() {
    if (!this.isSimulation) {
      return undefined;
    }
    return this.stateData;
  }

  getFiredData() {
    if (!this.isSimulation) {
      return [];
    }
    return this.firedTransIdList;
  }


  updateErrorData(data) {
    clearArray(this.errorIds);
    clearArray(this.errorData);
    clearArray(this.errorPagesIds);

    if (!data.success) {
      for (const id of Object.keys(data.issues)) {
        for (const issue of data.issues[id]) {
          issue.description = issue.description.replace(issue.id + ':', '');
          issue.description = issue.description.replace(issue.id, '');
          issue.description = issue.description.replace(':', '');
          issue.description = issue.description.trim();

          this.errorData[issue.id] = issue.description;
          this.errorIds.push(issue.id);

          const page = this.modelService.getPageByElementId(issue.id);
          if (page && !this.errorPagesIds.includes(page._id)) {
            this.errorPagesIds.push(page._id);
          }
        }
      }
    }
    console.log(this.constructor.name, 'updateErrorData(), this.errorIds = ', this.errorIds);
    console.log(this.constructor.name, 'updateErrorData(), this.errorData = ', this.errorData);
    console.log(this.constructor.name, 'updateErrorData(), this.errorPagesIds = ', this.errorPagesIds);
  }

  updateReadyData(readyData) {
    this.readyData = readyData;

    clearArray(this.readyIds);
    clearArray(this.readyPagesIds);

    for (const id of readyData) {
      this.readyIds.push(id);

      const page = this.modelService.getPageByElementId(id);
      if (page && !this.readyPagesIds.includes(page._id)) {
        this.readyPagesIds.push(page._id);
      }
    }
  }

  updateFiredTrans(firedTransIdList) {
    this.firedTransIdList = firedTransIdList;
  }

  updateTokenData(tokenData) {
    // console.log('updateTokenData(), tokenData = ', JSON.stringify(tokenData));

    let prevTokenPageId = this.tokenPageId;
    this.tokenPageId = undefined;

    clearArray(this.tokenDiff);

    // find token difference
    for (const newToken of tokenData) {
      if (newToken.tokens > 0) {
        const oldToken = this.tokenData.find((e) => e.id === newToken.id);
        if (!oldToken || oldToken.tokens !== newToken.tokens) {
          this.tokenDiff.push(newToken);
        }
      }
    }
    console.log('updateTokenData(), this.tokenDiff = ', JSON.stringify(this.tokenDiff));

    if (this.tokenDiff.length > 0) {
      const placeId = this.tokenDiff[this.tokenDiff.length - 1].id;
      if (placeId) {
        const page = this.modelService.getPageByElementId(placeId);
        if (page) {
          if (page._id !== prevTokenPageId) {
            this.tokenPageId = page._id;
          }
        }
      }
    }

    clearArray(this.tokenData);

    for (const token of tokenData) {
      this.tokenData.push(token);

      // const page = this.modelService.getPageByElementId(id);
      // if (page && !this.readyPagesIds.includes(page._id)) {
      //   this.readyPagesIds.push(page._id);
      // }
    }

    if (this.tokenPageId && this.tokenPageId !== prevTokenPageId) {
      // this.eventService.send(Message.PAGE_OPEN, { pageObject: this.modelService.getPageById(this.tokenPageId) });
    }
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
  initNet(cpnJson, complexVerify = false, restartSimulator = false) {
    if (this.initNetProcessing) {
      return;
    }

    if (!this.sessionId) {
      this.sessionId = 'CPN-IDE-SESSION-' + new Date().getTime();
    }

    console.log('AccessCpnService, initNet(), START, this.sessionId = ', this.sessionId);
    console.log('AccessCpnService, initNet(), START, complexVerify = ', complexVerify);

    const x2js = new X2JS();
    let cpnXml = x2js.json2xml_str(cloneObject(cpnJson));

    cpnXml = cpnXml.toString('iso-8859-1');
    cpnXml = xmlBeautify(cpnXml);

    this.initNetProcessing = true;
    this.eventService.send(Message.SERVER_INIT_NET_START, {});

    localStorage.setItem('cpnXml', JSON.stringify(cpnXml));

    complexVerify = true;
    restartSimulator = true;

    localStorage.setItem('cpnXml', cpnXml);

    const url = CpnServerUrl.get() + '/api/v2/cpn/init';
    const body = {
      xml: cpnXml,
      complex_verify: complexVerify,
      need_sim_restart: restartSimulator
    };
    this.http.post(url, body, { headers: { 'X-SessionId': this.sessionId } })
      .subscribe(
        (data: any) => {
          console.log('AccessCpnService, initNet(), SUCCESS, data = ', data);
          this.initNetProcessing = false;

          this.updateErrorData(data);

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

  // saveErrorData(data) {
  //   this.errorData = [];

  //   if (!data.success) {
  //     for (const id of Object.keys(data.issues)) {
  //       for (const issue of data.issues[id]) {
  //         issue.description = issue.description.replace(issue.id + ':', '');
  //         issue.description = issue.description.replace(issue.id, '');
  //         issue.description = issue.description.replace(':', '');
  //         issue.description = issue.description.trim();
  //         this.errorData[issue.id] = issue.description;
  //       }
  //     }
  //   }

  //   this.updateErrorData(this.errorData);
  // }

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

    // this.tokenData = [];
    // this.readyData = [];
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
          this.updateTokenData(data.tokensAndMark);
          this.updateReadyData(data.enableTrans);
          this.updateFiredTrans(data.firedTrans);

          this.eventService.send(Message.SIMULATION_STEP_DONE);
        }
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

        this.eventService.send(Message.SIMULATION_STEP_DONE, { data: data });
      },
      (error) => {
        console.error('AccessCpnService, getTokenMarks(), ERROR, data = ', error);
      }
    );
  }

  /**
   * Do simulation step for transition
   * @param transId - transition id
   */
  doStep(transId) {
    if (!this.simInitialized || !this.sessionId) {
      return new Promise(() => {});
    }

    return new Promise((resolve, reject) => {

      const url = CpnServerUrl.get() + '/api/v2/cpn/sim/step/' + transId; // ID1412328496
      this.http.get(url, { headers: { 'X-SessionId': this.sessionId } }).subscribe(
        (data: any) => {
          console.log('AccessCpnService, doStep(), SUCCESS, data = ', data);
          if (data) {
            this.updateTokenData(data.tokensAndMark);
            this.updateReadyData(data.enableTrans);
            this.updateFiredTrans(data.firedTrans);

            this.eventService.send(Message.SIMULATION_STEP_DONE);
          }

          this.getSimState();
        },
        (error) => {
          console.error('AccessCpnService, doStep(), ERROR, data = ', error);
        }
      );

    });
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
          this.updateTokenData(data.tokensAndMark);
          this.updateReadyData(data.enableTrans);

          if (transId && (!data.firedTrans || data.firedTrans.length === 0)) {
            data.firedTrans = [transId];
          }
          this.updateFiredTrans(data.firedTrans);

          this.eventService.send(Message.SIMULATION_STEP_DONE);

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
          this.updateTokenData(data.tokensAndMark);
          this.updateReadyData(data.enableTrans);
          this.updateFiredTrans(data.firedTrans);

          this.eventService.send(Message.SIMULATION_STEP_DONE);

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

    if (!this.isSimulation) {
      this.stateData = undefined;
      this.readyData = [];
      this.readyIds = [];
      this.readyPagesIds = [];

      this.tokenData = [];
      this.tokenDiff = [];
      this.tokenPageId = undefined;
    }
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
