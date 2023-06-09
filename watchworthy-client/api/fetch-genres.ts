import type { Genre } from 'types/common';

import { api } from '.';

export default async function fetchGenres() {
  const { data } = await api.get<Genre[]>(`/genre`);

  return data;
}
