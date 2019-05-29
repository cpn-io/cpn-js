import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as X2JS from 'src/lib/x2js/xml2json.js';
import { EventService } from './event.service';
import { Message } from '../common/message';

@Injectable()
export class AccessCpnService {

  sessionId;
  userSessionId;
  initNetProcessing;
  initSimProcessing;
  simInitialized = false;

  constructor(private http: HttpClient,
    private eventService: EventService) {

    this.eventService.on(Message.SERVER_INIT_NET, (data) => {
      console.log('AccessCpnService(), SERVER_INIT_NET, data = ', data);
      if (data) {
        this.initNet(data.projectData);
      }
    });
  }

  /**
   * Generate new user session
   */
  generateUserSession() {
    this.userSessionId = 'ID' + new Date().getTime();
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
  initNet(cpnJson) {
    if (this.initNetProcessing) {
      return;
    }

    if (!this.sessionId) {
      this.sessionId = 'CPN-IDE-SESSION-' + new Date().getTime();
    }

    console.log('AccessCpnService, initNet(), START, this.sessionId = ', this.sessionId);

    const x2js = new X2JS();
    const cpnXml = x2js.json2xml_str(JSON.parse(JSON.stringify(cpnJson)));

    this.initNetProcessing = true;
    this.eventService.send(Message.SERVER_INIT_NET_START, {});

    localStorage.setItem('cpnXml', JSON.stringify(cpnXml));

    this.http.post('/api/v2/cpn/init', { 'xml': cpnXml }, { headers: { 'X-SessionId': this.sessionId } })
      .subscribe(
        (data: any) => {
          console.log('AccessCpnService, initNet(), SUCCESS, data = ', data);
          this.initNetProcessing = false;
          this.eventService.send(Message.SERVER_INIT_NET_DONE, { data: data });

          // Init simulator
          if (!this.simInitialized) {
            this.initSim();
          }
        },
        (error) => {
          console.error('AccessCpnService, initNet(), ERROR, data = ', error);
          this.initNetProcessing = false;
          this.eventService.send(Message.SERVER_INIT_NET_ERROR, { data: error });
        }
      );
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
    if (this.initNetProcessing) {
      return;
    }

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


  /**
   * Get token/marking state from simulator
   */
  getTokenMarks() {
    console.log('AccessCpnService, getTokenMarks(), this.sessionId = ', this.sessionId);

    if (!this.simInitialized || !this.sessionId) {
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

  /**
   * Get transitions state from simulator
   */
  getTransitions() {
    console.log('AccessCpnService, getTransitions(), this.sessionId = ', this.sessionId);

    if (!this.simInitialized || !this.sessionId) {
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
