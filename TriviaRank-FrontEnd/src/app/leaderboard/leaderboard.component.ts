import { Component, OnInit } from '@angular/core';
import { AccountService } from '../services/account.service';
import { User } from '../models/User';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {
  public totalPlayers = 0;
  public pageSize = 5;
  public currentPage = 1;
  public players: User[] = [];

  constructor(private accountService: AccountService) { }

  getNumPlayers(): void {
    this.accountService.getTotalPlayers()
      .pipe( catchError(err => of(err)))
        .subscribe(num => {
          if (!isNaN(num)) {
            this.totalPlayers = num;
          }
        });
  }

  getCurrentPlayers(): void {
    this.accountService.getNPlayers(this.pageSize, this.currentPage)
      .pipe( catchError(err => of(err)))
        .subscribe(players => {
          if (Array.isArray(players)) {
            this.players = players;
          }
        });
  }

  changePage(page: number): void {
    this.currentPage = page;
    this.getCurrentPlayers();
  }

  ngOnInit(): void {
    this.getNumPlayers();
    this.getCurrentPlayers();
  }

}
