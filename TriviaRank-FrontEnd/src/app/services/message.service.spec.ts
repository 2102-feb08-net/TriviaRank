import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { MessageService } from './message.service';

describe('MessageService', () => {
  // let service: MessageService;

  // beforeEach(() => {
  //   TestBed.configureTestingModule({});
  //   service = TestBed.inject(MessageService);
  // });

  it('should be created', () => {
    const fakeClient = {} as HttpClient;
    const service = new MessageService(fakeClient);
    expect(service).toBeTruthy();
  });
});
