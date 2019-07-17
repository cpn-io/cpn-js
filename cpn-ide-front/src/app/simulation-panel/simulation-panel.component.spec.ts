import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimulationPanelComponent } from './simulation-panel.component';

describe('SimulationPanelComponent', () => {
  let component: SimulationPanelComponent;
  let fixture: ComponentFixture<SimulationPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimulationPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimulationPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
