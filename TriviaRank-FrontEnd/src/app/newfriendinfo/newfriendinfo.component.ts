import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../models/User';
import { OutboxService } from '../services/outbox.service';

@Component({
  selector: 'app-newfriendinfo',
  templateUrl: './newfriendinfo.component.html',
  styleUrls: ['./newfriendinfo.component.css']
})
export class NewfriendinfoComponent implements OnInit {
  @Input() player?: User;
  form: FormGroup;
  submitted = false;

  constructor(
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private outboxService: OutboxService) {
    this.form = this.formBuilder.group({
      username: ['', Validators.required]
    });
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

    if (this.f && this.player?.username) {
      this.outboxService.createPlayerInviteUsername(this.player?.username, this.f.username.value)
        .pipe(
          catchError(err => {
            return of(err);
          })
        )
        .subscribe(i => {
          if (!isNaN(i)) {
            console.log(`Created User invite with id ${i}`);
            this.modalService.dismissAll();
          }
        });
    }
  }

  open(content: any): void {
    this.modalService.open(content);
  }

}
