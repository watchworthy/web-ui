import { Card, Col, Divider } from 'antd';
import { Episode } from 'types/common';

const { Meta } = Card;

interface TvShowEpisodeListProps {
  data: Episode[];
  isLoading: boolean;
  title: string;
  type: string;
}
export const TvShowEpisodeList = ({
  data,
  title,
  type,
}: TvShowEpisodeListProps) => {
  if (!data) return <div>Loading...</div>;

  return (
    <div>
      <h1>{title}</h1>
      <Divider style={{ margin: '20px 0' }} />
      <div style={{ overflowX: 'auto', paddingBottom: '10px' }}>
        <div style={{ display: 'flex', gap: '15px' }}>
          {data.map((episode) => (
            <Col key={episode.id} xs={18} sm={8} md={4} lg={2}>
              <Card
                // onClick={() => router.push(`/${type}/${episode.id}`)}
                hoverable
                style={{ width: '100%', border: '#D9D9D9 solid 0.5px' }}
                cover={<img alt="example" src={episode.posterPath} />}
              >
                <Meta
                  title={episode.name}
                  description={`Season ${episode.seasonNumber}`}
                />
              </Card>
            </Col>
          ))}
        </div>
      </div>
    </div>
  );
};
