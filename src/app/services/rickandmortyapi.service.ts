import { inject, Injectable, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { FetchService } from './fetch.service';
import {
  Character,
  endpoint,
  FilterCharacters,
  Response,
  State,
} from '../types/rickandmortyapi';
import { catchError, Observable, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class RickandmortyapiService {
  private fetch = inject(FetchService);
  private apiUrl = 'https://rickandmortyapi.com/api/';

  private charactersList = signal<Character[] | null>(null);
  private selectedCharacter = signal<Character | null>(null);
  private state = signal<State>({
    isLoading: false,
    hasNextPage: false,
    currentPage: 1,
  });

  constructor() {
    this.fetch.setUrl(this.apiUrl);
  }

  private trimFalsyValues(filter?: FilterCharacters) {
    if (!filter) return {};

    const filterMap = Object.entries(filter).filter(([_, value]) =>
      Boolean(value)
    );

    return Object.fromEntries(filterMap);
  }

  private startLoading() {
    this.state.update((state) => ({ ...state, isLoading: true }));
  }

  getAllCharacters(filter?: FilterCharacters) {
    this.startLoading();
    const fetch$ = this.fetch
      .params(this.trimFalsyValues(filter))
      .get<Response<Character>>(endpoint.CHARACTER)

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

    return fetch$
  }

  nextPageOfCharacters(page?: number) {
    const { lastFilter, currentPage, hasNextPage, isLoading } = this.state();
    if (!hasNextPage ||  isLoading) return;
    const newPage = page || currentPage + 1;

    this.startLoading();
    this.fetch
      .params({ page: newPage, ...this.trimFalsyValues(lastFilter) })
      .get<Response<Character>>(endpoint.CHARACTER)
      .subscribe((res) => {
        this.charactersList.update((value) => {
          if (!value) return res.results;
          return { ...value, ...res.results };
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
    const fest$ = this.fetch
      .get<Character>(endpoint.CHARACTER, String(id))

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

  getState() {
    return this.state();
  }

  reset() {
    this.charactersList.set(null);
    this.selectedCharacter.set(null);
  }
}
