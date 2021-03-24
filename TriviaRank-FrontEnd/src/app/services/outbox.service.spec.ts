import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { User } from '../models/User';

import { OutboxService } from './outbox.service';


describe('OutboxService', () => {
  let httpClientSpy : {get: jasmine.Spy};
  let outboxService : OutboxService;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    outboxService = new OutboxService(httpClientSpy as any);
  });

  it('should return array or Users', () => {
    let testUsers : User[];
    testUsers = [];
    let playerId : number = 1;
    let oneUser =
     {
      id : 1,
      username : "user1",
      password : "password",
      firstName : "Bob",
      lastName : "Smith",
      points : 0,
      birthday : new Date()
    }

    testUsers.push(oneUser);

    httpClientSpy.get.and.returnValue(of(testUsers));

    outboxService.getPlayerFriendInvites(playerId).subscribe(
      users => expect(users).toEqual(testUsers, 'test users'), fail
    );
    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
  });

  // it('should return array of numbers', () => {

  //   let inviteNumber : number[];
  //   inviteNumber = [1];
  //   outboxService.createPlayerInviteUsername("Bob", "Smith").subscribe(invites => expect(invites).toBeNull)
  // });

  // it('should return void after deleting', () => {
  //   outboxService.deleteFriendInvite("Bob", "Smith").subscribe(users => expect(users).toEqual(undefined));
  // });


  // it('should return an error when the server returns 404', () => {
  //   const errorResponse = new HttpErrorResponse({
  //     error: 'test 404 error',
  //     status: 404, statusText: 'Not Found'
  //   });

  //   httpClientSpy.get.and.returnValue(of(errorResponse));
  //   debugger;
  //   outboxService.getPlayerFriendInvites(1).subscribe(
  //     users => fail('expected error, no users '),
  //     error => expect(error.message).toContain('test 404 error')
  //   );
  // });

});
