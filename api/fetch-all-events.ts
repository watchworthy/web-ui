import type { Event } from 'types/common';

import { api } from '.';

export interface EventsQuery {
  total: number;
  size: number;
  page: number;
  data: Event[];
}

export default async function fetchEvents(page: number, name?: string) {
  const { data } = await api.get<EventsQuery>(
    `/event/list?size=24&page=${page}${name ? `&q=${name}` : ''}`
  );

  return data;
}
