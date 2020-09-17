import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAllerganComponent } from './view-allergan.component';

describe('ViewAllerganComponent', () => {
  let component: ViewAllerganComponent;
  let fixture: ComponentFixture<ViewAllerganComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewAllerganComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAllerganComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
