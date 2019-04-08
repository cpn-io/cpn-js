import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {OpenprojectButtonComponent} from './openproject-button.component';

describe('OpenprojectButtonComponent', () => {
  let component: OpenprojectButtonComponent;
  let fixture: ComponentFixture<OpenprojectButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OpenprojectButtonComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenprojectButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
