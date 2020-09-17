import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayoutSaleReprentativePendingComponent } from './payout-sale-reprentative-pending.component';

describe('PayoutSaleReprentativePendingComponent', () => {
  let component: PayoutSaleReprentativePendingComponent;
  let fixture: ComponentFixture<PayoutSaleReprentativePendingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayoutSaleReprentativePendingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayoutSaleReprentativePendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
