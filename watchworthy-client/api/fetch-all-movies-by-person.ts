import type { Movie } from 'types/common';

import { api } from '.';

export interface TvShowQuery {
  total: number;
  size: number;
  page: number;
  data: Movie[];
}

export default async function fetchMoviesByPerson(
  page: number,
  title?: string,
  personId?: number
) {
  const { data } = await api.get<Movie[]>(`/movie/list/${personId}`);

  return data;
}
