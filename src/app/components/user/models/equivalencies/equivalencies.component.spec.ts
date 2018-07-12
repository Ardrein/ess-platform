import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EquivalenciesComponent } from './equivalencies.component';

describe('EquivalenciesComponent', () => {
  let component: EquivalenciesComponent;
  let fixture: ComponentFixture<EquivalenciesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EquivalenciesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EquivalenciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
