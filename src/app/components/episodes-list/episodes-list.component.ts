import { Component, inject, signal } from '@angular/core';
import { RickandmortyapiService } from '../../services/rickandmortyapi.service';
import { Router } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-episodes-list',
  imports: [],
  templateUrl: './episodes-list.component.html',
  styleUrl: './episodes-list.component.scss'
})
export class EpisodesListComponent {
  private rickandmortyapiService = inject(RickandmortyapiService);
  private router = inject(Router);

  breakpointObserver = inject(BreakpointObserver);
  isSmallScreen = signal(false);

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

  scrolling(index: number) {
    const list = this.list();
    if (list !== null && index >= list.length - 10) {
      this.rickandmortyapiService.nextPageOfEpisodes();
    }
  }

  ngOnInit(): void {
    this.breakpointObserver.observe([
      Breakpoints.XSmall
    ]).subscribe(res => {
      this.isSmallScreen.set(res.matches)
    })
  }

  ngOnDestroy(): void {
    this.rickandmortyapiService.reset();
  }
}
