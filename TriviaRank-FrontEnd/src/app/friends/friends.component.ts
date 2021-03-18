import { Component, OnInit } from '@angular/core';
import { AccountService } from '../account.service';
import { User } from '../models/User';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {
  public user:User;
  public friends:User[] = [];
  constructor(private userService: AccountService) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem("user"));
    this.userService.getFriends(this.user.id)
      .subscribe(friendsIds => this.convertFriendIdsToUser(friendsIds));
  }

  convertFriendIdsToUser(friendIds:number[]): void {
    for(let id of friendIds) {
      this.userService.getById(id)
        .subscribe(p => this.friends.push(p));
    }
  }



}
