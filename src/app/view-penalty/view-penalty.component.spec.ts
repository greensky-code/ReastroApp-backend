import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPenaltyComponent } from './view-penalty.component';

describe('ViewPenaltyComponent', () => {
  let component: ViewPenaltyComponent;
  let fixture: ComponentFixture<ViewPenaltyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewPenaltyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPenaltyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
