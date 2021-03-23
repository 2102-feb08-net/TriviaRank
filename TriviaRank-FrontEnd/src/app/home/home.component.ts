import { Component, OnInit } from '@angular/core';
import { AccountService } from '../services/account.service';
import { User } from '../models/User';
import { environment } from 'src/environments/environment';
import { OktaAuthService } from '@okta/okta-angular';
import { UserClaims } from '@okta/okta-auth-js';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isAuthenticated = true;
  oktaUser: UserClaims | null = null;
  okta = environment.okta;
  user?: User;

  constructor(private accountService: AccountService, private oktaAuth: OktaAuthService){
    this.oktaAuth.$authenticationState
      .subscribe(isAuthenticated => {
        this.isAuthenticated = isAuthenticated;
      });

    accountService.user.subscribe(p => {
      if (p) {
        this.user = p;
      }
    });
  }

  async ngOnInit(): Promise<void> {
  }

  formattedDate(date: Date): string
  {
    return `${new Date(date).toLocaleString()}`;
  }

  login(): void {
    this.oktaAuth.signInWithRedirect();
  }

  logout(): void {
    this.oktaAuth.signOut();
  }
}
