import { Component, Input, OnInit } from '@angular/core';
import { User } from '../models/User';

@Component({
  selector: 'app-players-list',
  templateUrl: './players-list.component.html',
  styleUrls: ['./players-list.component.css']
})
export class PlayersListComponent implements OnInit {
  @Input() players:User[] = [];
  constructor() { }

  ngOnInit(): void {
  }

}
