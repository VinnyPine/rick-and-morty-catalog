import { Component, inject, OnInit } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { Router, RouterOutlet } from '@angular/router';
import { MenuComponent } from '../../components/menu/menu.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Gender, Status } from '../../types/rickandmortyapi';
import { RickandmortyapiService } from '../../services/rickandmortyapi.service';

@Component({
  selector: 'app-dashboard',
  imports: [RouterOutlet, HeaderComponent, MenuComponent, ReactiveFormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
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

  ngOnInit(): void {
    const page = this.router.url.replace('/', '');
    if (page === 'episode') this.togglePage.setValue(page);
    if (page === '') this.router.navigate(['character']);

    this.filtersForm.valueChanges.subscribe((value) => {
      this.handleSearch();
    });

    this.handleSearch();
  }
}
