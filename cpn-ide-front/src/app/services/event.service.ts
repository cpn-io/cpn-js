import {Injectable} from '@angular/core';

@Injectable()
export class EventService {
  // private static _emitters: { [channel: string]: EventEmitter<any> } = {};
  //
  // static get(channel: string): EventEmitter<any> {
  //   if (!this._emitters[channel]) {
  //     this._emitters[channel] = new EventEmitter();
  //   }
  //   return this._emitters[channel];
  // }
  //
  // static getAppMessageEmitter() {
  //   return this.get('appMessage');
  // }
  //
  //
  // public static sendMessage(message: Message) {
  //   this.getAppMessageEmitter().emit(message);
  // }

  private handlers = [];

  public on(id, func) {
    this.handlers.push({id, func});
  }

  public send(id, data = undefined) {
    for (const handler of this.handlers) {
      if (handler && handler.id && handler.id === id) {
        setTimeout(() => {
          handler.func(data);
        }, 1);
      }
    }
  }
}
