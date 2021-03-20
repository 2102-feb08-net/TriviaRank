import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { User } from '../models/User';

import { OutboxService } from './outbox.service';

describe('OutboxService', () => {
  // let service: OutboxService;

  // beforeEach(() => {
  //   TestBed.configureTestingModule({});
  //   service = TestBed.inject(OutboxService);
  // });

  it('should be created', () => {
    const fakeClient = {} as HttpClient;
    const service = new OutboxService(fakeClient);
    expect(service).toBeTruthy();
  });
});
