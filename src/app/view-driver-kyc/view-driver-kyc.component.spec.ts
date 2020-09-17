import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDriverKycComponent } from './view-driver-kyc.component';

describe('ViewDriverKycComponent', () => {
  let component: ViewDriverKycComponent;
  let fixture: ComponentFixture<ViewDriverKycComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewDriverKycComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewDriverKycComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
