import { Injectable } from '@angular/core';

@Injectable()
export class EventService {
  private handlers = [];

  public on(id, func) {
    this.handlers.push({ id, func });
  }

  public send(id, event = undefined) {
    for (const handler of this.handlers) {
      if (handler && handler.id && handler.id === id) {
        setTimeout(() => {
          handler.func(event);
        }, 1);
      }
    }
  }
}
