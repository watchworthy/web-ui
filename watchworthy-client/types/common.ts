export interface Movie {
  id: number;
  title: string;
  overview: string;
  releaseDate: string;
  genres: Genre[];
  comments: Comment[];
  posterPath: string;
}

export interface Comment {
  id: number;
  text: string;
  firstName: string;
  lastName: string;
  dateTimeCreated: string;
}
export interface Genre {
  id: number;
  name: string;
}


export interface Event {
  id: number;
  name: string;
  date: string;
  posterPath: string;
}



export interface Info {
  total: number;
  size: number;
  page: number;
  data: Movie[];
}

export interface TvShow {
  id: number;
  title: string;
  overview: string;
  releaseDate: string;
  posterPath: string;
  genres: Genre[];
  comments: Comment[];
}

export interface TvShowInfo {
  total: number;
  size: number;
  page: number;
  data: TvShow[];
}

export interface People {
  id: number;
  name: string;
  gender: string;
  biography: string;
  posterPath: string;
}

export interface PeopleInfo {
  total: number;
  size: number;
  page: number;
  data: People[];
}

export interface Season {
  id: number;
  airDate: string;
  episodes: Episode[];
  name: string;
  overview: string;
  posterPath: string;
  seasonNumber: number;
}

export interface Episode {
  id: number;
  name: string;
  overview: string;
  releaseDate: string;
  posterPath: string;
  seasonNumber: number;
}
