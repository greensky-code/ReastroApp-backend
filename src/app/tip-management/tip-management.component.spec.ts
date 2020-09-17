import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipManagementComponent } from './tip-management.component';

describe('TipManagementComponent', () => {
  let component: TipManagementComponent;
  let fixture: ComponentFixture<TipManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
