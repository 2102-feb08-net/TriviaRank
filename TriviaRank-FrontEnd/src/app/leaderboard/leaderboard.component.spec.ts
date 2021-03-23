import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { AccountService } from '../services/account.service';

import { LeaderboardComponent } from './leaderboard.component';

describe('LeaderboardComponent', () => {
  let component: LeaderboardComponent;
  let fixture: ComponentFixture<LeaderboardComponent>;

  const accountServiceSpy =
    jasmine.createSpyObj('AccountService', ['getTotalPlayers', 'getNPlayers']);
  accountServiceSpy.user = new Observable<undefined>();
  accountServiceSpy.getTotalPlayers.and.returnValue(of(1));
  accountServiceSpy.getNPlayers.and.returnValue(of([]));

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeaderboardComponent ],
      providers: [{provide: AccountService, useValue: accountServiceSpy}]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaderboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
