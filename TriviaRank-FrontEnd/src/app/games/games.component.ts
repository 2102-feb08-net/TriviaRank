import { Component, OnInit } from '@angular/core';
import { Game } from '../models/Game';
import { User } from '../models/User';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit {
  public games?:Game[];
  public player?:User;
  constructor(private accountService:AccountService) { }

  ngOnInit(): void {
    this.accountService.user.subscribe(p => this.player = p);
    if (this.player) {
      this.accountService.getPlayerGames(this.player.id)
        .subscribe(games => {this.games = games; console.log(games);});
    }
  }

}
