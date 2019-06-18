import { Injectable } from '@angular/core';

@Injectable()
export class EventService {
  private handlers = [];

  public on(id, func) {
    this.handlers.push({ id, func });
  }

  public send(id, event = null, wait = false) {
    for (const handler of this.handlers) {
      if (handler && handler.id && handler.id === id) {
        if (wait) {
          handler.func(event);
        } else {
          setTimeout(() => {
            handler.func(event);
          }, 1);
        }
      }
    }
  }
}
