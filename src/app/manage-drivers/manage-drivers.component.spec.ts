import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageDriversComponent } from './manage-drivers.component';

describe('ManageDriversComponent', () => {
  let component: ManageDriversComponent;
  let fixture: ComponentFixture<ManageDriversComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageDriversComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageDriversComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
