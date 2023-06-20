import { Card, Col, Divider, Row } from 'antd';
import { TvShowsQuery } from 'api/fetch-all-tvshows';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
const { Meta } = Card;

interface TvShowListProps {
  data: TvShowsQuery;
  isLoading: boolean;
}

export const TvShowList = ({ data, isLoading }: TvShowListProps) => {
  const router = useRouter();
  const [genres, setGenres] = useState<{ name: string }[]>([]);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await axios.get('http://localhost:8081/genre');
        setGenres(response.data);
      } catch (error) {
        console.error('Failed to fetch genres:', error);
      }
    };

    fetchGenres();
  }, []);

  const renderGenres = (genres: { name: string }[]) => {
    if (genres.length > 2) {
      const displayedGenres = genres.slice(0, 2).map((genre) => genre.name);
      return (
        <>
          {displayedGenres.join(', ')}
          {genres.length > 2 && <span style={{ marginLeft: '4px' }}>...</span>}
        </>
      );
    } else {
      return genres.map((genre) => genre.name).join(', ');
    }
  };
  return (
    <>
      <Divider style={{ margin: '20px 0' }} />
      <Row gutter={16} style={{ display: 'flex', rowGap: '15px' }}>
        {data.data.map((tvshow) => (
          <Col key={tvshow.id} xs={24} sm={12} md={8} lg={4}>
            <Card
              onClick={() => router.push(`/tvshows/${tvshow.id}`)}
              hoverable
              style={{ width: '100%', border: '#D9D9D9 solid 0.5px' }}
              cover={<img alt="example" src={tvshow.posterPath} />}
            >
              <Meta
                title={tvshow.title}
                description={
                  genres.length > 0
                    ? renderGenres(genres)
                    : 'Action'
                }
              />
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
};
