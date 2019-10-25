import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectDeclarationsOldComponent } from './project-declarations-old.component';

describe('ProjectDeclarationsOldComponent', () => {
  let component: ProjectDeclarationsOldComponent;
  let fixture: ComponentFixture<ProjectDeclarationsOldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectDeclarationsOldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectDeclarationsOldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
