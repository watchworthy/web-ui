import { ActorList, CastCard } from '@watchworthy/ui';
import fetchMovie from 'api/fetch-movie';
import MovieDetails from 'libs/watchworthy/src/lib/MovieDetails/MovieDetails';
import { Movie as MovieType } from 'types/common';
interface MovieProps {
  movie: MovieType;
}

export async function getServerSideProps(context) {
  // Fetch movie data for the specific id
  const res = await fetchMovie(context.params.movie);
  const movie = await res;

  return { props: { movie } };
}

export const Movie = ({ movie }) => {
  return (
    <>
      {/* <h1>Movie details</h1>
      {movie.title} */}
      <MovieDetails movie={movie} />
      <br />
      <ActorList
        type="people"
        isLoading={movie == null}
        title="Cast"
        data={movie.people}
      />
    </>
  );
};

export default Movie;
