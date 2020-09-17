import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionHistoryDriverComponent } from './session-history-driver.component';

describe('SessionHistoryDriverComponent', () => {
  let component: SessionHistoryDriverComponent;
  let fixture: ComponentFixture<SessionHistoryDriverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SessionHistoryDriverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SessionHistoryDriverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
