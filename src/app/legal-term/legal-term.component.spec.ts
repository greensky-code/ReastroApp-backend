import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LegalTermComponent } from './legal-term.component';

describe('LegalTermComponent', () => {
  let component: LegalTermComponent;
  let fixture: ComponentFixture<LegalTermComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LegalTermComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LegalTermComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
