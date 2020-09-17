import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAllerganComponent } from './edit-allergan.component';

describe('EditAllerganComponent', () => {
  let component: EditAllerganComponent;
  let fixture: ComponentFixture<EditAllerganComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditAllerganComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAllerganComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
