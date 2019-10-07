import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectTreeOptionsNodeComponent } from './project-tree-options-node.component';

describe('ProjectTreeOptionsNodeComponent', () => {
  let component: ProjectTreeOptionsNodeComponent;
  let fixture: ComponentFixture<ProjectTreeOptionsNodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectTreeOptionsNodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectTreeOptionsNodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
