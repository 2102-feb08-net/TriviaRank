import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { User } from './models/User';

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
    return this.httpClient.get<User[]>(`${this.baseUrl}/api/players`);
  }

  getByUsername(username: string)
  {
    return this.httpClient.get<User>(`${this.baseUrl}/api/player/username/${username}`);
  }

  getById(id: number)
  {
    return this.httpClient.get<User>(`${this.baseUrl}/api/player/id/${id}`);
  }

  getFriends(playerId: number)
  {
    return this.httpClient.get<number[]>(`${this.baseUrl}/api/player/friend/${playerId}`);
  }
}
