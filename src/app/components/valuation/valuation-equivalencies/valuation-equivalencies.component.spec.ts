import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValuationEquivalenciesComponent } from './valuation-equivalencies.component';

describe('ValuationEquivalenciesComponent', () => {
  let component: ValuationEquivalenciesComponent;
  let fixture: ComponentFixture<ValuationEquivalenciesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValuationEquivalenciesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValuationEquivalenciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
