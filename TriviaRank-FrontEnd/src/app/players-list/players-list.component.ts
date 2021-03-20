import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Message } from '../models/Message';
import { User } from '../models/User';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-players-list',
  templateUrl: './players-list.component.html',
  styleUrls: ['./players-list.component.css']
})
export class PlayersListComponent implements OnInit {
  @Input() players: User[] = [];
  @Input() player?: User;
  form: FormGroup;
  submitted = false;
  public messages: Message[] = [];
  other?: User;

  constructor(
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private messageService: MessageService
  ) {
    this.form = this.formBuilder.group({
      message: ['', Validators.required]
    });
    if (this.player && this.other) {
      this.messageService.getPlayerMessages(this.player.id, this.other.id)
        .subscribe(m => {this.messages = m; });
    }
  }

  ngOnInit(): void {
  }

  get f(): any { if (this.form) { return this.form.controls; } }

  onSubmit(): void {
    this.submitted = true;

    // stop here if form is invalid
    if (this.form && this.form.invalid) {
        return;
    }

    if (this.f && this.f.message.value && this.player && this.other) {
      const newMessage: Message = {
        fromId: this.player.id,
        toId: this.other.id,
        body: this.f.message.value,
        id: -1,
        senderUsername: '',
        receiverUsername: '',
        date: new Date()
      };
      this.form.reset();
      this.submitted = false;
      this.messageService.createPlayerMessage(newMessage)
        .subscribe(messageId => {
          console.log(`created message with id ${messageId}`);
          this.messages.push(newMessage);
          if (this.messages.length >= 10) {
            this.messages.shift();
          }
        });
    }
  }

  getMessages(other: User, player: User, times: number): void {
    if (player) {
      this.messageService.getPlayerMessages(other.id, player.id)
        .subscribe(m => {
          this.messages = this.messages.concat(m);
          this.messages.sort((m1, m2) => {
            const d2 = new Date(m2.date);
            const d1 = new Date(m1.date);
            return d1.getTime() - d2.getTime();
          });
          this.messages =
            this.messages.slice(Math.max(this.messages.length - 10, 0));
          if (times > 0) {
            this.getMessages(player, other, times-1);
          }
        });
    }
  }

  open(content: any, other: User): void {
    this.messages = [];
    if (this.player) {
      this.getMessages(other, this.player, 1);
      this.modalService.open(content);
      this.other = other;
    }
  }
}
