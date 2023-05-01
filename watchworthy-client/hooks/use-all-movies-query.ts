import { useQuery } from '@tanstack/react-query';

import fetchMovies from 'api/fetch-all-movies';

const FIVE_MINUTES_IN_MS = 5 * 60 * 1000;

export default function useMoviesQuery(page: number, search: string) {
  return useQuery(['movies', page, search], () => fetchMovies(page, search), {
    staleTime: FIVE_MINUTES_IN_MS,
    keepPreviousData: true,
    retry: false,
  });
}
