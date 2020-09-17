import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RateAssiznedZoneComponent } from './rate-assizned-zone.component';

describe('RateAssiznedZoneComponent', () => {
  let component: RateAssiznedZoneComponent;
  let fixture: ComponentFixture<RateAssiznedZoneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RateAssiznedZoneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RateAssiznedZoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
