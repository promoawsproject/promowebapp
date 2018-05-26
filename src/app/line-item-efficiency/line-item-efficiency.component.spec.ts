import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LineItemEfficiencyComponent } from './line-item-efficiency.component';

describe('LineItemEfficiencyComponent', () => {
  let component: LineItemEfficiencyComponent;
  let fixture: ComponentFixture<LineItemEfficiencyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LineItemEfficiencyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LineItemEfficiencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
