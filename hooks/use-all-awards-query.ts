import { useQuery } from '@tanstack/react-query';
import fetchAwards from 'api/fetch-all-awards';

const FIVE_MINUTES_IN_MS = 5 * 60 * 1000;

export default function useAwardsQuery(page: number, category: string, winner: boolean) {
  return useQuery(
    ['awards', page, category, winner],
    () => fetchAwards(page, category, winner),
    {
      staleTime: FIVE_MINUTES_IN_MS,
      keepPreviousData: true,
      retry: false,
    }
  );
}
