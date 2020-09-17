import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSalerepresentativeComponent } from './add-salerepresentative.component';

describe('AddSalerepresentativeComponent', () => {
  let component: AddSalerepresentativeComponent;
  let fixture: ComponentFixture<AddSalerepresentativeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSalerepresentativeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSalerepresentativeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
