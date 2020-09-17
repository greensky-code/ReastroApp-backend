import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebsiteHomePageComponent } from './website-home-page.component';

describe('WebsiteHomePageComponent', () => {
  let component: WebsiteHomePageComponent;
  let fixture: ComponentFixture<WebsiteHomePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebsiteHomePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebsiteHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
