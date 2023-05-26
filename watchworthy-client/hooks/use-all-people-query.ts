import { useQuery } from '@tanstack/react-query';
import fetchPeople from 'api/fetch-all-people';

const FIVE_MINUTES_IN_MS = 5 * 60 * 1000;

export default function usePeopleQuery(page: number, search: string) {
  return useQuery(['people', page, search], () => fetchPeople(page, search), {
    staleTime: FIVE_MINUTES_IN_MS,
    keepPreviousData: true,
    retry: false,
  });
}
