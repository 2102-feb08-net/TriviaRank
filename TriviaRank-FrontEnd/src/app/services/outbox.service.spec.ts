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

  it('getPlayerFriendInvites should get invites', () => {
    const passedUrl = '';
    const observable: Observable<User[]> = of([]);

    const spyClient = jasmine.createSpyObj('HttpClient', ['get']);
    spyClient.get.and.returnValue(observable);

    expect(spyClient.get).toHaveBeenCalledWith('https://triviarank-server.azurewebsites.net');

    const service = new OutboxService(spyClient.HttpClient);
    const result = service.getPlayerFriendInvites(0);
    expect(result).toBe(observable);
  });
});
