import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ScrollViewModule } from '@progress/kendo-angular-scrollview';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NgxElectronModule } from 'ngx-electron';
import { AngularSplitModule } from 'angular-split';
import { TreeModule } from 'angular-tree-component';
import { JsonEditorModule } from 'ng2-json-editor';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MainFrameComponent } from './main-frame/main-frame.component';
import { AccessCpnService } from './services/access-cpn.service';
import { ProjectExplorerToolbarComponent } from './project-explorer/project-explorer-toolbar/project-explorer-toolbar.component';
import { MainToolbarComponent } from './main-toolbar/main-toolbar.component';
import { OpenprojectButtonComponent } from './actions/openproject-button/openproject-button.component';

import { ModelEditorToolbarComponent } from './model-editor/model-editor-toolbar/model-editor-toolbar.component';
import { ModelEditorComponent } from './model-editor/model-editor.component';
import { ProjectExplorerComponent } from './project-explorer/project-explorer.component';
import { ProjectConsoleComponent } from './project-console/project-console.component';
import { EditorPanelComponent } from './editor-panel/editor-panel.component';

import { TabModule } from './tabs/tabs-component.module';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { PropertiesPanelComponent } from './properties-panel/properties-panel.component';

import { MlEditorComponent } from './ml-editor/ml-editor.component';
import { ProjectService } from './services/project.service';
import { ModelService } from './services/model.service';
import { EventService } from './services/event.service';
import { ReplaceSpacesPipe } from './pipes/replace-spaces.pipe';
import { SaveprojectButtonComponent } from './actions/saveproject-button/saveproject-button.component';
import { BlockHeaderComponent } from './common/block-header';
import { TextEditRowComponent } from './properties-panel/components/text-edit-row';
import { ColorDeclarationsPipe } from './pipes/color-declarations.pipe';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';
import { OptionsNamePipePipe } from './pipes/options-name.pipe';

import { SettingsService } from './services/settings.service';
import { ValidationService } from './services/validation.service';

// -----------------------------------------------------------------------------

@NgModule({
  declarations: [
    AppComponent,

    // Pipes
    ColorDeclarationsPipe,
    OptionsNamePipePipe,
    ReplaceSpacesPipe,
    SafeHtmlPipe,

    // Components
    MainFrameComponent,
    ProjectExplorerComponent,
    ProjectExplorerToolbarComponent,
    MainToolbarComponent,
    OpenprojectButtonComponent,
    ModelEditorComponent,
    ModelEditorToolbarComponent,
    ProjectConsoleComponent,
    EditorPanelComponent,
    ProjectDetailsComponent,
    PropertiesPanelComponent,
    MlEditorComponent,
    SaveprojectButtonComponent,

    BlockHeaderComponent,
    TextEditRowComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ScrollViewModule,
    AppRoutingModule,
    HttpClientModule,
    NgxElectronModule,
    TreeModule.forRoot(),
    JsonEditorModule,
    FontAwesomeModule,
    AngularSplitModule,
    TabModule,
    FormsModule,
    CommonModule,

    // Ngb
    NgbModule,
  ],
  entryComponents: [],
  providers: [AccessCpnService, ProjectService, EventService, ModelService, SettingsService, ValidationService],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
  }
}
