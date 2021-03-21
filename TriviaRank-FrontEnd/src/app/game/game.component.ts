import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Game } from '../models/Game';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  @Input() public game?: Game;
  public active = false;

  constructor(
    private modalService: NgbModal,
  ) { }

  ngOnInit(): void {
    if (this.game) {
      this.active =
        ((new Date(this.game.endDate)).getTime() - Date.now()) > 0;
    }
  }

  open(content: any): void {
    this.modalService.open(content);
  }

}
