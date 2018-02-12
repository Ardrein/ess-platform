import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndicatorTabComponent } from './indicator-tab.component';

describe('IndicatorTabComponent', () => {
  let component: IndicatorTabComponent;
  let fixture: ComponentFixture<IndicatorTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndicatorTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndicatorTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
