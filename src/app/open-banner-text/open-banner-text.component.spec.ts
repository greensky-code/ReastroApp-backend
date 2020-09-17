import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenBannerTextComponent } from './open-banner-text.component';

describe('OpenBannerTextComponent', () => {
  let component: OpenBannerTextComponent;
  let fixture: ComponentFixture<OpenBannerTextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpenBannerTextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenBannerTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
