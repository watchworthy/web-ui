import React, { useEffect, useState } from 'react';
import styles from './AwardCards.module.css';
import { Award, Movie } from 'types/common';
import fetchMovie from 'api/fetch-movie';


type AwardCardsProps = {
  awards: Award[];
};

const AwardCards: React.FC<AwardCardsProps> = ({ awards }) => {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const moviePromises = awards.map((award) => fetchMovie(award.movie?.id?.toString() ?? ''));
      const movieData = await Promise.all(moviePromises);
      const fetchedMovies = movieData.map((response) => response as Movie);
      setMovies(fetchedMovies);
    };

    fetchMovies();
  }, [awards]);

  return (
    <div>
      {awards.map((award, index) => {
        const movie = movies[index];

        return (
          <div key={award.id} className={styles['award-card']}>
            <h2>{award.name}</h2>
            <p>Category: {award.category}</p>
            <p>Winner: {award.winner ? 'Yes' : 'No'}</p>
            <p>Year: {award.year}</p>
            <p>Description: {award.description}</p>
            {movie && (
              <div>
                <h3>Movie Details</h3>
                <p>Title: {movie.title}</p>
                <p>Overview: {movie.overview}</p>
                <p>Release Date: {movie.releaseDate}</p>
                <p>Poster Path: {movie.posterPath}</p>
                {/* Add other movie details here */}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default AwardCards;
