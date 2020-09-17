import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxSettingComponent } from './tax-setting.component';

describe('TaxSettingComponent', () => {
  let component: TaxSettingComponent;
  let fixture: ComponentFixture<TaxSettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaxSettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
