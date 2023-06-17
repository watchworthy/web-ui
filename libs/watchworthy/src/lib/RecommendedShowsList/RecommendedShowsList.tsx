import { Card, Col, Divider } from 'antd';
import { useRouter } from 'next/router';
import {  TvShow } from 'types/common';

const { Meta } = Card;

interface RecommendedShowsList {
  data: TvShow[];
  isLoading: boolean;
  title: string;
  type: string;
}
export const RecommendedShowsList = ({
  data,
  title,
  type,
}: RecommendedShowsList) => {
  const router = useRouter();

  if (!data) return <div>Loading...</div>;

  return (
    <div>
      <h1>{title}</h1>
      <Divider style={{ margin: '20px 0' }} />
      <div style={{ overflowX: 'auto', paddingBottom: '10px' }}>
        <div style={{ display: 'flex', gap: '15px' }}>
          {data.map((show) => (
            <Col key={show.id} xs={18} sm={8} md={4} lg={2}>
              <Card
                onClick={() => router.push(`/${type}/${show.id}`)}
                hoverable
                style={{ width: '100%', border: '#D9D9D9 solid 0.5px' }}
                cover={<img alt="example" src={show.posterPath} />}
              >
                <Meta
                  title={show.title}
                  description={`${show.overview.substring(1,20)}`}
                />
              </Card>
            </Col>
          ))}
        </div>
      </div>
    </div>
  );
};
