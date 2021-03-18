import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FriendinvitesComponent } from './friendinvites/friendinvites.component';
import { FriendsComponent } from './friends/friends.component';
import { GamesComponent } from './games/games.component';
import { HomeComponent } from './home/home.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { LoginFormComponent } from './login-form/login-form.component';

const routes: Routes = [
  { path: 'login', component: LoginFormComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'home', component: HomeComponent},
  { path: 'games', component: GamesComponent},
  { path: 'leaderboard', component: LeaderboardComponent},
  { path: 'friends', component: FriendsComponent},
  { path: 'friendinvites', component: FriendinvitesComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
