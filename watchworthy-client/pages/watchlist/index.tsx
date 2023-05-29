import { Card, Col, Divider, Row } from 'antd';
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
}

const WatchList = () => {
  const user = useUser();
  const router = useRouter();
  const [watchlist, setWatchlist] = useState<Movie[]>([]);

  const data = {
    userId: user.user?.id,
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8081/movie/getwatchlistbyuserid/${user.user?.id}`
        );
        const data = response.data;
        setWatchlist(data);
      } catch (error) {
        console.error('Error fetching watchlist:', error);
      }
    };

    fetchData();
  }, [user]);

  return (
    <>
      <h1>My WatchList</h1>
      <Divider style={{ margin: '20px 0' }} />
      <Row gutter={16} style={{ display: 'flex', rowGap: '15px' }}>
        {watchlist.map((movie) => (
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
    </>
  );
};

export default WatchList;
