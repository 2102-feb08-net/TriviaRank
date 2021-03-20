import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { unescapeLeadingUnderscores } from 'typescript';
import { AccountService } from '../services/account.service';

import { FriendsComponent } from './friends.component';

describe('FriendsComponent', () => {
  let component: FriendsComponent;
  let fixture: ComponentFixture<FriendsComponent>;

  const accountServiceSpy =  jasmine.createSpyObj('AccountService', ['getFriends']);
  accountServiceSpy.getFriends.and.returnValue(of([]));
  accountServiceSpy.user = new Observable<undefined>();


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FriendsComponent ],
      providers: [{provide: AccountService, useValue: accountServiceSpy}]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
