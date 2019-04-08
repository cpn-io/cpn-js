import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ModelEditorToolbarComponent} from './model-editor-toolbar.component';

describe('ModelEditorToolbarComponent', () => {
  let component: ModelEditorToolbarComponent;
  let fixture: ComponentFixture<ModelEditorToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ModelEditorToolbarComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelEditorToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
