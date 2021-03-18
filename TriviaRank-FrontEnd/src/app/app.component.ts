import { Component } from '@angular/core';
import { of } from 'rxjs';
import { AccountService } from './account.service';
import { User } from './models/User';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  user?: User;
  title = 'TriviaRank-FrontEnd';

  constructor(private accountService: AccountService) {
    this.accountService.user.subscribe(x => this.user = x);
  }
}
