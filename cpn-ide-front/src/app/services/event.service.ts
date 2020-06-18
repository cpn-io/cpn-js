import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';

interface Message {
  id: String;
  data: any;
}

type MessageCallback = (data: any) => void;

@Injectable()
export class EventService {
  private handler = new Subject<Message>();

  constructor() { }

  /**
   * Broadcasts message to subscribers
   */
  send(id: String, data?: any) {
    this.handler.next({ id, data });
  }

  /**
   * Handles subscription to messages
   */
  on(id: String, callback: MessageCallback): Subscription {

    // console.log('EventService.on(), this.handler = ', this.handler);

    return this.handler
      .filter(message => message.id === id)
      .map(message => message.data)
      .subscribe(callback);
  }
}
