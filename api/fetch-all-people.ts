import type { People } from 'types/common';

import { api } from '.';

export interface PeopleQuery {
  total: number;
  size: number;
  page: number;
  data: People[];
}

export default async function fetchPeople(page: number, title?: string) {
  const { data } = await api.get<PeopleQuery>(
    `/person?size=24&page=${page}${title ? `&q=${title}` : ''}`
  );

  return data;
}
