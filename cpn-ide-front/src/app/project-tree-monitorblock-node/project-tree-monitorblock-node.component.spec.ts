import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectTreeMonitorblockNodeComponent } from './project-tree-monitorblock-node.component';

describe('ProjectTreeMonitorblockNodeComponent', () => {
  let component: ProjectTreeMonitorblockNodeComponent;
  let fixture: ComponentFixture<ProjectTreeMonitorblockNodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectTreeMonitorblockNodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectTreeMonitorblockNodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
