import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewRestaurantItemDetailsComponent } from './view-restaurant-item-details.component';

describe('ViewRestaurantItemDetailsComponent', () => {
  let component: ViewRestaurantItemDetailsComponent;
  let fixture: ComponentFixture<ViewRestaurantItemDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewRestaurantItemDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewRestaurantItemDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
