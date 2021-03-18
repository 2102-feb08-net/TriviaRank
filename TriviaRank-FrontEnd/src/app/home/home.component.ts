import { Component, OnInit } from '@angular/core';
import { AccountService } from '../account.service';
import { User } from '../models/User';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public user:User;
  constructor(private accountService: AccountService) 
  {
  }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem("user"));
    this.accountService.getByUsername(this.user.username)
      .subscribe(p => {this.user = p; localStorage.setItem("user", JSON.stringify(this.user));});
    localStorage.setItem("user", JSON.stringify(this.user));
  }

}
