import { Component, OnInit } from '@angular/core';
import { AccountService } from '../services/account.service';
import { User } from '../models/User';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',

})
export class FriendsComponent implements OnInit {
  public user?:User;
  public friends:User[] = [];
  constructor(private userService: AccountService) { }

  ngOnInit(): void {
    this.userService.user.subscribe(p => this.user = p);
    if (this.user) {
      this.userService.getFriends(this.user.id)
        .subscribe(friendsIds => {this.convertFriendIdsToUser(friendsIds)});
    }
  }

  onNewFriendClick() {
  }

  convertFriendIdsToUser(friendIds:number[]): void {
    for(let id of friendIds) {
      this.userService.getById(id)
        .subscribe(p => this.friends.push(p));
    }
  }



}
