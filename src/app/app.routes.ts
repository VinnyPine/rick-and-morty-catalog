import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CharactersListComponent } from './components/characters-list/characters-list.component';
import { CharacterComponent } from './pages/character/character.component';
import { EpisodesListComponent } from './components/episodes-list/episodes-list.component';
import { EpisodeComponent } from './pages/episode/episode.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/character',
    pathMatch: 'full',
  },
  {
    path: 'character/:id',
    // component: CharacterComponent,
    loadComponent: () =>
      import('./pages/character/character.component').then(
        ({ CharacterComponent }) => CharacterComponent
      ),
  },
  {
    path: 'episode/:id',
    // component: EpisodeComponent,
    loadComponent: () =>
      import('./pages/episode/episode.component').then(
        ({ EpisodeComponent }) => EpisodeComponent
      ),
  },
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'character',
        component: CharactersListComponent,
        pathMatch: 'full',
      },
      {
        path: 'episode',
        component: EpisodesListComponent,
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'character',
    pathMatch: 'full',
  },
];
