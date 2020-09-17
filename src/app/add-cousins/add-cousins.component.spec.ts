import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCousinsComponent } from './add-cousins.component';

describe('AddCousinsComponent', () => {
  let component: AddCousinsComponent;
  let fixture: ComponentFixture<AddCousinsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCousinsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCousinsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
