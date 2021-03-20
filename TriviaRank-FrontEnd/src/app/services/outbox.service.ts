import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class OutboxService {
  private baseUrl = 'https://triviarank-server.azurewebsites.net';
  constructor(private httpClient: HttpClient) { }

  getPlayerFriendInvites(playerId: number): Observable<User[]> {
    return this.httpClient.get<User[]>(`${this.baseUrl}/api/outbox/friend/${playerId}`);
  }

  createPlayerInviteUsername(playerUsername: string, friendUsername: string): Observable<number[]> {
    return this.httpClient.post<number[]>
      (`${this.baseUrl}/api/outbox/playerUsername/${playerUsername}/friendUsername/${friendUsername}`, null);
  }

  deleteFriendInvite(playerUsername: string, friendUsername: string): Observable<void> {
    return this.httpClient.delete<void>
      (`${this.baseUrl}/api/outbox/playerUsername/${playerUsername}/friendUsername/${friendUsername}`);
  }
}