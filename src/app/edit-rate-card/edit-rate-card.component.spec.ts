import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRateCardComponent } from './edit-rate-card.component';

describe('EditRateCardComponent', () => {
  let component: EditRateCardComponent;
  let fixture: ComponentFixture<EditRateCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditRateCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditRateCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
