import { useQuery } from '@tanstack/react-query';
import fetchTvShows from 'api/fetch-all-tvshows';

const FIVE_MINUTES_IN_MS = 5 * 60 * 1000;

export default function useTvShowsQuery(page: number, search: string, genre:string) {
  return useQuery(['tv', page, search,genre], () => fetchTvShows(page, search,genre), {
    staleTime: FIVE_MINUTES_IN_MS,
    keepPreviousData: true,
    retry: false,
  });
}
