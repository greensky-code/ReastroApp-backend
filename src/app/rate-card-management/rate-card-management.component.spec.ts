import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RateCardManagementComponent } from './rate-card-management.component';

describe('RateCardManagementComponent', () => {
  let component: RateCardManagementComponent;
  let fixture: ComponentFixture<RateCardManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RateCardManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RateCardManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
