import { Injectable, EventEmitter } from '@angular/core';
import { Message } from '../common/message';
import { Subject, Observable } from 'rxjs';

@Injectable()
export class EventService {

  listeners = {};
  eventsSubject = new Subject();
  events;

  constructor() {
    this.listeners = {};
    this.eventsSubject = new Subject();

    this.events = Observable.from(this.eventsSubject);

    this.events.subscribe(
      ({ name, args }) => {
        if (this.listeners[name]) {
          for (let listener of this.listeners[name]) {
            listener(...args);
          }
        }
      });
  }

  on(name, listener) {
    if (!this.listeners[name]) {
      this.listeners[name] = [];
    }

    this.listeners[name].push(listener);
  }

  off(name, listener) {
    this.listeners[name] = this.listeners[name].filter(x => x != listener);
  }

  send(name, ...args) {
    this.eventsSubject.next({
      name,
      args
    });
  }
}


