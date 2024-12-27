export interface Info {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
}

export interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
}

export interface Episode {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
  url: string;
  created: string;
}

export interface Response<T> {
  info: Info;
  results: T[];
}

export enum endpoint {
  CHARACTER = 'character',
  EPISODE = 'episode',
}

export type Status = 'alive' | 'dead' | 'unknown';

export type Gender = 'female' | 'male' | 'genderless' | 'unknown';

export interface FilterCharacters {
  name?: string | null;
  status?: Status | null;
  species?: string | null;
  type?: string | null;
  gender?: Gender | null;
}

export interface FilterEpisodes {
  name?: string;
  episode?: string;
}

export interface State {
  isLoading: boolean;
  hasNextPage: boolean;
  currentPage: number;
  lastFilter?: FilterCharacters | FilterEpisodes;
}
