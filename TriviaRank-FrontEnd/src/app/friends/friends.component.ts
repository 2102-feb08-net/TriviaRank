import { Component, Input, OnInit } from '@angular/core';
import { AccountService } from '../services/account.service';
import { User } from '../models/User';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',

})
export class FriendsComponent implements OnInit {
  @Input() public user?: User;
  public friends: User[] = [];
  constructor(private userService: AccountService) { }

  ngOnInit(): void {
    this.user = this.userService.user;
    if (this.user) {
      this.userService.getFriends(this.user.id)
        .subscribe(friendsIds => {this.convertFriendIdsToUser(friendsIds); });
    }
  }

  convertFriendIdsToUser(friendIds: number[]): void {
    for (const id of friendIds) {
      this.userService.getById(id)
        .subscribe(p => this.friends.push(p));
    }
  }



}
