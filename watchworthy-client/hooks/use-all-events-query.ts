import { useQuery } from '@tanstack/react-query';

import fetchEvents from 'api/fetch-all-events';

const FIVE_MINUTES_IN_MS = 5 * 60 * 1000;

export default function useEventsQuery(page: number, name: string) {
  return useQuery(['events', page, name], () => fetchEvents(page, name), {
    staleTime: FIVE_MINUTES_IN_MS,
    keepPreviousData: true,
    retry: false,
  });
}
