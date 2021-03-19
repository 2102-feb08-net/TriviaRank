import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class OutboxService {
  private baseUrl:string = "https://triviarank-server.azurewebsites.net";
  constructor(private httpClient: HttpClient) { }

  getPlayerFriendInvites(playerId: number)
  {
    return this.httpClient.get<User[]>(`${this.baseUrl}/api/outbox/friend/${playerId}`);
  }
}
