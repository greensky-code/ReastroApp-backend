import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayoutDriverDetailsComponent } from './payout-driver-details.component';

describe('PayoutDriverDetailsComponent', () => {
  let component: PayoutDriverDetailsComponent;
  let fixture: ComponentFixture<PayoutDriverDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayoutDriverDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayoutDriverDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
