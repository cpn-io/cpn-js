import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {MlEditorComponent} from './ml-editor.component';

describe('MlEditorComponent', () => {
  let component: MlEditorComponent;
  let fixture: ComponentFixture<MlEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MlEditorComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MlEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
