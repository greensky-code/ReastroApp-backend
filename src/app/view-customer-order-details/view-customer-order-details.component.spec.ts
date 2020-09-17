import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCustomerOrderDetailsComponent } from './view-customer-order-details.component';

describe('ViewCustomerOrderDetailsComponent', () => {
  let component: ViewCustomerOrderDetailsComponent;
  let fixture: ComponentFixture<ViewCustomerOrderDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewCustomerOrderDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCustomerOrderDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
