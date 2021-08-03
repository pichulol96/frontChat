import { TestBed } from '@angular/core/testing';

import { CinfigUsersService } from './cinfig-users.service';

describe('CinfigUsersService', () => {
  let service: CinfigUsersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CinfigUsersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
