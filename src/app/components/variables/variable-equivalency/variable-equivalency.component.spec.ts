import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VariableEquivalencyComponent } from './variable-equivalency.component';

describe('VariableEquivalencyComponent', () => {
  let component: VariableEquivalencyComponent;
  let fixture: ComponentFixture<VariableEquivalencyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VariableEquivalencyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VariableEquivalencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
