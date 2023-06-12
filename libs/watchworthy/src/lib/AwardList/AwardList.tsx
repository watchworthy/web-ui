import { Card, Col, Divider, Row } from 'antd';
import { AwardsQuery } from 'api/fetch-all-awards';
import { useRouter } from 'next/router';

const { Meta } = Card;

interface AwardListProps {
  data: AwardsQuery;
  isLoading: boolean;
}

export const AwardList = ({ data, isLoading }: AwardListProps) => {
  const router = useRouter();

  return (
    <>
      <Divider style={{ margin: '20px 0' }} />
      <Row gutter={16} style={{ display: 'flex', rowGap: '15px' }}>
        {data.data.map((award) => (
          <Col key={award.id} xs={24} sm={12} md={8} lg={4}>
            <Card
              onClick={() => router.push(`/award/${award.id}`)}
              hoverable
              style={{ width: '100%', border: '#D9D9D9 solid 0.5px' }}
              cover={<img alt="example" src={award.movie.posterPath} />}
            >
              <Meta title={award.name} description={award.category} />
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
};
