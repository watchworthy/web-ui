import { api } from '.';

export interface AwardQuery {
  id: number;
  name: string;
  category: string;
  winner: boolean;
  year: number;
  description: string;
}

export default async function fetchAward(id: string) {
  const { data } = await api.get<AwardQuery>(`/award/${id}`);

  return data;
}
