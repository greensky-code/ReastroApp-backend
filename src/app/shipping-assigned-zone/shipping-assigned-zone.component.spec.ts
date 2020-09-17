import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShippingAssignedZoneComponent } from './shipping-assigned-zone.component';

describe('ShippingAssignedZoneComponent', () => {
  let component: ShippingAssignedZoneComponent;
  let fixture: ComponentFixture<ShippingAssignedZoneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShippingAssignedZoneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShippingAssignedZoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
