import { api } from '.';

export interface MovieQuery {
  id: number;
  title: string;
  overview: string;
  releaseDate: string;
  posterPath: string;
}

export default async function fetchMovie(id: string) {
  const { data } = await api.get<MovieQuery>(`/movie/${id}`);

  return data;
}
