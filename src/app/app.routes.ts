import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CharactersListComponent } from './components/characters-list/characters-list.component';
import { CharacterComponent } from './pages/character/character.component';
import { EpisodesListComponent } from './components/episodes-list/episodes-list.component';

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
