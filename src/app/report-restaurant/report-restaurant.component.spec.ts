import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportRestaurantComponent } from './report-restaurant.component';

describe('ReportRestaurantComponent', () => {
  let component: ReportRestaurantComponent;
  let fixture: ComponentFixture<ReportRestaurantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportRestaurantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportRestaurantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
