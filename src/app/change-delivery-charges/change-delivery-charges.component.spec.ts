import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeDeliveryChargesComponent } from './change-delivery-charges.component';

describe('ChangeDeliveryChargesComponent', () => {
  let component: ChangeDeliveryChargesComponent;
  let fixture: ComponentFixture<ChangeDeliveryChargesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeDeliveryChargesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeDeliveryChargesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
