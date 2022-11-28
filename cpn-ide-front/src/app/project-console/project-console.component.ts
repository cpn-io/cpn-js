import { Component, OnDestroy, OnInit } from "@angular/core";
import { AccessCpnService } from "../services/access-cpn.service";
import { Message } from "../common/message";
import { EventService } from "../services/event.service";
import { DatePipe } from "@angular/common";
import { MatDialog } from "@angular/material/dialog";
import { DialogComponent } from "../common/dialog/dialog.component";
import { DialogLogComponent } from "../common/dialog-log/dialog-log.component";
import { EditorPanelService } from "../services/editor-panel.service";
import { ModelService } from "../services/model.service";

@Component({
  selector: "app-project-console",
  templateUrl: "./project-console.component.html",
  styleUrls: ["./project-console.component.scss"],
  providers: [DatePipe],
})
export class ProjectConsoleComponent implements OnInit {
  JSON = JSON;

  success = false;

  nodes = [];
  logHtml = [];
  changesHtml = [];
  processing = false;

  timeInitStart;
  timeSimStart;

  constructor(
    private eventService: EventService,
    public accessCpnService: AccessCpnService,
    public dialog: MatDialog,
    public editorPanelService: EditorPanelService,
    private modelService: ModelService
  ) {}

  ngOnInit() {
    this.eventService.on(Message.PROJECT_LOAD, (event) => {
      this.logHtml = [];
      this.changesHtml = [];
      this.nodes = [];

      if (event.project) {
        this.logSuccess("Project " + event.project.name + " loaded.");
      }
    });

    // VALIDATION

    this.eventService.on(Message.SERVER_INIT_NET_START, () => {
      this.logHtml = [];
      this.nodes = [];
      this.log("Validation process...");
      this.timeInitStart = new Date().getTime();
    });

    this.eventService.on(Message.SERVER_INIT_NET_DONE, (event) => {
      if (event && event.data) {
        const elapsed = new Date().getTime() - this.timeInitStart;

        if (event.data.success) {
          this.logSuccess(
            "Complete in " +
              this.timeConversion(elapsed) +
              ". Model is correct."
          );
        } else {
          this.logError(
            "Complete in " + this.timeConversion(elapsed) + " with errors:"
          );

          const errorData = this.accessCpnService.getErrorData();
          console.log("errorData: ", errorData);
          if (Object.keys(errorData).length > 0) {
            for (const id of Object.keys(errorData)) {
              this.logError(errorData[id], id);
            }
          }
          if (event.warningIssues) {
            console.log("EVENT! ", event.warningIssues);
            for (const id of Object.keys(event.warningIssues)) {
              this.logError(event.warningIssues[id][0].description, id);
            }
          }
        }
      }
    });

    this.eventService.on(Message.SERVER_INIT_NET_ERROR, (event) => {
      if (event) {
        if (event.data && event.data.error && event.data.error.stackTrace) {
          this.logError(
            "Validation server error:\n" + event.data.error.stackTrace
          );
        } else {
          this.logError(
            "Validation server error: " + JSON.stringify(event.data)
          );
        }
      }
    });

    // SIMULATION

    this.eventService.on(Message.SERVER_INIT_SIM_START, () => {
      this.logHtml = [];
      this.nodes = [];
      this.log("Simulator initializing...");
      this.timeSimStart = new Date().getTime();
    });

    this.eventService.on(Message.SERVER_INIT_SIM_DONE, () => {
      const elapsed = new Date().getTime() - this.timeSimStart;
      this.logSuccess(
        "Simulator initialized in " + this.timeConversion(elapsed) + "."
      );
    });

    this.eventService.on(Message.SERVER_ERROR, (event) => {
      if (event && event.data) {
        if (event.data.error && event.data.error.description) {
          this.logError(
            "Simulator initializing error: " + event.data.error.description
          );
          this.logError(event.data.error.stackTrace);
        } else if (event.data.error && event.data.error.stackTrace) {
          this.logError(
            "Simulator initializing error:\n" + event.data.error.stackTrace
          );
        } else {
          this.logError(
            "Simulator initializing error:\n" + JSON.stringify(event.data)
          );
        }
      } else {
        this.logError("Simulator initializing error: UNDEFINED");
      }
    });

    // TOKENS
    this.eventService.on(Message.SIMULATION_STEP_DONE, () => {
      this.logSuccess(
        "Tokens: " + JSON.stringify(this.accessCpnService.tokenData)
      );
      this.logSuccess(
        "Fired transitions: " +
          JSON.stringify(this.accessCpnService.getFiredData())
      );
      this.logSuccess(
        "Ready transitions: " +
          JSON.stringify(this.accessCpnService.getReadyData())
      );
    });

    // MODEL CHANGES
    this.eventService.on(Message.MODEL_CHANGED_DETAILS, (event) => {
      if (event && event.changesPath) {
        this.logChanges(event.changesPath);
      }
    });

    this.eventService.on(Message.PLAY_OUT_EMPTY_LOG, () => {
      this.logError("The log created from the recorded events using the given configuration is empty");
    })
  
    this.eventService.on(Message.PLAY_OUT_NO_RECORDED_EVENTS, () => {
      this.logError("There are currently no recorded events");
    })
  
    this.eventService.on(Message.PLAY_OUT_UNKWOWN_CASE_ID, (error) => {
      console.log("there is an error here");
      console.log(error.data.error.message);
      console.log(error.data);
      
      this.logError(error.data.error.message);
      console.log("end error");
    })
  
    this.eventService.on(Message.PLAY_OUT_SAVED, (data) => {
      this.logSuccess("Log saved at: " + data.path)
    });
  }

