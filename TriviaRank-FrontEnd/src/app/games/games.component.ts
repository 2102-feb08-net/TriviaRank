import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Game } from '../models/Game';
import { User } from '../models/User';
import { AccountService } from '../services/account.service';
import { GameService } from '../services/game.service';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit {
  public games?: Game[];
  public player?: User;
  form: FormGroup;
  submitted = false;
  constructor(
    private accountService: AccountService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private gameService: GameService ) {
      this.form = this.formBuilder.group({
        newgamename: ['', Validators.required],
        gamelength: ['', Validators.required],
        numquestions: ['', Validators.required],
      });
    }

  get f(): any { if (this.form) { return this.form.controls; } }

  ngOnInit(): void {
    this.player = this.accountService.user;
    if (this.player) {
      this.accountService.getPlayerGames(this.player.id)
        .subscribe(games => {this.games = games; });
    }
  }

  onSubmit(): void {
    this.submitted = true;

    // stop here if form is invalid
    if (this.form && this.form.invalid) {
        return;
    }

    if (this.f && this.player)
    {
        const newGame: Game = {
          id: 1,
          ownerId: this.player?.id,
          gameName: this.f.newgamename.value,
          totalQuestions: this.f.numquestions.value,
          startDate: new Date(),
          endDate: new Date(Date.now() + this.f.gamelength.value * 60000),
          gameMode: true,
          isPublic: true,
        };
        this.gameService.createGame(newGame)
          .subscribe(g => {
            this.games?.push(g);
            this.modalService.dismissAll();
          });
    }
  }

  open(content: any): void {
    this.modalService.open(content);
  }

}
