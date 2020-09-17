import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebsiteRideBannerComponent } from './website-ride-banner.component';

describe('WebsiteRideBannerComponent', () => {
  let component: WebsiteRideBannerComponent;
  let fixture: ComponentFixture<WebsiteRideBannerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebsiteRideBannerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebsiteRideBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
