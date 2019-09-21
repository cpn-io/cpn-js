import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectTreeDeclarationNodeComponent } from './project-tree-declaration-node.component';

describe('ProjectTreeDeclarationNodeComponent', () => {
  let component: ProjectTreeDeclarationNodeComponent;
  let fixture: ComponentFixture<ProjectTreeDeclarationNodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectTreeDeclarationNodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectTreeDeclarationNodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
