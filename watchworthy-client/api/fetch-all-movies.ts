import type { Movie } from 'types/common';

import { api } from '.';

export interface MoviesQuery {
  total: number;
  size: number;
  page: number;
  data: Movie[];
}

export default async function fetchMovies(page: number, title?: string) {
  const { data } = await api.get<MoviesQuery>(
    `/movie/list?size=24&page=${page}${title ? `&q=${title}` : ''}`
  );

  return data;
}
