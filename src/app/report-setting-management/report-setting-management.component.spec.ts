import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportSettingManagementComponent } from './report-setting-management.component';

describe('ReportSettingManagementComponent', () => {
  let component: ReportSettingManagementComponent;
  let fixture: ComponentFixture<ReportSettingManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportSettingManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportSettingManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
