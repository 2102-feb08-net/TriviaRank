import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Game } from '../models/Game';
import { User } from '../models/User';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private myUserSubject = new BehaviorSubject<User | null>(null);
  public user: Observable<User | null> = this.myUserSubject.asObservable();
  private baseUrl = environment.emailApiBaseUrl;

  constructor(private httpClient: HttpClient)
  {
  }

  login(username: string): void {
    this.getByUsername(username)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
      .subscribe(u => {
        if (u.hasOwnProperty('username')) {
          console.log('hello');
          this.myUserSubject.next(u);
        }
      });
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

  createFriend(playerId: number, friendId: number): Observable<any> {
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
