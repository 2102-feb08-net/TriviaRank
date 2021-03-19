import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-newfriendinfo',
  templateUrl: './newfriendinfo.component.html',
  styleUrls: ['./newfriendinfo.component.css']
})
export class NewfriendinfoComponent implements OnInit {
  form: FormGroup;
  submitted = false;

  constructor(private modalService: NgbModal, private formBuilder: FormBuilder,) {
    this.form = this.formBuilder.group({
      username: ['', Validators.required]
    });
   }

  ngOnInit(): void {
  }

  get f() { if (this.form) return this.form.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.form && this.form.invalid) {
        return;
    }
    
    if (this.f)
      console.log(this.f.username.value);
  }

  open(content: any) {
    this.modalService.open(content);
  }

}
