import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCusineComponent } from './edit-cusine.component';

describe('EditCusineComponent', () => {
  let component: EditCusineComponent;
  let fixture: ComponentFixture<EditCusineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditCusineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCusineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
