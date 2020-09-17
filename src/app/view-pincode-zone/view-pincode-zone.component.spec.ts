import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPincodeZoneComponent } from './view-pincode-zone.component';

describe('ViewPincodeZoneComponent', () => {
  let component: ViewPincodeZoneComponent;
  let fixture: ComponentFixture<ViewPincodeZoneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewPincodeZoneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPincodeZoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
