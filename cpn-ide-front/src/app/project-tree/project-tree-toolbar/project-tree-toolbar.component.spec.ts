import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectTreeToolbarComponent } from './project-tree-toolbar.component';

describe('ProjectTreeToolbarComponent', () => {
  let component: ProjectTreeToolbarComponent;
  let fixture: ComponentFixture<ProjectTreeToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectTreeToolbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectTreeToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
