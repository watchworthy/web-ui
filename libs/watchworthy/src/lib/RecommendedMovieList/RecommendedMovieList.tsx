import { Card, Col, Divider } from 'antd';
import { useRouter } from 'next/router';
import {  Movie } from 'types/common';

const { Meta } = Card;

interface RecommendedMovieList {
  data: Movie[];
  isLoading: boolean;
  title: string;
  type: string;
}
export const RecommendedMovieList = ({
  data,
  title,
  type,
}: RecommendedMovieList) => {
  const router = useRouter();

  if (!data) return <div>Loading...</div>;

  return (
    <div>
      <h1>{title}</h1>
      <Divider style={{ margin: '20px 0' }} />
      <div style={{ overflowX: 'auto', paddingBottom: '10px' }}>
        <div style={{ display: 'flex', gap: '15px' }}>
          {data.map((movie) => (
            <Col key={movie.id} xs={18} sm={8} md={4} lg={2}>
              <Card
                onClick={() => router.push(`/${type}/${movie.id}`)}
                hoverable
                style={{ width: '100%', border: '#D9D9D9 solid 0.5px' }}
                cover={<img alt="example" src={movie.posterPath} />}
              >
                <Meta
                  title={movie.title}
                  description={`${movie.overview.substring(1,20)}`}
                />
              </Card>
            </Col>
          ))}
        </div>
      </div>
    </div>
  );
};
