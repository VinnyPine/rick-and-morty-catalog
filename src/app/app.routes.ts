import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CharactersListComponent } from './components/characters-list/characters-list.component';
import { CharacterComponent } from './pages/character/character.component';
import { EpisodesListComponent } from './components/episodes-list/episodes-list.component';
import { EpisodeComponent } from './pages/episode/episode.component';

export const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'character',
        component: CharactersListComponent,
      },
      {
        path: 'episode',
        component: EpisodesListComponent,
      },
    ],
  },
  {
    path: 'character/:id',
    component: CharacterComponent,
  },
  {
    path: 'episode/:id',
    component: EpisodeComponent,
  },
  {
    path: '',
    redirectTo: 'character',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'character',
    pathMatch: 'full',
  },
];
