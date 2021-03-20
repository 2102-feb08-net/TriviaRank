import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { AccountService } from './account.service';

describe('AccountService', () => {
  let service: AccountService;
  service = new AccountService({} as HttpClient);

  // beforeEach(() => {
  //   TestBed.configureTestingModule({});
  //   service = TestBed.inject(AccountService);
  // });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
