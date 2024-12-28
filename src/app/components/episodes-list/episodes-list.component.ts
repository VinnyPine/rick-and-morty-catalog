import { Component, inject, signal } from '@angular/core';
import { RickandmortyapiService } from '../../services/rickandmortyapi.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-episodes-list',
  imports: [],
  templateUrl: './episodes-list.component.html',
  styleUrl: './episodes-list.component.scss'
})
export class EpisodesListComponent {
  private rickandmortyapiService = inject(RickandmortyapiService);
  private router = inject(Router);

  list() {
  const list = this.rickandmortyapiService.listEpisodes();
    return list;
  }

  listHasItems() {
    const list = this.list();
    return list !== null && Boolean(list.length);
  }

  selectEpisode(id: number) {
    this.router.navigate(['episode', id]);
  }

  nextPage() {
    this.rickandmortyapiService.nextPageOfEpisodes();
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
