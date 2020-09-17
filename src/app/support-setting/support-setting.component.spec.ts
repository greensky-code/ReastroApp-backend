import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportSettingComponent } from './support-setting.component';

describe('SupportSettingComponent', () => {
  let component: SupportSettingComponent;
  let fixture: ComponentFixture<SupportSettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupportSettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupportSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
