import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveprojectButtonComponent } from './saveproject-button.component';

describe('SaveprojectButtonComponent', () => {
  let component: SaveprojectButtonComponent;
  let fixture: ComponentFixture<SaveprojectButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaveprojectButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveprojectButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
