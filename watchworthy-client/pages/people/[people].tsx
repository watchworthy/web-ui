import { PersonMovieCard } from '@watchworthy/ui';
import fetchMoviesByPerson from 'api/fetch-all-movies-by-person';
import fetchTvShowsByPerson from 'api/fetch-all-tvshows-by-person copy';
import fetchPerson from 'api/fetch-person';
import PeopleDetails from 'libs/watchworthy/src/lib/PeopleDetails/PeopleDetails';
import { PersonTvShowCard } from 'libs/watchworthy/src/lib/PersonTvShowCard';
import { useEffect, useState } from 'react';
import { Movie as MovieType, TvShow } from 'types/common';

export async function getServerSideProps(context) {
  // Fetch movie data for the specific id
  const res = await fetchPerson(context.params.people);
  const person = await res;

  return { props: { person } };
}

export const Movie = ({ person }) => {
  const [data, setData] = useState<MovieType[]>([]);
  const [loading, setLoading] = useState(true);
  const [showsLoading, setShowsLoading] = useState(true);
  const [shows, setShows] = useState<TvShow[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const movies = await fetchMoviesByPerson(0, '', person.id);
        setData(movies);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
    setLoading(false);

    const fetchShows = async () => {
      try {
        const shows = await fetchTvShowsByPerson(0, '', person.id);
        setShows(shows);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchShows();
    setShowsLoading(false);
  }, [person]);
  return (
    <>
      <PeopleDetails person={person} />
      <br />
      <PersonMovieCard
        type="movie"
        isLoading={loading}
        title="Movies"
        data={data}
      />
      <br />
      <PersonTvShowCard
        type="tvshows"
        isLoading={showsLoading}
        title="Tv Shows"
        data={shows}
      />
    </>
  );
};

export default Movie;
