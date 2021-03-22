import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Game } from '../models/Game';
import { Question } from '../models/Question';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  @Input() public game?: Game;
  public index = 0;
  public questions: Question[] = [];
  public active = false;

  constructor(
    private modalService: NgbModal,
  ) {
    // Placeholder questions
    for (let i = 0; i < 5; i++) {
      this.questions.push({
        id: i,
        question: `This is question number ${i + 1}`,
        correctAnswer: 'correct!',
        wrongAnswers: ['incorrect1', 'incorrect2', 'incorrect3']
      });
    }
   }

  ngOnInit(): void {
    if (this.game) {
      this.active =
        ((new Date(this.game.endDate)).getTime() - Date.now()) > 0;
    }
  }

  open(content: any): void {
    this.modalService.open(content);
  }

  incrementIndex(): void {
    this.index += 1;
    if (this.index >= this.questions.length) {
      this.modalService.dismissAll();
    }
  }

}
