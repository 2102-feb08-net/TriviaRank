import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/User';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OutboxService {
  private baseUrl = environment.emailApiBaseUrl;
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
