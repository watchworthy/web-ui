import { Button, Card, Col, Divider, Row, message } from 'antd';
import axios from 'axios';
import { useUser } from 'libs/watchworthy/src/lib/hooks';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

interface Movie {
  id: number;
  title: string;
  overview: string;
  posterPath: string;
  releaseDate: string;
  watchlistId: number;
}

interface TvShow {
  id: number;
  title: string;
  overview: string;
  posterPath: string;
  releaseDate: string;
  watchlistId: number;
}




const WatchList = () => {
  const user = useUser();
  const router = useRouter();
  const [watchlist, setWatchlist] = useState<Movie[]>([]);
  const [tvShowWatchlist, setTvShowWatchlist] = useState<TvShow[]>([]);

  const data = {
    userId: user.user?.id,
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8081/movie/getwatchlistbyuserid/${user.user?.id}`
        );
        const data = response.data;
        setWatchlist(data);
      } catch (error) {
        console.error('Error fetching watchlist:', error);
      }
    };

    

    
    fetchData();
    
  }, [user.user]);


  useEffect(() => {
    

    const fetchTvShowWatchlist = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8081/tv/gettvshowswatchlistbyuserid/${user.user?.id}`
        );
        const data = response.data;
        setTvShowWatchlist(data);
      } catch (error) {
        console.error('Error fetching TV show watchlist:', error);
      }
    };

    
    
    fetchTvShowWatchlist();
  }, [user.user]);
  
  

  const removeMovieFromWatchlist = async (watchlistId: number) => {
    try {
      await axios.delete(
        `http://localhost:8081/movie/removemoviefromwatchlist/${watchlistId}`
      );
      message.warning('Movie removed from watchlist successfully!');

      console.log('Movie removed from watchlist successfully');
    } catch (error) {
      console.error('Error removing movie from watchlist', error);
    }
  };
  const removeTvShowFromWatchlist = async (watchlistId: number) => {
    try {
      await axios.delete(
        `http://localhost:8081/tv/removetvshowfromwatchlist/${watchlistId}`
      );
      message.warning('TV show removed from watchlist successfully!');
      console.log('TV show removed from watchlist successfully');
    } catch (error) {
      console.error('Error removing TV show from watchlist', error);
    }
  };
  

  return (
    <>
      <h1>My WatchList</h1>
      <Divider style={{ margin: '20px 0' }} />
      <Row gutter={16} style={{ display: 'flex', rowGap: '15px' }}>
        {watchlist.map((movie) => (
          <Col key={movie.id} xs={24} sm={12} md={8} lg={4}>
            <Card
              onClick={() => router.push(`/movie/${movie.id}`)}
              hoverable
              style={{ width: '100%', border: '#D9D9D9 solid 0.5px' }}
              cover={<img alt="example" src={movie.posterPath} />}
            >
              <Card.Meta title={movie.title} description="Adventure" />
            </Card>
            <Button
              danger
              onClick={() => removeMovieFromWatchlist(movie.watchlistId)}
            >
              Remove Movie From Watchlist
            </Button>
          </Col>
        ))}
      </Row>
      <h2>My TV Show Watchlist</h2>

<Row gutter={16} style={{ display: 'flex', rowGap: '15px' }}>
  {tvShowWatchlist.map((tvShow) => (
    <Col key={tvShow.id} xs={24} sm={12} md={8} lg={4}>
      <Card
        onClick={() => router.push(`/tvshow/${tvShow.id}`)}
        hoverable
        style={{ width: '100%', border: '#D9D9D9 solid 0.5px' }}
        cover={<img alt="example" src={tvShow.posterPath} />}
      >
        <Card.Meta title={tvShow.title} description="TV Show" />
      </Card>
      <Button
        danger
        onClick={() => removeTvShowFromWatchlist(tvShow.watchlistId)}
      >
        Remove TV Show From Watchlist
      </Button>
    </Col>
  ))}
</Row>
    </>
  );
};

export default WatchList;