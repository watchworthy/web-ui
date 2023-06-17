import { Button, Card, Col, Divider, Row, message } from 'antd';
import axios from 'axios';
import { useUser } from 'libs/watchworthy/src/lib/hooks';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

interface Movie {
  id: number;
  title: string;
  overview: string;
  posterPath: string;
  releaseDate: string;
  watchlistId: number;
}

const Upcoming = () => {
  const user = useUser();
  const router = useRouter();
  const [upComingMovies, setUpComingMovies] = useState<Movie[]>([]);

  const data = {
    userId: user.user?.id,
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8081/movie/upcoming`
        );
        const data = response.data;
        setUpComingMovies(data);
      } catch (error) {
        console.error('Error fetching watchlist:', error);
      }
    };

    fetchData();
  }, []);



  return (
    <>
      <h1>Upcoming Movies</h1>
      <Divider style={{ margin: '20px 0' }} />
      <Row gutter={16} style={{ display: 'flex', rowGap: '15px' }}>
        {upComingMovies.map((movie) => (
          <Col key={movie.id} xs={24} sm={12} md={8} lg={4}>
            <Card
              onClick={() => router.push(`/movie/${movie.id}`)}
              hoverable
              style={{ width: '100%', border: '#D9D9D9 solid 0.5px' }}
              cover={<img alt="example" src={movie.posterPath} />}
            >
              <div style={{ padding: '8px' }}>
                <h3 style={{ fontWeight: 'bold', marginBottom: '8px' }}>{movie.title}</h3>
                <p style={{ marginBottom: '4px', fontStyle: 'italic', color: '#999999' }}>Release Date: {movie.releaseDate}</p>
                <p style={{ fontSize: '18px', fontStyle: 'italic', color: 'red' }}>Upcoming</p>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Upcoming;
