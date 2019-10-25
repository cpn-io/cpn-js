import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectDeclarationsBlockNodeComponent } from './project-declarations-block-node.component';

describe('ProjectDeclarationsBlockNodeComponent', () => {
  let component: ProjectDeclarationsBlockNodeComponent;
  let fixture: ComponentFixture<ProjectDeclarationsBlockNodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectDeclarationsBlockNodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectDeclarationsBlockNodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
