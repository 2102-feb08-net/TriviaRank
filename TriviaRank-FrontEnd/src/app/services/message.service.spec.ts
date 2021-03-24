import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { MessageService } from './message.service';

describe('MessageService', () => {
  let httpClientSpy : {get: jasmine.Spy};
  let messageService : MessageService;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    messageService = new MessageService(httpClientSpy as any);
  });


  it('should return array of messages', () => {
    const fakeClient = {} as HttpClient;
    const service = new MessageService(fakeClient);
    expect(service).toBeTruthy();
  });
});
