import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ModelEditorComponent} from './model-editor.component';

describe('ModelEditorComponent', () => {
  let component: ModelEditorComponent;
  let fixture: ComponentFixture<ModelEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ModelEditorComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
