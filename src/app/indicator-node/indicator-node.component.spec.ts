import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndicatorNodeComponent } from './indicator-node.component';

describe('IndicatorNodeComponent', () => {
  let component: IndicatorNodeComponent;
  let fixture: ComponentFixture<IndicatorNodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndicatorNodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndicatorNodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
