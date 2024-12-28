import { Component, inject, Input } from '@angular/core';
import { RickandmortyapiService } from '../../services/rickandmortyapi.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-episode',
  imports: [],
  templateUrl: './episode.component.html',
  styleUrl: './episode.component.scss'
})
export class EpisodeComponent {
  rickandmortyapiService = inject(RickandmortyapiService);
  router = inject(Router);

  @Input()
  set id(id: string) {
    this.rickandmortyapiService.getEpisode(Number(id));
  }

  episode() {
    return this.rickandmortyapiService.episode();
  }

  backToSearch() {
    this.router.navigate(['episode']);
  }
}
