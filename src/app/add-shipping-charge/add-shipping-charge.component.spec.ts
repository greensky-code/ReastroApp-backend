import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddShippingChargeComponent } from './add-shipping-charge.component';

describe('AddShippingChargeComponent', () => {
  let component: AddShippingChargeComponent;
  let fixture: ComponentFixture<AddShippingChargeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddShippingChargeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddShippingChargeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
