import { Component, OnInit } from '@angular/core';
import { AccountService } from '../services/account.service';
import { User } from '../models/User';
import { environment } from 'src/environments/environment';
import { OktaAuthService } from '@okta/okta-angular';
import { UserClaims } from '@okta/okta-auth-js';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isAuthenticated = false;
  oktaUser: UserClaims | null = null;
  okta = environment.okta;
  public user?: User;

  constructor(private accountService: AccountService, private oktaAuth: OktaAuthService){
    this.oktaAuth.$authenticationState
      .subscribe(isAuthenticated => {
        this.isAuthenticated = isAuthenticated;
      });
   }

  async ngOnInit(): Promise<void> {
    this.isAuthenticated = await this.oktaAuth.isAuthenticated();
    if (this.isAuthenticated) {
      this.oktaUser = await this.oktaAuth.getUser();
      if (this.oktaUser.email) {
        this.accountService.login(this.oktaUser.email);
      }
      this.accountService.user.subscribe(p => {
        if (p) {
          this.user = p;
        }
      });
    }
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
