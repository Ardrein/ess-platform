import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelEquivalencyComponent } from './model-equivalency.component';

describe('ModelEquivalencyComponent', () => {
  let component: ModelEquivalencyComponent;
  let fixture: ComponentFixture<ModelEquivalencyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelEquivalencyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelEquivalencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
