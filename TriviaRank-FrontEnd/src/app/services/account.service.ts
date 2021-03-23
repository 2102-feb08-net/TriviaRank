import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Game } from '../models/Game';
import { User } from '../models/User';
import { environment } from 'src/environments/environment';
import { OktaAuthService } from '@okta/okta-angular';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  public myUserSubject = new BehaviorSubject<User | null>(null);
  public user: Observable<User | null> = this.myUserSubject.asObservable();
  private baseUrl = environment.emailApiBaseUrl;

  constructor(private httpClient: HttpClient, private oktaAuth: OktaAuthService)
  {
    oktaAuth.$authenticationState.subscribe(async isAuthenticated => {
      if (isAuthenticated) {
        const oktaUser = await this.oktaAuth.getUser();
        const toAddPlayer: User = {
          id: 1,
          username: oktaUser.email ? oktaUser.email : 'random@gmail.com',
          password: 'notused',
          firstName: oktaUser.given_name ? this.createName(oktaUser.given_name) : 'First',
          lastName: oktaUser.family_name ? this.createName(oktaUser.family_name) : 'Last',
          points: 0,
          birthday: new Date(Date.now())
        };
        this.createOrGetPlayer(toAddPlayer)
          .pipe(catchError(err => {
            oktaAuth.signOut();
            return of(err);
          }))
          .subscribe(p => {
            if (p.hasOwnProperty('firstName')) {
              this.myUserSubject.next(p);
            }
          });
      }
    });
  }

  createName(rawName: string): string {
    return rawName[0].toUpperCase() + rawName.substring(1).toLowerCase();
  }

  createOrGetPlayer(player: User): Observable<User> {
    return this.httpClient.post<User>(`${this.baseUrl}/api/player`, player);
  }

  getAllPlayers(): Observable<User[]>
  {
    return this.httpClient.get<User[]>(`${this.baseUrl}/api/players`)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  getTotalPlayers(): Observable<number> {
    return this.httpClient.get<number>(`${this.baseUrl}/api/players/amount`)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  getNPlayers(numPlayers: number, currentPage: number): Observable<User[]>
  {
    return this.httpClient.get<User[]>
      (`${this.baseUrl}/api/players/amount/${numPlayers}/index/${currentPage - 1}`)
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
