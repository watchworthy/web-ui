import { Card, Col, Divider, Row } from 'antd';
import { MoviesQuery } from 'api/fetch-all-movies';
import { useRouter } from 'next/router';
const { Meta } = Card;

interface MovieListProps {
  data: MoviesQuery;
  isLoading: boolean;
}

export const MovieList = ({ data, isLoading }: MovieListProps) => {
  const router = useRouter();

  return (
    <>
      <Divider style={{ margin: '20px 0' }} />
      <Row gutter={16} style={{ display: 'flex', rowGap: '15px' }}>
        {data.data.map((movie) => (
          <Col key={movie.id} xs={24} sm={12} md={8} lg={4}>
            <Card
              onClick={() => router.push(`/movie/${movie.id}`)}
              hoverable
              style={{ width: '100%', border: '#D9D9D9 solid 0.5px' }}
              cover={<img alt="example" src={movie.posterPath} />}
            >
              <Meta title={movie.title} description="Adventure" />
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
};
