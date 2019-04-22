import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FivGoogleMaps } from './google-maps.component';

describe('GoogleMapsComponent', () => {
  let component: FivGoogleMaps;
  let fixture: ComponentFixture<FivGoogleMaps>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FivGoogleMaps ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FivGoogleMaps);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
