import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectMonitorsComponent } from './project-monitors.component';

describe('ProjectMonitorsComponent', () => {
  let component: ProjectMonitorsComponent;
  let fixture: ComponentFixture<ProjectMonitorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectMonitorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectMonitorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
