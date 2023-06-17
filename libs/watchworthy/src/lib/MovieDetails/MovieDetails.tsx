import {
  DislikeOutlined,
  LikeOutlined,
} from '@ant-design/icons';
import { Button, Col, Input, List, Rate, Row, Typography, message } from 'antd';
import axios from 'axios';
import moment from 'moment';
import { Fragment, useEffect, useState } from 'react';
import { Movie } from 'types/common';
import { useUser } from '../hooks';
import { DeleteOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import { Trailer } from '../Trailer';

const { Text } = Typography;

interface MovieDetailsProps {
  movie: Movie;
}
const MovieDetails = ({ movie }: MovieDetailsProps) => {
  const user = useUser();
  const router = useRouter();
  const addToWatchList = () => {
    const data = {
      userId: user.user?.id,
      movieId: movie.id,
    };

    axios
      .post(
        `http://localhost:8081/movie/addtowatchlist/${user.user?.id}/${movie.id}`
      )
      .then(() => {
        message.success('Movie added to watchlist successfully!');
      })
      .catch((error) => {
        message.error(
          'You have already added this movie to your watchlist',
          error
        );
      });
  };

  const [averageRating, setAverageRating] = useState(null);
  const [getYourRateNum, setYourRateNum] = useState(null);

  useEffect(() => {
    const fetchAverageRating = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8081/movierates/average-rating/${movie.id}`
        );
        setAverageRating(response.data);
      } catch (error) {
        console.error('Error fetching average rating:', error);
      }
    };

    fetchAverageRating();
  }, [movie]);

  useEffect(() => {
    const findYourRateNum = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8081/movierates/getuserratenum/${movie.id}/${user.user?.id}`
        );
        setYourRateNum(response.data);
      } catch (error) {
        console.error('Error fetching average rating:', error);
      }
    };

    findYourRateNum();
  }, [movie, user.user]);

  const [rateNum, setRateNum] = useState(0);

  const handleRateChange = (value: any) => {
    setRateNum(value);
  };

  const handleRateMovie = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8081/movierates/ratemovie/${movie.id}/${user.user?.id}?rateNum=${rateNum}`
      );

      const userRating = response.data;
      setRateNum(userRating);
      message.success('Movie rated successfully!');
      router.replace(router.asPath);
    } catch (error) {
      console.error('Error rating movie:', error);
    }
  };

  
  const [commentText, setCommentText] = useState('');

  const handleCommentTextChange = (e: any) => {
    setCommentText(e.target.value);
  };

  const addCommentToMovie = async () => {
    try {
      const data = {
        text: commentText,
      };
      const response = await axios.post(
        `http://localhost:8081/movie/addcommenttomovies/${movie.id}/${user.user?.id}`,
        data
      );
      message.success('You commented successfully!');
      router.replace(router.asPath);
      console.log('Comment added succesfully');
      setCommentText("");
    } catch (error) {
      console.error('Error commenting in the movie:', error);
    }
  };

  const removeComment = async (id: number) => {
    try {
      await axios.delete(`http://localhost:8081/movie/removecomment/${id}`);
      message.warning('Comment removed successfully !');
      router.replace(router.asPath);
      console.log('Comment removed successfully');
    } catch (error) {
      console.error('Error removing comment ', error);
    }
  };

  const [commentLikes, setCommentLikes] = useState<{
    [commentId: string]: number;
  }>({});

  useEffect(() => {
    const fetchCommentLikes = async (commentId: number) => {
      try {
        const response = await axios.get<number>(
          `http://localhost:8081/commentlikes/countCommentLikes/${commentId}`
        );
        setCommentLikes((prevLikes) => ({
          ...prevLikes,
          [commentId]: response.data,
        }));
      } catch (error) {
        console.error('Error fetching comment likes:', error);
      }
    };

    movie.comments.forEach((comment) => {
      fetchCommentLikes(comment.id);
    });
  }, [movie.comments]);

  const [commentDissLikes, setCommentDissLikes] = useState<{
    [commentId: string]: number;
  }>({});

  useEffect(() => {
    const fetchCommentDissLikes = async (commentId: number) => {
      try {
        const response = await axios.get<number>(
          `http://localhost:8081/commentlikes/countCommentDissLikes/${commentId}`
        );
        setCommentDissLikes((prevLikes) => ({
          ...prevLikes,
          [commentId]: response.data,
        }));
      } catch (error) {
        console.error('Error fetching comment likes:', error);
      }
    };

    movie.comments.forEach((comment) => {
      fetchCommentDissLikes(comment.id);
    });
  }, [movie.comments]);

  const likeComment = async (commentId: number) => {
    try {
      await axios.post(
        `http://localhost:8081/commentlikes/likeComment/${commentId}/${user.user?.id}`
      );
      message.success('like added successfully!');
      router.replace(router.asPath);
      console.log('Comment liked succesfully');
    } catch (error) {
      console.error('Error :', error);
    }
  };

  const dissLikeComment = async (commentId: number) => {
    try {
      await axios.post(
        `http://localhost:8081/commentlikes/dissLikeComment/${commentId}/${user.user?.id}`
      );
      message.success('Disslike added successfully!');
      router.replace(router.asPath);
      console.log('Comment Dissliked succesfully');
    } catch (error) {
      console.error('Error :', error);
    }
  };

  const genres = [
    {
      id: 1,
      name: 'Action',
    },
    {
      id: 2,
      name: 'Adventure',
    },
  ];
  return (
    <div>
      {/* <h1>Movie Detais</h1> */}
      <div
        className="movie"
        style={{
          backgroundImage: `url('${movie.posterPath}')`,
        }}
      >
        <div className="movie__dark" />
        <Row>
          <Col span={4} offset={2} className="movie__poster">
            <div
              style={{ backgroundImage: `url('${movie.posterPath}')` }}
            ></div>
            ;
          </Col>

          <Col span={10} className="movie__info">
            <>
              <Fragment>
                <div className="movie__info-header">
                  <h1>
                    {movie.title}
                    <span>
                      {moment(movie.releaseDate, 'YYYY-MM-DD').format('YYYY')}
                    </span>
                  </h1>
                </div>
                <div className="movie__info-content">
                  <h3>Overview</h3>
                  <p>{movie.overview}</p>
                  <br />
                  <h3>Genres</h3>
                  <ul>
                    {movie.genres.map((genre) => (
                      <li key={genre.id}>{genre.name}</li>
                    ))}
                  </ul>
                </div>
                <div style={{paddingTop: '10px'}}>
                <Trailer trailerId={movie.trailerId}/>
                </div>
              </Fragment>
            </>
          </Col>
          <Button onClick={addToWatchList}>AddToWatchList</Button>
        </Row>
      </div>
      <div className="movie__info-content">
        <span>Average Rating:</span>
        {averageRating !== null ? (
          <Rate disabled allowHalf defaultValue={averageRating} />
        ) : (
          <span>No rating available</span>
        )}

        <span>Your Rating: </span>
        {getYourRateNum !== null ? (
          <Rate disabled allowHalf defaultValue={getYourRateNum} />
        ) : (
          <span>No rating available</span>
        )}
      </div>
      <div>
        <Rate allowHalf value={rateNum} onChange={handleRateChange} />
        <br />
        <Button onClick={handleRateMovie}>Rate This Movie</Button>
      </div>
      <div className="commentsContainer">
        <h1>Comments</h1>
        <hr />
        <List
          dataSource={movie.comments}
          renderItem={(comment) => (
            <List.Item className="commentItem">
              <List.Item.Meta
                title={
                  <div className="commentHeader">{`${comment.firstName} ${comment.lastName}`}</div>
                }
                description={<div className="commentText">{comment.text}</div>}
              />
              <Text type="secondary">{comment.dateTimeCreated}</Text>
              <div className="commentActions">
                <Button
                  size="small"
                  onClick={() => likeComment(comment.id)}
                  icon={<LikeOutlined />}
                />
                <p>{commentLikes[comment.id]}</p>
                <Button
                  size="small"
                  onClick={() => dissLikeComment(comment.id)}
                  icon={<DislikeOutlined />}
                />
                <p>{commentDissLikes[comment.id]}</p>
                <Button
                  danger
                  size="small"
                  onClick={() => removeComment(comment.id)}
                  icon={<DeleteOutlined />}
                />
              </div>
            </List.Item>
          )}
        />

<style jsx>{`
  .commentsContainer {
    margin-top: 20px;
  }

  .commentItem {
    padding: 10px;
    border: 1px solid #e8e8e8;
    border-radius: 4px;
    margin-bottom: 10px;
  }

  .commentHeader {
    font-weight: bold;
  }

          .commentText {
            margin-top: 5px;
          }

          .commentActions {
            display: flex;
            align-items: center;
            margin-top: 10px;
          }
        `}</style>
      </div>

      <hr />
      <br />
      <div>
        <h3>Add Comment:</h3>
        <div className="addCommentContainer">
          <Input
            type="text"
            value={commentText}
            onChange={handleCommentTextChange}
          />
          <Button type="primary" onClick={addCommentToMovie}>
            Add Comment
          </Button>
        </div>
        <style jsx>{`
          .addCommentContainer {
            margin-top: 20px;
            display: flex;
            align-items: center;
          }

          .addCommentContainer h2 {
            margin-right: 10px;
          }

          .addCommentContainer input {
            width: 300px;
            margin-right: 10px;
          }
        `}</style>
      </div>
    </div>
  );
};

export default MovieDetails;
