import { Injectable } from "@angular/core";
import { ElectronService } from "ngx-electron";

@Injectable({
  providedIn: "root",
})
export class IpcService {
  constructor(private electronService: ElectronService) {}

  public on(channel: string, listener: Function): void {
    if (this.electronService.ipcRenderer) {
      this.electronService.ipcRenderer.on(channel, listener);
    }
  }

  public send(channel: string, ...args): void {
    if (this.electronService.ipcRenderer) {
      this.electronService.ipcRenderer.send(channel, args);
    }
  }
}
