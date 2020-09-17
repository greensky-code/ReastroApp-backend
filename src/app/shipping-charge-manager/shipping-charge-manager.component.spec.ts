import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShippingChargeManagerComponent } from './shipping-charge-manager.component';

describe('ShippingChargeManagerComponent', () => {
  let component: ShippingChargeManagerComponent;
  let fixture: ComponentFixture<ShippingChargeManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShippingChargeManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShippingChargeManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
