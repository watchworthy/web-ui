import { Card, Col, Divider } from 'antd';
import { useRouter } from 'next/router';
import { Season } from 'types/common';

const { Meta } = Card;

interface TvShowSeasonListProps {
  data: Season[];
  isLoading: boolean;
  title: string;
  type: string;
}
export const TvShowSeasonList = ({
  data,
  title,
  type,
}: TvShowSeasonListProps) => {
  const router = useRouter();

  if (!data) return <div>Loading...</div>;

  return (
    <div>
      <h1>{title}</h1>
      <Divider style={{ margin: '20px 0' }} />
      <div style={{ overflowX: 'auto', paddingBottom: '10px' }}>
        <div style={{ display: 'flex', gap: '15px' }}>
          {data.map((season) => (
            <Col key={season.id} xs={18} sm={8} md={4} lg={2}>
              <Card
                // onClick={() => router.push(`/${type}/${season.id}`)}
                hoverable
                style={{ width: '100%', border: '#D9D9D9 solid 0.5px' }}
                cover={<img alt="example" src={season.posterPath} />}
              >
                <Meta title={season.name} description="Adventure" />
              </Card>
            </Col>
          ))}
        </div>
      </div>
    </div>
  );
};
