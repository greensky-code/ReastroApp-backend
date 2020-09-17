import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewBankDetailsComponent } from './view-bank-details.component';

describe('ViewBankDetailsComponent', () => {
  let component: ViewBankDetailsComponent;
  let fixture: ComponentFixture<ViewBankDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewBankDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewBankDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
