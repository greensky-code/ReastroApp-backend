import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageAllergnComponent } from './manage-allergn.component';

describe('ManageAllergnComponent', () => {
  let component: ManageAllergnComponent;
  let fixture: ComponentFixture<ManageAllergnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageAllergnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageAllergnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
