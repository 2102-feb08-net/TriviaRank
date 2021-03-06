import { HttpClient } from '@angular/common/http';
import { Injectable, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Message } from '../models/Message';
import { User } from '../models/User';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private baseUrl = environment.emailApiBaseUrl;
  constructor(private http: HttpClient) { }

  getPlayerMessages(playerId: number, friendId: number): Observable<Message[]> {
    return this.http.get<Message[]>(`${this.baseUrl}/api/messages/player/${playerId}/friend/${friendId}/amount/10`);
  }

  createPlayerMessage(message: Message): Observable<number> {
    return this.http.post<number>(`${this.baseUrl}/api/message`, message);
  }
}
