export interface Movie {
  id: number;
  title: string;
  overview: string;
  releaseDate: string;
  posterPath: string;
}

export interface Info {
  total: number;
  size: number;
  page: number;
  data: Movie[];
}
