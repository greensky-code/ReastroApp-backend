import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayoutSalesDetailsComponent } from './payout-sales-details.component';

describe('PayoutSalesDetailsComponent', () => {
  let component: PayoutSalesDetailsComponent;
  let fixture: ComponentFixture<PayoutSalesDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayoutSalesDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayoutSalesDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
