import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantReportDetailsComponent } from './restaurant-report-details.component';

describe('RestaurantReportDetailsComponent', () => {
  let component: RestaurantReportDetailsComponent;
  let fixture: ComponentFixture<RestaurantReportDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RestaurantReportDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurantReportDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
