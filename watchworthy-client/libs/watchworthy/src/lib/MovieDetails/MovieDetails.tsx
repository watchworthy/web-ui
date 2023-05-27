import { Button, Col, Row } from 'antd';
import axios from 'axios';
import moment from 'moment';
import { Fragment } from 'react';
import { Movie } from 'types/common';
import { useUser } from '../hooks';

interface MovieDetailsProps {
  movie: Movie;
}
const MovieDetails = ({ movie }: MovieDetailsProps) => {
  const user = useUser();

  const addToWatchList = (values: any) => {
    const data = {
      userId: user.user?.id,
      movieId: movie.id,
    };
    axios.post(
      `http://localhost:8081/movie/addtowatchlist/${user.user?.id}/${movie.id}`
    );
  };

  const genres = [
    {
      id: 1,
      name: 'Action',
    },
    {
      id: 2,
      name: 'Adventure',
    },
  ];
  return (
    <div>
      {/* <h1>Movie Detais</h1> */}
      <div
        className="movie"
        style={{
          backgroundImage: `url('${movie.posterPath}')`,
        }}
      >
        <div className="movie__dark" />
        <Row>
          <Col span={4} offset={2} className="movie__poster">
            <div
              style={{ backgroundImage: `url('${movie.posterPath}')` }}
            ></div>
            ;
          </Col>

          <Col span={10} className="movie__info">
            <>
              <Fragment>
                <div className="movie__info-header">
                  <h1>
                    {movie.title}
                    <span>
                      {moment(movie.releaseDate, 'YYYY-MM-DD').format('YYYY')}
                    </span>
                  </h1>
                </div>
                <div className="movie__info-content">
                  <h3>Overview</h3>
                  <p>{movie.overview}</p>
                  <br />
                  <h3>Genres</h3>
                  <ul>
                    {genres.map((genre) => (
                      <li key={genre.id}>{genre.name}</li>
                    ))}
                  </ul>
                </div>
              </Fragment>
            </>
          </Col>
          <Button onClick={addToWatchList}>AddToWatchList</Button>
        </Row>
      </div>
    </div>
  );
};

export default MovieDetails;
