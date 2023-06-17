import { TvShow } from 'types/common';
import { api } from '.';



export default async function fetchRecommendedShows(id: number) {
  const { data } = await api.get<TvShow[]>(`/recommended/tv/${id}`);

  return data;
}