  logColor(text, className, id?) {
    this.logHtml.push({
      date: new Date(),
      class: className,
      text: text,
      id: id,
    });

    setTimeout(() => {
      const logScrollPane = document.getElementById("logScrollPane");
      logScrollPane.scrollTop = logScrollPane.scrollHeight;
    }, 100);
  }

  log(text) {
    this.logColor(text, "normal");
  }

  logError(text, id?) {
    this.logColor(text, "error", id);
  }

  logSuccess(text) {
    this.logColor(text, "success");
  }

  logChanges(text) {
    this.changesHtml.push({
      date: new Date(),
      class: "normal",
      text: text,
    });

    setTimeout(() => {
      const changesScrollPane = document.getElementById("changesScrollPane");
      changesScrollPane.scrollTop = changesScrollPane.scrollHeight;
    }, 100);
  }

  timeConversion(millisec) {
    const seconds: number = millisec / 1000;
    const minutes = millisec / (1000 * 60);
    const hours = millisec / (1000 * 60 * 60);
    const days = millisec / (1000 * 60 * 60 * 24);

    if (seconds < 60) {
      return seconds + " sec";
    } else if (minutes < 60) {
      return minutes + " min";
    } else if (hours < 24) {
      return hours + " hrs";
    } else {
      return days + " days";
    }
  }

  openDialog(text, type) {
    const dialogRef = this.dialog.open(DialogLogComponent, {
      width: "600px",
      data: {
        title: "Message",
        text: { title: type || "normal", value: text },
      },
    });
    dialogRef.afterClosed().subscribe((data) => {
      if (data && data.result === DialogComponent.YES) {
        // console.log(this.constructor.name, 'onSaveProject(), YES clicked, data = ', data);
      }
    });
    return false;
  }

  selectNode(id) {
    const pageByElementId = this.modelService.getPageByElementId(id);
    this.editorPanelService
      .getEditorPanelComponent()
      .openModelEditor(pageByElementId)
      .then(() => {
        this.eventService.send(Message.SHAPE_HIGHLIGHT, id);
      });
    return false;
  }
}
