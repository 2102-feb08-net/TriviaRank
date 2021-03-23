import { Component, Input, OnInit } from '@angular/core';
import { AccountService } from '../services/account.service';
import { User } from '../models/User';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',

})
export class FriendsComponent implements OnInit {
  public user?: User;
  public friends: User[] = [];
  constructor(private userService: AccountService) {
    userService.user.subscribe(p => {
      if (p) {
        this.user = p;
      }
    });
   }

  ngOnInit(): void {
    if (this.user) {
      this.userService.getFriends(this.user.id)
        .pipe(
          catchError(err => {
            return of(err);
          })
        )
        .subscribe(friendsIds => {
          if (Array.isArray(friendsIds)) {
            this.convertFriendIdsToUser(friendsIds);
          }
        });
    }
  }

  convertFriendIdsToUser(friendIds: number[]): void {
    for (const id of friendIds) {
      this.userService.getById(id)
        .pipe(
          catchError(err => {
            return of(err);
          })
        )
        .subscribe(p => {
          if (p.hasOwnProperty('username')) {
            this.friends.push(p);
          }
        });
    }
  }



}
