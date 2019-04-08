import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {MainFrameComponent} from './main-frame.component';

describe('MainFrameComponent', () => {
  let component: MainFrameComponent;
  let fixture: ComponentFixture<MainFrameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MainFrameComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainFrameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
