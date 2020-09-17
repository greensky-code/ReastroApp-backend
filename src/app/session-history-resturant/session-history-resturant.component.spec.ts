import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionHistoryResturantComponent } from './session-history-resturant.component';

describe('SessionHistoryResturantComponent', () => {
  let component: SessionHistoryResturantComponent;
  let fixture: ComponentFixture<SessionHistoryResturantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SessionHistoryResturantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SessionHistoryResturantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
