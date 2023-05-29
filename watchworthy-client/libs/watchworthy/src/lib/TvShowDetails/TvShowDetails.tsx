import { Col, Row } from 'antd';
import moment from 'moment';
import { Fragment } from 'react';
import { TvShow } from 'types/common';

interface TvShowDetailsProps {
  tvShow: TvShow;
}
const TvShowDetails = ({ tvShow }: TvShowDetailsProps) => {
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
          backgroundImage: `url('${tvShow.posterPath}')`,
        }}
      >
        <div className="movie__dark" />
        <Row>
          <Col span={4} offset={2} className="movie__poster">
            <div
              style={{ backgroundImage: `url('${tvShow.posterPath}')` }}
            ></div>
            ;
          </Col>

          <Col span={10} className="movie__info">
            <>
              <Fragment>
                <div className="movie__info-header">
                  <h1>
                    {tvShow.title}
                    <span>
                      {moment(tvShow.releaseDate, 'YYYY-MM-DD').format('YYYY')}
                    </span>
                  </h1>
                </div>
                <div className="movie__info-content">
                  <h3>Overview</h3>
                  <p>{tvShow.overview}</p>
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
        </Row>
      </div>
    </div>
  );
};

export default TvShowDetails;
