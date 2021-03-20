import { Component, Input, OnInit } from '@angular/core';
import { AccountService } from '../services/account.service';
import { User } from '../models/User';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @Input() public user?: User;
  constructor(private accountService: AccountService)
  {
  }

  ngOnInit(): void {
    this.user = this.accountService.user;
    if (this.user) {
      this.accountService.getByUsername(this.user.username)
        .subscribe(p => {
          this.user = p;
          localStorage.setItem('user', JSON.stringify(this.user));
          console.log(`retrieved player ${this.user.username}`);
        });
    }
  }

  formattedDate(date: Date): string
  {
    return `${new Date(date).toLocaleString()}`;
  }

}
