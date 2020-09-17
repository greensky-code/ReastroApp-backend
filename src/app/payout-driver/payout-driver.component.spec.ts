import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayoutDriverComponent } from './payout-driver.component';

describe('PayoutDriverComponent', () => {
  let component: PayoutDriverComponent;
  let fixture: ComponentFixture<PayoutDriverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayoutDriverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayoutDriverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
