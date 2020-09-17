import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WithoutLoginHeaderComponent } from './without-login-header.component';

describe('WithoutLoginHeaderComponent', () => {
  let component: WithoutLoginHeaderComponent;
  let fixture: ComponentFixture<WithoutLoginHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WithoutLoginHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WithoutLoginHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
