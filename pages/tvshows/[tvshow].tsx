import { ActorList } from '@watchworthy/ui';
import fetchTvShow from 'api/fetch-tvshow';
import TvShowDetails from 'libs/watchworthy/src/lib/TvShowDetails/TvShowDetails';
import { TvShowEpisodeList } from 'libs/watchworthy/src/lib/TvShowEpisodeList';
import { TvShowSeasonList } from 'libs/watchworthy/src/lib/TvShowSeasonList';
import { useEffect, useState } from 'react';
import { Episode, People, Season, TvShow as TvShowType } from 'types/common';
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
  const [seasonsLoading, setSeasonsLoading] = useState(true);
  const [seasons, setSeasons] = useState<Season[]>([]);
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  useEffect(() => {
    const fetchShows = async () => {
      try {
        setSeasons(tvShow.seasons);
        const episodes: any[] = [];

        tvShow.seasons.forEach((season) => {
          season.episodes.forEach((episode) => {
            episodes.push(episode);
          });
        });

        setEpisodes(episodes);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchShows();
    setSeasonsLoading(false);
  }, [tvShow]);

  return (
    <>
      {/* <h1>TvShow details</h1>
      {tvShow.title} */}
      <TvShowDetails tvShow={tvShow} />
      <br />
      <ActorList
        type="people"
        isLoading={tvShow == null}
        title="Cast"
        data={tvShow.people}
      />
      <TvShowSeasonList
        type="season"
        isLoading={seasonsLoading}
        title="Seasons"
        data={seasons}
      />
      <TvShowEpisodeList
        type="episode"
        isLoading={seasonsLoading}
        title="Episodes"
        data={episodes}
      />
    </>
  );
};

export default TvShow;
