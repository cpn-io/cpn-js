import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectTreeMonitorNodeComponent } from './project-tree-monitor-node.component';

describe('ProjectTreeMonitorNodeComponent', () => {
  let component: ProjectTreeMonitorNodeComponent;
  let fixture: ComponentFixture<ProjectTreeMonitorNodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectTreeMonitorNodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectTreeMonitorNodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
