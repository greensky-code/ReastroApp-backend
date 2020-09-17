import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenRestaurantPageComponent } from './open-restaurant-page.component';

describe('OpenRestaurantPageComponent', () => {
  let component: OpenRestaurantPageComponent;
  let fixture: ComponentFixture<OpenRestaurantPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpenRestaurantPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenRestaurantPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
