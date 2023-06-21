import {  Card, Col, Divider, Row, Spin } from 'antd';
import axios from 'axios';
import { useUser } from 'libs/watchworthy/src/lib/hooks';
import Image from 'next/image';
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

const Popular = () => {
  const router = useRouter();
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8081/movie/popular`
        );
        const data = response.data;
        setPopularMovies(data);
        setLoading(false); // Set loading to false when data is fetched
      } catch (error) {
        console.error('Error fetching watchlist:', error);
      }
    };

    fetchData();
  }, []);


  return (
    <>
      <h1>Popular Movies </h1>
      <Divider style={{ margin: '20px 0' }} />

      {loading ? (
        <Spin size="large" style={{ margin: '20px'}} /> // Render loading indicator while loading is true
      ) : (
        <Row gutter={16} style={{ display: 'flex', rowGap: '15px' }}>
          {popularMovies.map((movie) => (
            <Col key={movie.id} xs={24} sm={12} md={8} lg={4}>
              <Card
                onClick={() => router.push(`/movie/${movie.id}`)}
                hoverable
                style={{ width: '100%', border: '#D9D9D9 solid 0.5px' }}
                cover={<img alt="example" src={movie.posterPath} />}
              >
                <Card.Meta title={movie.title} description="Adventure" />
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

export default Popular;
