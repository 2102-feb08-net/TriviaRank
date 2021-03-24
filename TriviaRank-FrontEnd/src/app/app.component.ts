import { Component, Input } from '@angular/core';
import { of } from 'rxjs';
import { AccountService } from './services/account.service';
import { User } from './models/User';
import { RouterModule } from '@angular/router';
import { OktaAuthService } from '@okta/okta-angular';

// a small change

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  user?: User;

  constructor(private accountService: AccountService, private oktaAuth: OktaAuthService) {
    accountService.user.subscribe(p => {
      if (p) {
        this.user = p;
      }
    });
  }

  logOut(): void {
    this.oktaAuth.signOut();
  }
}
