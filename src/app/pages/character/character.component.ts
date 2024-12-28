import { Component, inject, Input } from '@angular/core';
import { RickandmortyapiService } from '../../services/rickandmortyapi.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-character',
  imports: [],
  templateUrl: './character.component.html',
  styleUrl: './character.component.scss',
})
export class CharacterComponent {
  rickandmortyapiService = inject(RickandmortyapiService);
  router = inject(Router);

  @Input()
  set id(id: string) {
    this.rickandmortyapiService.getCharacter(Number(id));
  }

  character() {
    return this.rickandmortyapiService.character();
  }

  backToSearch() {
    this.router.navigate(['character']);
  }
}
