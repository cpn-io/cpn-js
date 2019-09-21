import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectTreeOptionNodeComponent } from './project-tree-option-node.component';

describe('ProjectTreeOptionNodeComponent', () => {
  let component: ProjectTreeOptionNodeComponent;
  let fixture: ComponentFixture<ProjectTreeOptionNodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectTreeOptionNodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectTreeOptionNodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
