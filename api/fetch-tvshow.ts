import { Season } from 'types/common';
import { api } from '.';

export interface TvShowQuery {
  id: number;
  title: string;
  overview: string;
  releaseDate: string;
  posterPath: string;
  seasons: Season[];
}

export default async function fetchTvShow(id: string) {
  const { data } = await api.get<TvShowQuery>(`/tv/${id}`);

  return data;
}
