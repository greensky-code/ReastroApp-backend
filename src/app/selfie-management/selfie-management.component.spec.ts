import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelfieManagementComponent } from './selfie-management.component';

describe('SelfieManagementComponent', () => {
  let component: SelfieManagementComponent;
  let fixture: ComponentFixture<SelfieManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelfieManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelfieManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
