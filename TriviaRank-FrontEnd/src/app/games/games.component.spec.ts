import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs';
import { AccountService } from '../services/account.service';

import { GamesComponent } from './games.component';

describe('GamesComponent', () => {
  let component: GamesComponent;
  let fixture: ComponentFixture<GamesComponent>;

  const accountServiceSpy =  jasmine.createSpyObj('AccountService', ['getAllPlayers']);
  accountServiceSpy.user = new Observable<undefined>();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GamesComponent ],
      providers: [{provide: AccountService, useValue: accountServiceSpy}]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
