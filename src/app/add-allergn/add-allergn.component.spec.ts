import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAllergnComponent } from './add-allergn.component';

describe('AddAllergnComponent', () => {
  let component: AddAllergnComponent;
  let fixture: ComponentFixture<AddAllergnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAllergnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAllergnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
