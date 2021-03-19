import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private baseUrl:string = "https://triviarank-server.azurewebsites.net";
  constructor(private httpClient:HttpClient) { }
}
