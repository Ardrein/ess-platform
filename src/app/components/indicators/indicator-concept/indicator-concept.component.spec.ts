import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndicatorConceptComponent } from './indicator-concept.component';

describe('IndicatorConceptComponent', () => {
  let component: IndicatorConceptComponent;
  let fixture: ComponentFixture<IndicatorConceptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndicatorConceptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndicatorConceptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
