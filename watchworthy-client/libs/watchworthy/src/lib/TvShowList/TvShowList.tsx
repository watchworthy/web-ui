import { Card, Col, Divider, Row } from 'antd';
import { TvShowsQuery } from 'api/fetch-all-tvshows';
import { useRouter } from 'next/router';
const { Meta } = Card;

interface TvShowListProps {
  data: TvShowsQuery;
  isLoading: boolean;
}

export const TvShowList = ({ data, isLoading }: TvShowListProps) => {
  const router = useRouter();

  return (
    <>
      <Divider style={{ margin: '20px 0' }} />
      <Row gutter={16} style={{ display: 'flex', rowGap: '15px' }}>
        {data.data.map((tvshow) => (
          <Col key={tvshow.id} xs={24} sm={12} md={8} lg={4}>
            <Card
              onClick={() => router.push(`/tvshow/${tvshow.id}`)}
              hoverable
              style={{ width: '100%', border: '#D9D9D9 solid 0.5px' }}
              cover={<img alt="example" src={tvshow.posterPath} />}
            >
              <Meta title={tvshow.title} description="Adventure" />
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
};
