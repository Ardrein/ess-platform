import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelValuationComponent } from './model-valuation.component';

describe('ModelValuationComponent', () => {
  let component: ModelValuationComponent;
  let fixture: ComponentFixture<ModelValuationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelValuationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelValuationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
