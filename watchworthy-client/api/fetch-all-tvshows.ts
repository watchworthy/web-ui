import type { TvShow } from 'types/common';

import { api } from '.';

export interface TvShowsQuery {
  total: number;
  size: number;
  page: number;
  data: TvShow[];
}

export default async function fetchTvShows(page: number, title?: string) {
  const { data } = await api.get<TvShow>(
    `/tv?size=24&page=${page}${title ? `&q=${title}` : ''}`
  );

  return data;
}