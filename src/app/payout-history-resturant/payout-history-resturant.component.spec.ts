import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayoutHistoryResturantComponent } from './payout-history-resturant.component';

describe('PayoutHistoryResturantComponent', () => {
  let component: PayoutHistoryResturantComponent;
  let fixture: ComponentFixture<PayoutHistoryResturantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayoutHistoryResturantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayoutHistoryResturantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
