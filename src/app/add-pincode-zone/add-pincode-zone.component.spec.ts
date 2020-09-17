import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPincodeZoneComponent } from './add-pincode-zone.component';

describe('AddPincodeZoneComponent', () => {
  let component: AddPincodeZoneComponent;
  let fixture: ComponentFixture<AddPincodeZoneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPincodeZoneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPincodeZoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
