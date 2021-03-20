import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Game } from '../models/Game';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  public user?: User;
  private baseUrl = 'https://triviarank-server.azurewebsites.net';

  constructor(private httpClient: HttpClient)
  {
    const userString = localStorage.getItem('user');
    if (userString) {
      this.user = JSON.parse(userString);
    }
  }

  login(username: string, password: string): Observable<User> {
    return this.getByUsername(username)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  getAllPlayers(): Observable<User[]>
  {
    return this.httpClient.get<User[]>(`${this.baseUrl}/api/players`)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  getByUsername(username: string): Observable<User>
  {
    return this.httpClient.get<User>(`${this.baseUrl}/api/player/username/${username}`)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  getById(id: number): Observable<User>
  {
    return this.httpClient.get<User>(`${this.baseUrl}/api/player/id/${id}`)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  getFriends(playerId: number): Observable<number[]>
  {
    return this.httpClient.get<number[]>(`${this.baseUrl}/api/player/friend/${playerId}`)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  getPlayerGames(playerId: number): Observable<Game[]>
  {
    return this.httpClient.get<Game[]>(`${this.baseUrl}/api/player/${playerId}/games`)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  createFriend(playerId:number, friendId:number): Observable<any> {
    return this.httpClient.post<void>(`${this.baseUrl}/api/player/${playerId}/friend/${friendId}`, null)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }
}
