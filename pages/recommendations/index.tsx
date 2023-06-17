import React, { useEffect, useState } from 'react';
import { RecommendedMovieList, useUser } from '@watchworthy/ui';
import fetchRecommendedMovies from 'api/fetch-rec-movies';
import { Genre, Movie, TvShow } from 'types/common';
import { RecommendedShowsList } from 'libs/watchworthy/src/lib/RecommendedShowsList';
import fetchRecommendedShows from 'api/fetch-rec-shows';
import { Button, Modal, Result, Select } from 'antd';
import fetchGenres from 'api/fetch-genres';
import axios from 'axios';
import { useRouter } from 'next/router';

interface RecommendationsProps {
  movies: Movie[];
}

const Recommendations: React.FC<RecommendationsProps> = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [shows, setShows] = useState<TvShow[]>([]);
  const [showsLoading, setShowsLoading] = useState(true);
  const [moviesLoading, setMoviesLoading] = useState(true);
  const user = useUser();
  const [genres, setGenres] = useState<Genre[]>([]);
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState('Content of the modal');
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
  const router = useRouter();
  const showModal = () => {
    setOpen(true);
  };

  const handleOk = async () => {
    setModalText('The modal will be closed after two seconds');
    setConfirmLoading(true);
  
    const requestBody = {
      preferredGenres: selectedGenres.map(genreId =>
        genres.find(genre => genre.id === genreId)?.name
      ),
    };
  
    try {
      await axios.post(`http://localhost:8081/user/${user.user?.id}/preferredGenres`, requestBody);
      console.log('Successfully updated preferred genres');
      await fetchMovies();
      await fetchGenresData();
    } catch (error) {
      console.error('Error updating preferred genres:', error);
    } finally {
      setTimeout(() => {
        setOpen(false);
        setConfirmLoading(false);
      }, 2000);
    }
  };

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setOpen(false);
  };

  const fetchMovies = async () => {
    if (user?.user?.id) {
      try {
        const moviesData = await fetchRecommendedMovies(user.user.id);
        setMovies(moviesData);
        setMoviesLoading(false);
      } catch (error) {
        console.error('Error fetching recommended movies:', error);
      }
    }
  };

  const fetchShows = async () => {
    if (user?.user?.id) {
      try {
        const showsData = await fetchRecommendedShows(user.user.id);
        setShows(showsData);
        setShowsLoading(false);
      } catch (error) {
        console.error('Error fetching recommended shows:', error);
      }
    }
  };

  const fetchGenresData = async () => {
    try {
      const genresData = await fetchGenres();
      setGenres(genresData);
    } catch (error) {
      console.error('Error fetching genres:', error);
    }
  };

  useEffect(() => {
    fetchGenresData();
    if (user.user?.preferences) {
      fetchMovies();
      fetchShows();
    }

    if (user.user && user.user?.preferences?.length === 0 && movies.length === 0) {
      showModal();
    }
  }, [user.user, movies.length]);

  return (
    <>
      {!user.user ? (
        <Result
          status="error"
          title="You need to login to see recommendations"
          subTitle="If you do not have an account, please register to continue."
          extra={[
            <Button
              onClick={() => router.push('/register')}
              type="primary"
              key="register"
            >
              Register
            </Button>,
            <Button onClick={() => router.push('/login')} key="login">
              Login
            </Button>,
          ]}
        />
      ) : (
        <>
          <h1>Recommendations</h1>
      <br />
      {movies.length == 0 &&
      <Modal
        title="Add Preferred Genres"
        visible={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <p>{modalText}</p>
        <Select
          mode="multiple"
          placeholder="Select genres"
          value={selectedGenres}
          onChange={setSelectedGenres}
          style={{ width: '100%' }}
        >
          {genres.map(genre => (
            <Select.Option key={genre.id} value={genre.id}>
              {genre.name}
            </Select.Option>
          ))}
        </Select>
      </Modal>
      }
      <RecommendedMovieList type="movie" isLoading={moviesLoading} title="Movies" data={movies} />
      <RecommendedShowsList type="tvshows" isLoading={showsLoading} title="Tv Shows" data={shows} />
        </>
      )}
    </>
  );
};

export default Recommendations;
