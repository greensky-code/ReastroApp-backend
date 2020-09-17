import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MilestoneManagementComponent } from './milestone-management.component';

describe('MilestoneManagementComponent', () => {
  let component: MilestoneManagementComponent;
  let fixture: ComponentFixture<MilestoneManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MilestoneManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MilestoneManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
