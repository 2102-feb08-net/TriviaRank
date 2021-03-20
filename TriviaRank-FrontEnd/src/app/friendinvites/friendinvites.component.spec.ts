import { HttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { AccountService } from '../services/account.service';
import { OutboxService } from '../services/outbox.service';

import { FriendinvitesComponent } from './friendinvites.component';

describe('FriendinvitesComponent', () => {
  let component: FriendinvitesComponent;
  let fixture: ComponentFixture<FriendinvitesComponent>;

  const accountServiceSpy =  jasmine.createSpyObj('AccountService', ['getAllPlayers']);
  accountServiceSpy.user = new Observable<undefined>();
  const outboxServiceSpy =  jasmine.createSpyObj('OutboxService', ['getPlayerFriendInvites']);
  outboxServiceSpy.getPlayerFriendInvites.and.returnValue(of([]));

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FriendinvitesComponent ],
      providers: [
        { provide: AccountService, useValue: accountServiceSpy },
        { provide: OutboxService, useValue: outboxServiceSpy }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendinvitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
