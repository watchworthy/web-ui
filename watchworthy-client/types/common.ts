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
