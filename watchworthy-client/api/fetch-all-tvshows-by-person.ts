import type { TvShow } from 'types/common';

import { api } from '.';

export interface TvShowQuery {
  total: number;
  size: number;
  page: number;
  data: TvShow[];
}

export default async function fetchTvShowsByPerson(
  page: number,
  title?: string,
  personId?: number
) {
  const { data } = await api.get<TvShow[]>(`/tv/list/${personId}`);

  return data;
}
