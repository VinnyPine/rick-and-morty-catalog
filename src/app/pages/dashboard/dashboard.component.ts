import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { Router, RouterOutlet } from '@angular/router';
import { MenuComponent } from '../../components/menu/menu.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Gender, Status } from '../../types/rickandmortyapi';
import { RickandmortyapiService } from '../../services/rickandmortyapi.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [RouterOutlet, HeaderComponent, MenuComponent, ReactiveFormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  platformId = inject(PLATFORM_ID);
  rickandmortyapiService = inject(RickandmortyapiService);
  router = inject(Router);

  search = new FormControl('', { nonNullable: true });
  searchBy = new FormControl<'name' | 'species' | 'types'>('name', {
    nonNullable: true,
  });

  filtersForm = new FormGroup({
    status: new FormControl<Status | null>(null),
    gender: new FormControl<Gender | null>(null),
  });

  togglePage = new FormControl<'character' | 'episode'>('character', {
    nonNullable: true,
  });

  handleSearch() {
    if (this.togglePage.value === 'character') {
      const filter = {
        ...this.filtersForm.value,
        [this.searchBy.value]: this.search.value,
      };

      this.rickandmortyapiService.getAllCharacters(filter);
    } else {
      this.rickandmortyapiService.getAllEpisodes({
        [this.searchBy.value]: this.search.value,
      });
    }
  }

  toggleList() {
    this.handleSearch();
  }

  clientSideRedirect() {
    if (isPlatformBrowser(this.platformId)) {
      const cookies = document.cookie.split(';');
      const dynamicRouteCookie = cookies.find((cookie) =>
        cookie.trim().startsWith('dynamicRoute=')
      );
      if (!dynamicRouteCookie) return;

      const dynamicRoute = dynamicRouteCookie.trim().replace('dynamicRoute=/', '');
      const [route, id] = dynamicRoute.split('/');

      document.cookie = 'dynamicRoute=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

      this.router.navigate([route, id]);
    }

    return;
  }

  ngOnInit(): void {
    this.clientSideRedirect();

    const page = this.router.url.replace('/', '');
    if (page === 'episode') this.togglePage.setValue(page);

    this.filtersForm.valueChanges.subscribe((value) => {
      this.handleSearch();
    });
  }
}
