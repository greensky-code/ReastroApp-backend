import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPincodeZoneComponent } from './edit-pincode-zone.component';

describe('EditPincodeZoneComponent', () => {
  let component: EditPincodeZoneComponent;
  let fixture: ComponentFixture<EditPincodeZoneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPincodeZoneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPincodeZoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
