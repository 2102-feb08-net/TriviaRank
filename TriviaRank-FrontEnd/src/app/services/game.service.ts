import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Game } from '../models/Game';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private baseUrl = 'https://triviarank-server.azurewebsites.net';
  constructor(private httpClient: HttpClient) { }

  getGame(gameId: number): Observable<Game> {
    return this.httpClient.get<Game>(`${this.baseUrl}/api/game/${gameId}`);
  }

  createGame(game: Game): Observable<Game> {
    return this.httpClient.post<Game>(`${this.baseUrl}/api/game`, game);
  }
}
