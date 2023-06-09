import { api } from '.';

export interface EventQuery {
  id: number;
  name: string;
  date: string;
  posterPath: string;
}

export default async function fetchEvent(id: string) {
  const { data } = await api.get<EventQuery>(`/event/${id}`);

  return data;
}
