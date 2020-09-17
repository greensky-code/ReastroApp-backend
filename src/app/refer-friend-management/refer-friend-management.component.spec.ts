import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferFriendManagementComponent } from './refer-friend-management.component';

describe('ReferFriendManagementComponent', () => {
  let component: ReferFriendManagementComponent;
  let fixture: ComponentFixture<ReferFriendManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReferFriendManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferFriendManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
