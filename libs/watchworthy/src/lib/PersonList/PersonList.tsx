import { Card, Col, Divider, Row } from 'antd';
import { PeopleQuery } from 'api/fetch-all-people';
import { useRouter } from 'next/router';
const { Meta } = Card;

interface PersonListProps {
  data: PeopleQuery;
  isLoading: boolean;
}

export const PersonList = ({ data, isLoading }: PersonListProps) => {
  const router = useRouter();

  return (
    <>
      <Divider style={{ margin: '20px 0' }} />
      <Row gutter={16} style={{ display: 'flex', rowGap: '15px' }}>
        {data.data.map((person) => (
          <Col key={person.id} xs={24} sm={12} md={8} lg={4}>
            <Card
              onClick={() => router.push(`/people/${person.id}`)}
              hoverable
              style={{ width: '100%', border: '#D9D9D9 solid 0.5px' }}
              cover={<img alt="example" src={person.posterPath} />}
            >
              <Meta title={person.name} description="Actor" />
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
};
