import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerTextComponent } from './banner-text.component';

describe('BannerTextComponent', () => {
  let component: BannerTextComponent;
  let fixture: ComponentFixture<BannerTextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BannerTextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BannerTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
