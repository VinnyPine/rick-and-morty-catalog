import {
  Component,
  inject,
  Input,
  numberAttribute,
  PLATFORM_ID,
} from '@angular/core';
import { RickandmortyapiService } from '../../services/rickandmortyapi.service';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-character',
  imports: [],
  templateUrl: './character.component.html',
  styleUrl: './character.component.scss',
})
export class CharacterComponent {
  rickandmortyapiService = inject(RickandmortyapiService);
  router = inject(Router);
  platformId = inject(PLATFORM_ID);

  @Input({ required: true, transform: numberAttribute })
  set id(id: number) {
    this.rickandmortyapiService.getCharacter(id);
  }

  character() {
    return this.rickandmortyapiService.character();
  }

  backToSearch() {
    this.router.navigate(['character']);
  }

  ngOnInit() {
    console.log('🌙 character init');
    if (isPlatformBrowser(this.platformId)) console.log('🌞 Browser');
  }
}
