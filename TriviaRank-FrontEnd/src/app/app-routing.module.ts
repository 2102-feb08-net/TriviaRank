import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FriendinvitesComponent } from './friendinvites/friendinvites.component';
import { FriendsComponent } from './friends/friends.component';
import { GameComponent } from './game/game.component';
import { GamesComponent } from './games/games.component';
import { HomeComponent } from './home/home.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { OktaAuthGuard, OktaCallbackComponent } from '@okta/okta-angular';

const routes: Routes = [
  { path: 'implicit/callback', component: OktaCallbackComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent},
  { path: 'games', component: GamesComponent, canActivate: [OktaAuthGuard] },
  { path: 'leaderboard', component: LeaderboardComponent, canActivate: [OktaAuthGuard] },
  { path: 'friends', component: FriendsComponent, canActivate: [OktaAuthGuard] },
  { path: 'friendinvites', component: FriendinvitesComponent, canActivate: [OktaAuthGuard] },
  { path: 'game/:gameId', component: GameComponent, canActivate: [OktaAuthGuard] },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
