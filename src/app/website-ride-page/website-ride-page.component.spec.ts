import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebsiteRidePageComponent } from './website-ride-page.component';

describe('WebsiteRidePageComponent', () => {
  let component: WebsiteRidePageComponent;
  let fixture: ComponentFixture<WebsiteRidePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebsiteRidePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebsiteRidePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
