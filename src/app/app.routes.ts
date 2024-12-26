import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HeaderComponent } from './components/header/header.component';
import { CharactersListComponent } from './components/characters-list/characters-list.component';

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
        component: HeaderComponent, //select route test
      },
    ],
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
