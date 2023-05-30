import { Button, Col, Rate, Row, message } from 'antd';
import axios from 'axios';
import moment from 'moment';
import { Fragment, useEffect, useState } from 'react';
import { Movie } from 'types/common';
import { useUser } from '../hooks';

interface MovieDetailsProps {
  movie: Movie;
}
const MovieDetails = ({ movie }: MovieDetailsProps) => {
  const user = useUser();

  const addToWatchList = () => {
    const data = {
      userId: user.user?.id,
      movieId: movie.id,
    };

    axios
      .post(
        `http://localhost:8081/movie/addtowatchlist/${user.user?.id}/${movie.id}`
      )
      .then(() => {
        message.success('Movie added to watchlist successfully!');
      })
      .catch((error) => {
        message.error(
          'You have already added this movie to your watchlist',
          error
        );
      });
  };

  const [averageRating, setAverageRating] = useState(null);
  const [getYourRateNum, setYourRateNum] = useState(null);

  useEffect(() => {
    const fetchAverageRating = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8081/movierates/average-rating/${movie.id}`
        );
        setAverageRating(response.data);
      } catch (error) {
        console.error('Error fetching average rating:', error);
      }
    };

    fetchAverageRating();
  }, [movie]);

  useEffect(() => {
    const findYourRateNum = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8081/movierates/getuserratenum/${movie.id}/${user.user?.id}`
        );
        setYourRateNum(response.data);
      } catch (error) {
        console.error('Error fetching average rating:', error);
      }
    };

    findYourRateNum();
  }, [movie, user]);

  const [rateNum, setRateNum] = useState(0);

  const handleRateChange = (value: any) => {
    setRateNum(value);
  };

  const handleRateMovie = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8081/movierates/ratemovie/${movie.id}/${user.user?.id}?rateNum=${rateNum}`
      );

      const userRating = response.data;
      setRateNum(userRating);
      message.success('Movie rated successfully!');
      window.location.reload();
    } catch (error) {
      console.error('Error rating movie:', error);
    }
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
                    {movie.genres.map((genre) => (
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
      <div className="movie__info-content">
        <span>Average Rating:</span>
        {averageRating !== null ? (
          <Rate disabled allowHalf defaultValue={averageRating} />
        ) : (
          <span>No rating available</span>
        )}

        <span>Your Rate:</span>
        {getYourRateNum !== null ? (
          <Rate disabled allowHalf defaultValue={getYourRateNum} />
        ) : (
          <span>No rating available</span>
        )}
      </div>
      <div>
        <Rate allowHalf value={rateNum} onChange={handleRateChange} />
        <br />
        <Button onClick={handleRateMovie}>Rate This Movie</Button>
      </div>
    </div>
  );
};

export default MovieDetails;
