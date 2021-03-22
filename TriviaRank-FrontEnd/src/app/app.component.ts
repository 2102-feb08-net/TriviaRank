import { Component, Input } from '@angular/core';
import { of } from 'rxjs';
import { AccountService } from './services/account.service';
import { User } from './models/User';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @Input() user?: User;

  constructor(private accountService: AccountService) {
    accountService.user?.subscribe(p => {
      if (p) {
        this.user = p;
      }
    });
  }
}
