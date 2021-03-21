import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { GamesComponent } from './games/games.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { FriendsComponent } from './friends/friends.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { PlayersListComponent } from './players-list/players-list.component';
import { FriendinvitesComponent } from './friendinvites/friendinvites.component';
import { GamelistComponent } from './gamelist/gamelist.component';
import { NewfriendinfoComponent } from './newfriendinfo/newfriendinfo.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { GameComponent } from './game/game.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    HomeComponent,
    GamesComponent,
    LeaderboardComponent,
    FriendsComponent,
    PlayersListComponent,
    FriendinvitesComponent,
    GamelistComponent,
    NewfriendinfoComponent,
    GameComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule,
    AppRoutingModule,
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
