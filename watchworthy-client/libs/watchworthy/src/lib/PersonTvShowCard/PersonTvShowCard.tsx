import { Card, Col, Divider } from 'antd';
import { useRouter } from 'next/router';
import { TvShow } from 'types/common';

const { Meta } = Card;

interface PersonTvShowCardProps {
  data: TvShow[];
  isLoading: boolean;
  title: string;
  type: string;
}
export const PersonTvShowCard = ({
  data,
  title,
  type,
}: PersonTvShowCardProps) => {
  const router = useRouter();

  if (!data) return <div>Loading...</div>;

  return (
    <div>
      <h1>{title}</h1>
      <Divider style={{ margin: '20px 0' }} />
      <div style={{ overflowX: 'auto' }}>
        <div style={{ display: 'flex', gap: '15px' }}>
          {data.map((tv) => (
            <Col key={tv.id} xs={24} sm={12} md={8} lg={4}>
              <Card
                onClick={() => router.push(`/${type}/${tv.id}`)}
                hoverable
                style={{ width: '100%', border: '#D9D9D9 solid 0.5px' }}
                cover={<img alt="example" src={tv.posterPath} />}
              >
                <Meta title={tv.title} description="Adventure" />
              </Card>
            </Col>
          ))}
        </div>
      </div>
    </div>
  );
};
