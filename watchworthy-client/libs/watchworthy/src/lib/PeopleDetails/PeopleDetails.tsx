import { Col, Row } from 'antd';
import { Fragment } from 'react';
import { People } from 'types/common';

interface PeopleDetailsProps {
  person: People;
}
const PeopleDetails = ({ person }: PeopleDetailsProps) => {
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
          backgroundImage: `url('https://i.imgur.com/6HIbbBc.jpg')`,
        }}
      >
        <div className="movie__dark" />
        <Row>
          <Col span={4} offset={2} className="movie__poster">
            <div
              style={{ backgroundImage: `url('${person.posterPath}')` }}
            ></div>
            ;
          </Col>

          <Col span={10} className="movie__info">
            <>
              <Fragment>
                <div className="movie__info-header">
                  <h1>{person.name}</h1>
                </div>
                <div className="movie__info-content">
                  <h3>Biography</h3>
                  <br />
                  <p>{person.biography}</p>
                  <br />
                </div>
              </Fragment>
            </>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default PeopleDetails;
