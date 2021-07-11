import { TestBed } from '@angular/core/testing';

import { FlightinfoService } from './flightinfo.service';

describe('FlightinfoService', () => {
  let service: FlightinfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FlightinfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
