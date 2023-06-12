import { api } from '.';
import { Award } from 'types/common';

export interface AwardsQuery {
  total: number;
  size: number;
  page: number;
  data: Award[];
}

export default async function fetchAwards(
  page: number,
  category?: string,
  winner?: boolean
): Promise<AwardsQuery> {
  const { data } = await api.get<AwardsQuery>(
    `/award/list?size=24&page=${page}${category ? `&category=${category}` : ''}${
      winner !== undefined ? `&winner=${winner}` : ''
    }`
  );

  return data;
}
