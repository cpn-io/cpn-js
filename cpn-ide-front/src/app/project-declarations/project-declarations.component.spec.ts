import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectDeclarationsComponent } from './project-declarations.component';

describe('ProjectDeclarationsComponent', () => {
  let component: ProjectDeclarationsComponent;
  let fixture: ComponentFixture<ProjectDeclarationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectDeclarationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectDeclarationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
