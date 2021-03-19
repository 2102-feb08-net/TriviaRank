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
  public user: Observable<User>;
  private userSubject: BehaviorSubject<User>;
  private baseUrl:string = "https://triviarank-server.azurewebsites.net";
  constructor(private httpClient: HttpClient) 
  { 
    this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user') as any));
    this.user = this.userSubject.asObservable();
  }

  login(username:string, password:string) {
    this.getByUsername(username).subscribe(p => {
      localStorage.setItem('user', JSON.stringify(p));
      this.userSubject.next(p);
      this.user = this.userSubject.asObservable();
    });
  }

  getAllPlayers()
  {
    return this.httpClient.get<User[]>(`${this.baseUrl}/api/players`)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  getByUsername(username: string)
  {
    return this.httpClient.get<User>(`${this.baseUrl}/api/player/username/${username}`)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  getById(id: number)
  {
    return this.httpClient.get<User>(`${this.baseUrl}/api/player/id/${id}`)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  getFriends(playerId: number)
  {
    return this.httpClient.get<number[]>(`${this.baseUrl}/api/player/friend/${playerId}`)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  getPlayerGames(playerId: number)
  {
    return this.httpClient.get<Game[]>(`${this.baseUrl}/api/player/${playerId}/games`)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
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
