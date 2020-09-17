import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipAndCharityComponent } from './tip-and-charity.component';

describe('TipAndCharityComponent', () => {
  let component: TipAndCharityComponent;
  let fixture: ComponentFixture<TipAndCharityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipAndCharityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipAndCharityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
