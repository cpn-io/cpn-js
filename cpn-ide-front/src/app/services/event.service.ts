import { EventEmitter } from 'events';
import { Injectable } from '@angular/core';

@Injectable()
export class EventService {

  private events: EventEmitter;

  // private handlers = [];

  constructor() {
    this.events = new EventEmitter();
    this.events.setMaxListeners(100);
  }

  public on(id, func) {
    // this.handlers.push({ id, func });

    this.events.addListener(id, (event) => func(event));
  }

  public send(id, event = null, wait = false) {

    this.events.emit(id, event);

    // for (const handler of this.handlers) {
    //   if (handler && handler.id && handler.id === id) {
    //     if (wait) {
    //       handler.func(event);
    //     } else {
    //       setTimeout(() => {
    //         handler.func(event);
    //       }, 1);
    //     }
    //   }
    // }
  }
}
