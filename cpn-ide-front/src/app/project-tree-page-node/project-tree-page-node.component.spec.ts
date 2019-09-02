import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectTreePageNodeComponent } from './project-tree-page-node.component';

describe('ProjectTreePageNodeComponent', () => {
  let component: ProjectTreePageNodeComponent;
  let fixture: ComponentFixture<ProjectTreePageNodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectTreePageNodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectTreePageNodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
