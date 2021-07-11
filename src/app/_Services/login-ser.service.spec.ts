import { TestBed } from '@angular/core/testing';

import { LoginSerService } from './login-ser.service';

describe('LoginSerService', () => {
  let service: LoginSerService;
  
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginSerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
