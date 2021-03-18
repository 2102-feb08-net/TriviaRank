import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from './models/User';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  public user: Observable<User>;
  private userSubject: BehaviorSubject<User>;
  constructor(private httpClient: HttpClient) 
  { 
    this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
    this.user = this.userSubject.asObservable();
  }

  login(username, password) {
    let user:User = <User>{
      id: -1,
      username: username,
      password: password,
      firstName: "",
      lastName: "",
      birthday: null,
    };
    localStorage.setItem('user', JSON.stringify(user));
    this.userSubject.next(user);
  }

  getAllPlayers()
  {
    return this.httpClient.get<User[]>(`https://localhost:44329/api/players`);
  }

  getByUsername(username: string)
  {
    return this.httpClient.get<User>(`https://localhost:44329/api/player/username/${username}`);
  }

  getById(id: number)
  {
    return this.httpClient.get<User>(`https://localhost:44329/api/player/id/${id}`);
  }

  getFriends(playerId: number)
  {
    return this.httpClient.get<number[]>(`https://localhost:44329/api/player/friend/${playerId}`);
  }
}
