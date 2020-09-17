import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MilestoneAssiznedZoneComponent } from './milestone-assizned-zone.component';

describe('MilestoneAssiznedZoneComponent', () => {
  let component: MilestoneAssiznedZoneComponent;
  let fixture: ComponentFixture<MilestoneAssiznedZoneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MilestoneAssiznedZoneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MilestoneAssiznedZoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
