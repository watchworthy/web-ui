import { Card, Col, Divider } from 'antd';
import { useRouter } from 'next/router';
import { Movie } from 'types/common';

const { Meta } = Card;

interface PersonMovieCardProps {
  data: Movie[];
  isLoading: boolean;
  title: string;
  type: string;
}
export const PersonMovieCard = ({
  data,
  title,
  type,
}: PersonMovieCardProps) => {
  const router = useRouter();

  if (!data) return <div>Loading...</div>;

  return (
    <div>
      <h1>{title}</h1>
      <Divider style={{ margin: '20px 0' }} />
      <div style={{ overflowX: 'auto' }}>
        <div style={{ display: 'flex', gap: '15px' }}>
          {data.map((movie) => (
            <Col key={movie.id} xs={24} sm={12} md={8} lg={4}>
              <Card
                onClick={() => router.push(`/${type}/${movie.id}`)}
                hoverable
                style={{ width: '100%', border: '#D9D9D9 solid 0.5px' }}
                cover={<img alt="example" src={movie.posterPath} />}
              >
                <Meta title={movie.title} description="Adventure" />
              </Card>
            </Col>
          ))}
        </div>
      </div>
    </div>
  );
};