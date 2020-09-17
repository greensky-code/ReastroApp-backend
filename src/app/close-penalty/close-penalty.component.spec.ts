import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClosePenaltyComponent } from './close-penalty.component';

describe('ClosePenaltyComponent', () => {
  let component: ClosePenaltyComponent;
  let fixture: ComponentFixture<ClosePenaltyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClosePenaltyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClosePenaltyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
