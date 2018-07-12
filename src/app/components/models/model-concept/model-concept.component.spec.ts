import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelConceptComponent } from './model-concept.component';

describe('ModelConceptComponent', () => {
  let component: ModelConceptComponent;
  let fixture: ComponentFixture<ModelConceptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelConceptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelConceptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
