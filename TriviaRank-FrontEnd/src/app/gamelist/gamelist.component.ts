import { Component, Input, OnInit } from '@angular/core';
import { Game } from '../models/Game';

@Component({
  selector: 'app-gamelist',
  templateUrl: './gamelist.component.html',
  styleUrls: ['./gamelist.component.css']
})
export class GamelistComponent implements OnInit {
  @Input() games?:Game[];
  constructor() { }

  ngOnInit(): void {
  }

  formattedDate(date: Date): string {
    return `${new Date(date).toLocaleString()}`;
  }

}
