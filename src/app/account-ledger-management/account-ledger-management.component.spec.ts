import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountLedgerManagementComponent } from './account-ledger-management.component';

describe('AccountLedgerManagementComponent', () => {
  let component: AccountLedgerManagementComponent;
  let fixture: ComponentFixture<AccountLedgerManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountLedgerManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountLedgerManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
