import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditShippingChargeComponent } from './edit-shipping-charge.component';

describe('EditShippingChargeComponent', () => {
  let component: EditShippingChargeComponent;
  let fixture: ComponentFixture<EditShippingChargeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditShippingChargeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditShippingChargeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
