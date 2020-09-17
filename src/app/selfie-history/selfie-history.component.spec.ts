import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelfieHistoryComponent } from './selfie-history.component';

describe('SelfieHistoryComponent', () => {
  let component: SelfieHistoryComponent;
  let fixture: ComponentFixture<SelfieHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelfieHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelfieHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
