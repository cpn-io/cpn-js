import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ProjectExplorerToolbarComponent} from './project-explorer-toolbar.component';

describe('ProjectExplorerToolbarComponent', () => {
  let component: ProjectExplorerToolbarComponent;
  let fixture: ComponentFixture<ProjectExplorerToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectExplorerToolbarComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectExplorerToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
