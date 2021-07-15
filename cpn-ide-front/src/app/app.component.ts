import { ProjectService } from "./services/project.service";
import { Component, HostListener, OnDestroy, OnInit } from "@angular/core";
import { ElectronService } from "ngx-electron";
import { SettingsService } from "./services/settings.service";
import { AccessCpnService } from "./services/access-cpn.service";
import { ValidationService } from "./services/validation.service";
import { EventService } from "./services/event.service";
import { Message } from "./common/message";

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
    public projectService: ProjectService,
    public validationService: ValidationService,
    private eventService: EventService,
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

    // window.addEventListener('keydown', (event: any) => {
    //   console.log('KEYDOWN !!!, event = ', event);
    //   // if ((event.ctrlKey || event.metaKey) && String.fromCharCode(event.which).toLowerCase() == 'z') {
    //   //   event.stopPropagation();
    //   //   event.preventDefault();
    //   // }
    // });

    // $(window).bind('keydown', function (evt) {
    //   console.log('keydown, event = ', evt);
    //   if ((evt.ctrlKey || evt.metaKey) && String.fromCharCode(evt.which).toLowerCase() == 'z') {
    //     evt.preventDefault();
    //   }
    // });
  }

  ngOnInit(): void { }
  ngOnDestroy(): void { }

  launchWindow() {
    this.electronService.shell.openExternal("http://yandex.ru");
  }

  @HostListener("document:contextmenu", ["$event"])
  onContextMenu(e) {
    console.log("AppComponent.onContextMenu, e = ", e);

    e.preventDefault();
  }

  // @HostListener("document:keydown", ["$event"])
  // onKeyDown(e) {
  //   console.log("AppComponent.onKeyDown, e = ", e);

  //   // stop bubble
  //   e.stopPropagation();
  // }

  @HostListener('window:keydown', ['$event'])
  onKeyDown(event) {

    const srcHtml = event.target.outerHTML || "";
    const isEditable = event.target.isContentEditable;
    const isFocused = (document.activeElement === event.target);

    console.log('KEYDOWN !!!, event = ', event);
    console.log('KEYDOWN !!!, isEditable = ', isEditable);
    console.log('KEYDOWN !!!, isFocused = ', isFocused);
    console.log('KEYDOWN !!!, srcHtml = ', srcHtml);

    // if (!(isEditable && isFocused)) {
    if ((event.ctrlKey || event.metaKey)) {

      if (String.fromCharCode(event.which).toLowerCase() === 'z') {
        this.eventService.send(Message.DIAGRAM_EDITING_COMPLETE);

        event.stopPropagation();
        event.preventDefault();
        this.validationService.undo();
      }

      if (String.fromCharCode(event.which).toLowerCase() === 'y') {
        this.eventService.send(Message.DIAGRAM_EDITING_COMPLETE);

        event.stopPropagation();
        event.preventDefault();
        this.validationService.redo();
      }
    }
    // }
  }

}
