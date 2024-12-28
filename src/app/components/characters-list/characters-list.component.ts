import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { RickandmortyapiService } from '../../services/rickandmortyapi.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-characters-list',
  imports: [],
  templateUrl: './characters-list.component.html',
  styleUrl: './characters-list.component.scss',
})
export class CharactersListComponent implements OnInit {
  private rickandmortyapiService = inject(RickandmortyapiService);
  private router = inject(Router);

  list() {
    return this.rickandmortyapiService.listCharacters();
  }

  listHasItems() {
    const list = this.list();
    return list !== null && Boolean(list.length);
  }

  selectCharacter(id: number) {
    this.router.navigate(['character', id]);
  }

  nextPage() {
    this.rickandmortyapiService.nextPageOfCharacters();
  }

  onScroll(event: Event) {
    const target = event.target as HTMLUListElement;

    const scrollEnd =
      target.scrollHeight - target.offsetHeight === target.scrollTop;
    if (scrollEnd) return this.nextPage();
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.rickandmortyapiService.reset();
  }
}
