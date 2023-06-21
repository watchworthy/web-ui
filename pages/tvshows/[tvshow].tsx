import { ActorList } from '@watchworthy/ui';
import fetchTvShow from 'api/fetch-tvshow';
import axios from 'axios';
import TvShowDetails from 'libs/watchworthy/src/lib/TvShowDetails/TvShowDetails';
import { TvShowEpisodeList } from 'libs/watchworthy/src/lib/TvShowEpisodeList';
import { TvShowSeasonList } from 'libs/watchworthy/src/lib/TvShowSeasonList';
import { GetServerSidePropsContext } from 'next';
import { useEffect, useState } from 'react';
import { Episode, People, Season, TvShowPeople, TvShow as TvShowType } from 'types/common';
interface TvShowProps {
  tvShow: TvShowType;
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  if (!context.params || typeof context.params.tvshow !== 'string') {
    return {
      notFound: true,
    };
  }
  const res = await fetchTvShow(context.params.tvshow);
  const tvShow = await res;

  return { props: { tvShow } };
}

export const TvShow = ({ tvShow }:TvShowProps) => {
  const [seasonsLoading, setSeasonsLoading] = useState(true);
  const [seasons, setSeasons] = useState<Season[]>([]);
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [people, setPeople] = useState<TvShowPeople[]>([]);
  useEffect(() => {
    const fetchShows = async () => {
      try {
       let seasons = await axios.get<Season[]>(`http://localhost:8081/tv/season/${tvShow.id}`);
        setSeasons(seasons.data);
        const episodes: any[] = [];

        seasons.data.forEach((season) => {
          if(season.episodes){
            season.episodes.forEach((episode) => {
              episodes.push(episode);
            });
          }
        });

        setEpisodes(episodes);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchShows();
    setSeasonsLoading(false);
  }, [tvShow,seasons == null]);

  useEffect(()=>{
    const fetchPeople = async () => {
      let people = await axios.get(`http://localhost:8081/tv/${tvShow.id}/people`);
      setPeople(people.data);
    }
    fetchPeople();
  },[people == null])

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
        data={people}
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
