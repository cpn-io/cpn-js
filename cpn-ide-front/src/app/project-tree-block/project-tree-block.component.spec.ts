import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectTreeBlockComponent } from './project-tree-block.component';

describe('ProjectTreeBlockComponent', () => {
  let component: ProjectTreeBlockComponent;
  let fixture: ComponentFixture<ProjectTreeBlockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectTreeBlockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectTreeBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
