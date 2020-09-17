import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayoutHistoryDriverComponent } from './payout-history-driver.component';

describe('PayoutHistoryDriverComponent', () => {
  let component: PayoutHistoryDriverComponent;
  let fixture: ComponentFixture<PayoutHistoryDriverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayoutHistoryDriverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayoutHistoryDriverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
