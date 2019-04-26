import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CpnEditorComponent } from './cpn-editor.component';

describe('CpnEditorComponent', () => {
  let component: CpnEditorComponent;
  let fixture: ComponentFixture<CpnEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CpnEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CpnEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
