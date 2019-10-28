import { Injectable, EventEmitter } from '@angular/core';
import { Message } from '../common/message';
import { Subject, Observable } from 'rxjs';

// @Injectable()
// export class EventService {

//   private events;

//   // private handlers = [];

//   constructor() {
//     this.events = new EventEmitter();
//     this.events.setMaxListeners(1000);
//   }

//   public on(id, func) {
//     // this.handlers.push({ id, func });

//     if (!this.events.listeners(id).includes(func)) {
//       this.events.addListener(id, (event) => func(event));
//     } else {
//       console.error(this.constructor.name, 'on(), listener exists!, id, func = ', id, JSON.stringify(func));
//     }
//   }

//   public send(id, event = null, wait = false) {

//     if (id === Message.SIMULATION_TOKEN_ANIMATE_COMPLETE) {
//       console.log(this.constructor.name, 'send(), Message.SIMULATION_TOKEN_ANIMATE_COMPLETE, listeners = ', this.events.listeners(id));
//     }

//     this.events.emit(id, event);

//     // for (const handler of this.handlers) {
//     //   if (handler && handler.id && handler.id === id) {
//     //     if (wait) {
//     //       handler.func(event);
//     //     } else {
//     //       setTimeout(() => {
//     //         handler.func(event);
//     //       }, 1);
//     //     }
//     //   }
//     // }
//   }

//   public remove(id, func) {
//       this.events.removeListener(id, func);

//       if (id === Message.SIMULATION_TOKEN_ANIMATE_COMPLETE) {
//         console.log(this.constructor.name, 'remove(), Message.SIMULATION_TOKEN_ANIMATE_COMPLETE, listeners = ', this.events.listeners(id));
//       }
//     }

// }



/////////////////////////////////////////////////////////////////////////////////////////////

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


