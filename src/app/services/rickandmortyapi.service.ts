import { inject, Injectable, signal } from '@angular/core';
import { FetchService } from './fetch.service';
import {
  Character,
  endpoint,
  Episode,
  FilterCharacters,
  FilterEpisodes,
  Response,
  State,
} from '../types/rickandmortyapi';

@Injectable({
  providedIn: 'root',
})
export class RickandmortyapiService {
  private fetch = inject(FetchService);
  private apiUrl = 'https://rickandmortyapi.com/api';

  private state = signal<State>({
    isLoading: false,
    hasNextPage: false,
    currentPage: 1,
  });

  private charactersList = signal<Character[] | null>(null);
  private selectedCharacter = signal<Character | null>(null);

  private episodesList = signal<Episode[] | null>(null);
  private selectedEpisode = signal<Episode | null>(null);

  constructor() {
    this.fetch.setUrl(this.apiUrl);
  }

  getState() {
    return this.state();
  }

  private startLoading() {
    this.state.update((state) => ({ ...state, isLoading: true }));
  }

  reset() {
    this.charactersList.set(null);
    this.selectedCharacter.set(null);
    this.episodesList.set(null);
    this.selectedEpisode.set(null);
  }

  private trimFalsyValues(filter?: FilterCharacters | FilterEpisodes) {
    if (!filter) return {};

    const filterMap = Object.entries(filter).filter(([_, value]) =>
      Boolean(value)
    );

    return Object.fromEntries(filterMap);
  }

  getAllCharacters(filter?: FilterCharacters) {
    this.startLoading();
    const fetch$ = this.fetch
      .params(this.trimFalsyValues(filter))
      .get<Response<Character>>(endpoint.CHARACTER);

    fetch$.subscribe({
      next: (res) => {
        this.charactersList.set(res.results);
        this.state.set({
          isLoading: false,
          hasNextPage: Boolean(res.info.next),
          currentPage: 1,
          lastFilter: filter,
        });
      },
      error: (err) => {
        this.charactersList.set(null);
        this.state.set({
          isLoading: false,
          hasNextPage: false,
          currentPage: 1,
        });
      },
    });

    return fetch$;
  }

  nextPageOfCharacters(page?: number) {
    const { lastFilter, currentPage, hasNextPage, isLoading } = this.state();
    if (!hasNextPage || isLoading) return;
    const newPage = page || currentPage + 1;

    this.startLoading();
    this.fetch
      .params({ page: newPage, ...this.trimFalsyValues(lastFilter) })
      .get<Response<Character>>(endpoint.CHARACTER)
      .subscribe((res) => {
        this.charactersList.update((value) => {
          if (!value) return res.results;
          return value.concat(res.results);
        });
        this.state.update((state) => ({
          ...state,
          isLoading: false,
          hasNextPage: Boolean(res.info.next),
          currentPage: newPage,
        }));
      });
  }

  getCharacter(id: number) {
    const fest$ = this.fetch.get<Character>(endpoint.CHARACTER, String(id));

    fest$.subscribe((res) => {
      this.selectedCharacter.set(res);
    });

    return fest$;
  }

  listCharacters() {
    return this.charactersList();
  }

  character() {
    return this.selectedCharacter();
  }

  getAllEpisodes(filter?: FilterEpisodes) {
    this.startLoading();
    const fetch$ = this.fetch
      .params(this.trimFalsyValues(filter))
      .get<Response<Episode>>(endpoint.EPISODE);

    fetch$.subscribe({
      next: (res) => {
        this.episodesList.set(res.results);
        this.state.set({
          isLoading: false,
          hasNextPage: Boolean(res.info.next),
          currentPage: 1,
          lastFilter: filter,
        });
      },
      error: (err) => {
        this.episodesList.set(null);
        this.state.set({
          isLoading: false,
          hasNextPage: false,
          currentPage: 1,
        });
      },
    });

    return fetch$;
  }

  nextPageOfEpisodes(page?: number) {
    const { lastFilter, currentPage, hasNextPage, isLoading } = this.state();
    if (!hasNextPage || isLoading) return;
    const newPage = page || currentPage + 1;

    this.startLoading();
    this.fetch
      .params({ page: newPage, ...this.trimFalsyValues(lastFilter) })
      .get<Response<Episode>>(endpoint.EPISODE)
      .subscribe((res) => {
        this.episodesList.update((value) => {
          if (!value) return res.results;
          return value.concat(res.results);
        });
        this.state.update((state) => ({
          ...state,
          isLoading: false,
          hasNextPage: Boolean(res.info.next),
          currentPage: newPage,
        }));
      });
  }

  getEpisode(id: number) {
    const fest$ = this.fetch.get<Episode>(endpoint.EPISODE, String(id));

    fest$.subscribe((res) => {
      this.selectedEpisode.set(res);
    });

    return fest$;
  }

  listEpisodes() {
    return this.episodesList();
  }

  episode() {
    return this.selectedEpisode();
  }
}
