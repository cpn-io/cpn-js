import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectTreeBlockNodeComponent } from './project-tree-block-node.component';

describe('ProjectTreeBlockComponent', () => {
  let component: ProjectTreeBlockNodeComponent;
  let fixture: ComponentFixture<ProjectTreeBlockNodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectTreeBlockNodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectTreeBlockNodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
