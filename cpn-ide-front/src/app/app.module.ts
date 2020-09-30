import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { MonitorNamePipe } from './pipes/monitor-name.pipe';
import { TreeNodeComponent } from './project-tree/tree-node/tree-node';
import { RegexPipe } from './pipes/regex.pipe';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NgxElectronModule } from 'ngx-electron';
import { AngularSplitModule } from 'angular-split';
import { TreeModule } from 'angular-tree-component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { SafePipeModule } from 'safe-pipe';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MainFrameComponent } from './main-frame/main-frame.component';
import { AccessCpnService } from './services/access-cpn.service';
import { MainToolbarComponent } from './main-toolbar/main-toolbar.component';

import { ModelEditorToolbarComponent } from './model-editor/model-editor-toolbar/model-editor-toolbar.component';
import { ModelEditorComponent } from './model-editor/model-editor.component';
import { ProjectExplorerComponent } from './project-explorer/project-explorer.component';
import { ProjectConsoleComponent } from './project-console/project-console.component';
import { EditorPanelComponent } from './editor-panel/editor-panel.component';

import { TabModule } from '../lib/tabs/tabs-component.module';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { PropertiesPanelComponent } from './properties-panel/properties-panel.component';

import { MlEditorComponent } from './ml-editor/ml-editor.component';
import { ProjectService } from './services/project.service';
import { FileService } from './services/file.service';
import { ModelService } from './services/model.service';
import { EventService } from './services/event.service';
import { ReplaceSpacesPipe } from './pipes/replace-spaces.pipe';
import { BlockHeaderComponent } from './common/block-header';
import { TextEditRowComponent } from './properties-panel/components/text-edit-row';
import { ColorDeclarationsPipe } from './pipes/color-declarations.pipe';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';
import { OptionsNamePipePipe } from './pipes/options-name.pipe';

import { SettingsService } from './services/settings.service';
import { ValidationService } from './services/validation.service';
import { ApplicationSettingsComponent } from './application-settings/application-settings.component';
import { SimulationPanelComponent } from './simulation-panel/simulation-panel.component';
import { ProjectMonitorsComponent } from './project-monitors/project-monitors.component';
import { ProjectTreeComponent } from './project-tree/project-tree.component';
import { ProjectTreeBlockNodeComponent } from './project-tree/project-tree-block-node/project-tree-block-node.component';
import { ProjectTreePageNodeComponent } from './project-tree/project-tree-page-node/project-tree-page-node.component';
import { ProjectTreeMonitorNodeComponent } from './project-tree/project-tree-monitor-node/project-tree-monitor-node.component';
import { ProjectTreeOptionsNodeComponent } from './project-tree/project-tree-options-node/project-tree-options-node.component';
import { ProjectTreeOptionNodeComponent } from './project-tree/project-tree-option-node/project-tree-option-node.component';
import { ProjectTreeDeclarationNodeComponent } from './project-tree/project-tree-declaration-node/project-tree-declaration-node.component';
import { ProjectTreeToolbarComponent } from './project-tree/project-tree-toolbar/project-tree-toolbar.component';
import { ContextMenuComponent } from './context-menu/context-menu.component';
import { ProjectDeclarationsComponent } from './project-declarations/project-declarations.component';
import { ProjectTreeMonitorblockNodeComponent } from './project-tree/project-tree-monitorblock-node/project-tree-monitorblock-node.component';
import { ProjectDeclarationsBlockNodeComponent } from './project-declarations/project-declarations-block-node/project-declarations-block-node.component';
import { SimulationReportPipe } from './pipes/simulation-report.pipe';
import { DialogComponent } from './common/dialog/dialog.component';
import { DialogLogComponent } from './common/dialog-log/dialog-log.component';
import { BufferService } from './services/buffer.service';
import {DragDropModule} from '@angular/cdk/drag-drop';

require('typeface-droid-sans-mono');

// -----------------------------------------------------------------------------

@NgModule({
  declarations: [
    AppComponent,

    // Pipes
    ColorDeclarationsPipe,
    OptionsNamePipePipe,
    ReplaceSpacesPipe,
    SafeHtmlPipe,
    RegexPipe,
    MonitorNamePipe,
    SimulationReportPipe,

    // Components
    MainFrameComponent,
    ProjectExplorerComponent,
    MainToolbarComponent,
    ModelEditorComponent,
    ModelEditorToolbarComponent,
    ProjectConsoleComponent,
    EditorPanelComponent,
    ProjectDetailsComponent,
    PropertiesPanelComponent,
    MlEditorComponent,
    DialogComponent,

    BlockHeaderComponent,
    TextEditRowComponent,
    ApplicationSettingsComponent,
    SimulationPanelComponent,
    ProjectMonitorsComponent,
    ProjectTreeComponent,
    ProjectTreeBlockNodeComponent,
    TreeNodeComponent,
    ProjectTreePageNodeComponent,
    ProjectTreeMonitorNodeComponent,
    ProjectTreeMonitorblockNodeComponent,
    ProjectTreeOptionsNodeComponent,
    ProjectTreeOptionNodeComponent,
    ProjectTreeDeclarationNodeComponent,
    ProjectTreeToolbarComponent,
    ContextMenuComponent,
    ProjectDeclarationsComponent,
    ProjectDeclarationsBlockNodeComponent,
    DialogLogComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    NgxElectronModule,
    TreeModule.forRoot(),
    FontAwesomeModule,
    AngularSplitModule,
    TabModule,
    FormsModule,
    CommonModule,
    SafePipeModule,
    DragDropModule,

    // Material
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  entryComponents: [
    DialogComponent,
    DialogLogComponent
  ],
  providers: [
    SettingsService,
    AccessCpnService,
    ProjectService,
    EventService,
    ModelService,
    ValidationService,
    FileService,
    BufferService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
  }
}
