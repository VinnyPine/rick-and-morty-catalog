import { Component, inject, OnInit } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { RouterOutlet } from '@angular/router';
import { MenuComponent } from "../../components/menu/menu.component";
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Gender, Status } from '../../types/rickandmortyapi';
import { RickandmortyapiService } from '../../services/rickandmortyapi.service';

@Component({
  selector: 'app-dashboard',
  imports: [RouterOutlet, HeaderComponent, MenuComponent, ReactiveFormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  rickandmortyapiService = inject(RickandmortyapiService);

  search = new FormControl('', { nonNullable: true });
  searchBy = new FormControl<'name' | 'species' | 'types'>('name', { nonNullable: true })

  filtersForm = new FormGroup({
    status: new FormControl<Status | null>(null),
    gender: new FormControl<Gender | null>(null),
    name: new FormControl<string | null>(null),
    species: new FormControl<string | null>(null),
    types: new FormControl<string | null>(null),
  });

  handleSearch() {
    console.warn(this.filtersForm.value);

    this.filtersForm.setControl(this.searchBy.value, new FormControl(this.search.value));

    this.rickandmortyapiService.getAllCharacters(this.filtersForm.value);

    this.filtersForm.reset({
      status: this.filtersForm.value.status,
      gender: this.filtersForm.value.gender,
    });
  }

  ngOnInit(): void {}
}
