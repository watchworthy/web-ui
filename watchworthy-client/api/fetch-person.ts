import { api } from '.';

export interface PersonQuery {
  id: number;
  title: string;
  overview: string;
  releaseDate: string;
  posterPath: string;
}

export default async function fetchPerson(id: string) {
  const { data } = await api.get<PersonQuery>(`/person/${id}`);

  return data;
}
