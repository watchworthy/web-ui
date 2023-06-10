import type { People } from 'types/common';

import { api } from '.';

export interface PeopleQuery {
  total: number;
  size: number;
  page: number;
  data: People[];
}

export default async function fetchPeople(page: number, name?: string) {
  const { data } = await api.get<PeopleQuery>(
    `/person?size=24&page=${page}${name ? `&q=${name}` : ''}`
  );

  return data;
}
