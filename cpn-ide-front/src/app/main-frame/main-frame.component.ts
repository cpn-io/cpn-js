import {
  // ChangeDetectionStrategy,
  Component,
  // ComponentFactoryResolver,
  // ElementRef,
  // NgZone,
  OnDestroy,
  OnInit,
  // ViewChild,
  // ViewContainerRef
} from '@angular/core';
import {ProjectExplorerComponent} from '../project-explorer/project-explorer.component';
import {EditorPanelComponent} from '../editor-panel/editor-panel.component';
import {ProjectDetailsComponent} from '../project-details/project-details.component';
import {ProjectConsoleComponent} from '../project-console/project-console.component';
import {PropertiesPanelComponent} from '../properties-panel/properties-panel.component';
import {Message} from '../common/message';
import {EventService} from '../services/event.service';


@Component({
  selector: 'app-main-frame',
  // changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './main-frame.component.html',
  styleUrls: ['./main-frame.component.scss']
})
export class MainFrameComponent implements OnInit, OnDestroy {

//   @ViewChild('explorerArea') explorerAreaElementRef: ElementRef;
//   @ViewChild('editorArea') editorAreaElementRef: ElementRef;
//   @ViewChild('detailsArea') detailsAreaElementRef: ElementRef;
//
//   @ViewChild('propertiesArea') propertiesAreaElementRef: ElementRef;
// //  @ViewChild('declarationArea') declarationAreaElementRef: ElementRef;
//   @ViewChild('valuesArea') valuesAreaElementRef: ElementRef;
//   @ViewChild('consoleArea') consoleAreaElementRef: ElementRef;

  localStorageName = 'angular-split-ws';

  // subscription: Subscription;

  explorerWidth = 25;

  constructor(private eventService: EventService,
              // private viewContainer: ViewContainerRef,
              // private componentFactoryResolver: ComponentFactoryResolver
              // , private zone: NgZone
  ) {
  }

  ngOnInit() {
    // Subscribe on project load event
    this.eventService.on(Message.PROJECT_FILE_OPEN, (data) => {
      this.loadProjectData(data);
    });
    // Subscribe on project load event
    this.eventService.on(Message.PROJECT_LOAD, (data) => {
      this.loadProjectData(data);
    });

    // if (localStorage.getItem(this.localStorageName)) {
    //   this.config = JSON.parse(localStorage.getItem(this.localStorageName));
    // }
    // else {
    //   this.resetConfig();
    // }

    // this.zone.run(() => {
    //   this.createComponent(this.explorerAreaElementRef, ProjectExplorerComponent);
    //   this.createComponent(this.editorAreaElementRef, EditorPanelComponent);
    //   this.createComponent(this.detailsAreaElementRef, ProjectDetailsComponent);
    //
    //   this.createComponent(this.propertiesAreaElementRef, PropertiesPanelComponent);
    //  // this.createComponent(this.declarationAreaElementRef, DeclarationPanelComponent);
    //   // this.createComponent(this.valuesAreaElementRef, ProjectDetailsComponent);
    //   this.createComponent(this.consoleAreaElementRef, ProjectConsoleComponent);
    // });
  }

  // createComponent(elementRef, componentClass) {
  //   let factory = this.componentFactoryResolver.resolveComponentFactory(componentClass);
  //   let compRef = this.viewContainer.createComponent(factory);
  //   elementRef.nativeElement.append(compRef.location.nativeElement);
  // }

  ngOnDestroy() {
    // this.subscription.unsubscribe();
  }

  // resetConfig() {
  //   this.config = cloneDeep(defaultConfig);

  //   localStorage.removeItem(this.localStorageName);
  // }

  // subscribeToProject() {
  //   this.subscription = EmitterService.getAppMessageEmitter().subscribe((data: any) => {
  //     if (data && data.id) {
  //       if (data.id === Constants.ACTION_PROJECT_LOAD_DATA) {
  //         console.log('TESTTTEMIT');
  //         if (data.project)
  //           this.loadProjectData(data.project);
  //       }
  //     }
  //   });
  // }

  loadProjectData(project: any) {
    console.log('MainFrameComponent, loadProjectData(), project = ', project);

    this.explorerWidth = 25;

    // this.zone.run(() => {
    //   console.log('repaint component !!!');
    // });
  }
}
