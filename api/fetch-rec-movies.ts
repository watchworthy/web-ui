import { Movie } from 'types/common';
import { api } from '.';



export default async function fetchRecommendedMovies(id: number) {
  const { data } = await api.get<Movie[]>(`/recommended/movies/${id}`);

  return data;
}
