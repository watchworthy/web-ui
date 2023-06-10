import { Card, Col, Divider } from 'antd';
import { useRouter } from 'next/router';
import { People } from 'types/common';

const { Meta } = Card;

interface ActorListProps {
  data: People[];
  isLoading: boolean;
  title: string;
  type: string;
}
export const ActorList = ({ data, title, type }: ActorListProps) => {
  const router = useRouter();

  if (!data) return <div>Loading...</div>;

  return (
    <div>
      <h1>{title}</h1>
      <Divider style={{ margin: '20px 0' }} />
      <div style={{ overflowX: 'auto', paddingBottom: '10px' }}>
        <div style={{ display: 'flex', gap: '15px' }}>
          {data.map((person) => (
            <Col key={person.id} xs={18} sm={8} md={4} lg={2}>
              <Card
                onClick={() => router.push(`/${type}/${person.id}`)}
                hoverable
                style={{ width: '100%', border: '#D9D9D9 solid 0.5px' }}
                cover={<img alt="example" src={person.posterPath} />}
              >
                <Meta
                  title={person.name}
                  // description={`Season ${episode.seasonNumber}`}
                />
              </Card>
            </Col>
          ))}
        </div>
      </div>
    </div>
  );
};
