import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { User } from './models/User';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  public user: Observable<User>;
  private userSubject: BehaviorSubject<User>;
  constructor() 
  { 
    this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
    this.user = this.userSubject.asObservable();
  }

  login(username, password) {
    let user:User = <User>{
      id: "1",
      username: "username1",
      password: "password",
      firstName: "first",
      lastName: "last",
      token: null,
    };
    localStorage.setItem('user', JSON.stringify(user));
    this.userSubject.next(user);
    return of(<User>{
      id: "1",
      username: "username1",
      password: "password",
      firstName: "first",
      lastName: "last",
      token: null,
    })
  }
}
