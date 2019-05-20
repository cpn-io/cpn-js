import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { TreeModule } from 'angular-tree-component';
import { Router, Route, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { BasicTreeComponent } from './basictree/basictree.component';
import { FullTreeComponent } from './fulltree/fulltree.component';
import { TemplatesComponent } from './templates/templates.component';
import { FilterComponent } from './filter/filter.component';

const routes: Route[] = [
  {
    path: '',
    component: FullTreeComponent
  },
  {
    path: 'basic',
    component: BasicTreeComponent
  },
  {
    path: 'templates',
    component: TemplatesComponent
  },
  {
    path: 'filter',
    component: FilterComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    BasicTreeComponent,
    FullTreeComponent,
    TemplatesComponent,
    FilterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    TreeModule.forRoot(),
    RouterModule.forRoot(routes, { useHash: true })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
