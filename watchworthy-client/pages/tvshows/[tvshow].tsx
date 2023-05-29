import fetchTvShow from 'api/fetch-tvshow';
import TvShowDetails from 'libs/watchworthy/src/lib/TvShowDetails/TvShowDetails';
import { TvShow as TvShowType } from 'types/common';
interface TvShowProps {
  tvShow: TvShowType;
}

export async function getServerSideProps(context) {
  // Fetch tvShow data for the specific id
  const res = await fetchTvShow(context.params.tvshow);
  const tvShow = await res;

  return { props: { tvShow } };
}

export const TvShow = ({ tvShow }) => {
  // const [data, setData] = useState<MoviesQuery>({
  //   data: [],
  //   total: 0,
  //   size: 0,
  //   page: 0,
  // });
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const shows = await fetchMovies(0);
  //       setData(shows);
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   };

  //   fetchData();
  //   setLoading(false);
  // }, []);

  return (
    <>
      {/* <h1>TvShow details</h1>
      {tvShow.title} */}
      <TvShowDetails tvShow={tvShow} />
      <br />
      {/* <CastCard /> */}
      {/* <PersonMovieCard
        type="movie"
        isLoading={loading}
        title="Test"
        data={data}
      /> */}
    </>
  );
};

export default TvShow;
