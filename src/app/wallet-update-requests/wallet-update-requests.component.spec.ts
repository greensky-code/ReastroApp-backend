import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletUpdateRequestsComponent } from './wallet-update-requests.component';

describe('WalletUpdateRequestsComponent', () => {
  let component: WalletUpdateRequestsComponent;
  let fixture: ComponentFixture<WalletUpdateRequestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WalletUpdateRequestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WalletUpdateRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
