import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { OktaAuthService } from '@okta/okta-angular';
import { Observable } from 'rxjs';
import { AppComponent } from './app.component';
import { AccountService } from './services/account.service';

describe('AppComponent', () => {
  const accountServiceSpy =  jasmine.createSpyObj('AccountService', ['getAllPlayers']);
  accountServiceSpy.user = new Observable<undefined>();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      providers: [
        {provide: AccountService, useValue: accountServiceSpy},
      ]
    }).compileComponents();
  });
});
