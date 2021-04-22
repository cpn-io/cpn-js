import { ProjectService } from "./services/project.service";
import { Component, HostListener, OnDestroy, OnInit } from "@angular/core";
import { ElectronService } from "ngx-electron";
import { SettingsService } from "./services/settings.service";
import { AccessCpnService } from "./services/access-cpn.service";

// import { } from 'electron';
// import Fs from 'fs';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit, OnDestroy {
  title = "CPN-IDE";

  constructor(
    private electronService: ElectronService,
    private settings: SettingsService,
    public accessCpnService: AccessCpnService,
    public projectService: ProjectService
  ) {
    // //check if platform is electron
    // let isElectron: boolean = window && window['process'] && window['process'].type;
    // if (isElectron) {
    //   let fs: typeof Fs = window['require']('fs');
    //   let app: Electron.App = window['require']('electron').remote;
    //   console.log(fs, app, window['process']);
    // }
    // const p = new Place({ x: 1, y: 2 });
    // p._z = 234;
    // console.log('TEST, p = ', p);
    // console.log('TEST, p = ', JSON.stringify(p));
  }

  ngOnInit(): void {}
  ngOnDestroy(): void {}

  launchWindow() {
    this.electronService.shell.openExternal("http://yandex.ru");
  }

  @HostListener("document:contextmenu", ["$event"])
  onContextMenu(e) {
    console.log("AppComponent.onContextMenu, e = ", e);

    e.preventDefault();
  }
}
