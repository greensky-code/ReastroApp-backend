import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpQuestionComponent } from './help-question.component';

describe('HelpQuestionComponent', () => {
  let component: HelpQuestionComponent;
  let fixture: ComponentFixture<HelpQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HelpQuestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HelpQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
