import { Component, OnInit, Input } from '@angular/core';
import { AccountService } from '../account.service';
import { User } from '../models/User';
import { OutboxService } from '../outbox.service';


@Component({
  selector: 'app-friendinvites',
  templateUrl: './friendinvites.component.html',
  styleUrls: ['./friendinvites.component.css']
})
export class FriendinvitesComponent implements OnInit {
  public inviters:User[] = [];
  private player?:User;

  constructor(
    private outboxService:OutboxService,
    private accountService:AccountService
    ) { 
      accountService.user.subscribe(p => this.player = p);
    }

  ngOnInit(): void {
    if (this.player)
    {
      this.outboxService.getPlayerFriendInvites(this.player.id)
        .subscribe(players => {this.inviters = players; console.log(players)});
    }
  }

}
