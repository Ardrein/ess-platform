import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpreadsheetLoaderComponent } from './spreadsheet-loader.component';

describe('SpreadsheetLoaderComponent', () => {
  let component: SpreadsheetLoaderComponent;
  let fixture: ComponentFixture<SpreadsheetLoaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpreadsheetLoaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpreadsheetLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
