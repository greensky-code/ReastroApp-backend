import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageCousinsComponent } from './manage-cousins.component';

describe('ManageCousinsComponent', () => {
  let component: ManageCousinsComponent;
  let fixture: ComponentFixture<ManageCousinsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageCousinsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageCousinsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
