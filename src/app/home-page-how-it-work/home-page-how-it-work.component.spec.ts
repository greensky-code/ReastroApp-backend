import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePageHowItWorkComponent } from './home-page-how-it-work.component';

describe('HomePageHowItWorkComponent', () => {
  let component: HomePageHowItWorkComponent;
  let fixture: ComponentFixture<HomePageHowItWorkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomePageHowItWorkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePageHowItWorkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
