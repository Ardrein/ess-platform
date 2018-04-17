import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VariableNodeComponent } from './variable-node.component';

describe('VariableNodeComponent', () => {
  let component: VariableNodeComponent;
  let fixture: ComponentFixture<VariableNodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VariableNodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VariableNodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
