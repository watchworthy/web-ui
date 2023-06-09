import { api } from '.';

export interface PersonQuery {
  id: number;
  name: string;
  gender: string;
  biography: string;
  posterPath: string;
}

export default async function fetchPerson(id: string) {
  const { data } = await api.get<PersonQuery>(`/person/${id}`);

  return data;
}
