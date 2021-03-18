import { Component, OnInit } from '@angular/core';
import { AccountService } from '../account.service';
import { User } from '../models/User';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {
  public players: User[] = [];
  constructor(private accountService:AccountService) { }

  ngOnInit(): void {
    this.accountService.getAllPlayers()
      .subscribe(players => 
        {
          players.sort((p1,p2) => p2.points - p1.points);
          this.players = players;
        });
  }

}
