import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { RickandmortyapiService } from '../../services/rickandmortyapi.service';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Router } from '@angular/router';

@Component({
  selector: 'app-characters-list',
  imports: [ScrollingModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './characters-list.component.html',
  styleUrl: './characters-list.component.scss',
})
export class CharactersListComponent implements OnInit {
  private rickandmortyapiService = inject(RickandmortyapiService);
  private router = inject(Router);

  breakpointObserver = inject(BreakpointObserver);
  isSmallScreen = signal(false);

  requestData() {
    this.rickandmortyapiService.getAllCharacters();
  }

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

  scrolling(index: number) {
    const list = this.list();
    if (list !== null && index >= list.length - 10) {
      this.rickandmortyapiService.nextPageOfCharacters();
    }
  }

  ngOnInit(): void {
    this.requestData();

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
