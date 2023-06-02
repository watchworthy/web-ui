import { Button, Col, Input, List, Row, message } from 'antd';
import moment from 'moment';
import { Fragment, useState } from 'react';
import { TvShow } from 'types/common';
import { useUser } from '../hooks';
import axios from 'axios';
import { DeleteOutlined } from '@ant-design/icons';

interface TvShowDetailsProps {
  tvShow: TvShow;
}
const TvShowDetails = ({ tvShow }: TvShowDetailsProps) => {
  const user = useUser();

  const [commentText, setCommentText] = useState('');

  const handleCommentTextChange = (e: any) => {
    setCommentText(e.target.value);
  };

  const addCommentToTvShow = async () => {
    try {
      const data = {
        text: commentText,
      };
      const response = await axios.post(
        `http://localhost:8081/tv/addcommenttvshows/${tvShow.id}/${user.user?.id}`,
        data
      );
      message.success('You commented successfully!');
      window.location.reload();
      console.log('Comment added successfully');
    } catch (error) {
      console.error('Error commenting in the movie:', error);
    }
  };
  

  const removeCommentTvShow = async (id: number) => {
    try {
      await axios.delete(`http://localhost:8081/tv/removecommenttvshows/${id}`);
      message.warning('Comment removed successfully !');
      window.location.reload();
      console.log('Comment removed successfully');
    } catch (error) {
      console.error('Error removing comment ', error);
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
          backgroundImage: `url('${tvShow.posterPath}')`,
        }}
      >
        <div className="movie__dark" />
        <Row>
          <Col span={4} offset={2} className="movie__poster">
            <div
              style={{ backgroundImage: `url('${tvShow.posterPath}')` }}
            ></div>
          </Col>
  
          <Col span={10} className="movie__info">
            <>
              <Fragment>
                <div className="movie__info-header">
                  <h1>
                    {tvShow.title}
                    <span>
                      {moment(tvShow.releaseDate, 'YYYY-MM-DD').format('YYYY')}
                    </span>
                  </h1>
                </div>
                <div className="movie__info-content">
                  <h3>Overview</h3>
                  <p>{tvShow.overview}</p>
                  <br />
                  <h3>Genres</h3>
                  <ul>
                    {genres.map((genre) => (
                      <li key={genre.id}>{genre.name}</li>
                    ))}
                  </ul>
                </div>
              </Fragment>
            </>
          </Col>
        </Row>
      </div>
  
      <div className="commentsContainer">
        <h1>Comments</h1>
        <hr />
        <List
          dataSource={tvShow.comments}
          renderItem={(comment) => (
            <List.Item className="commentItem">
              <List.Item.Meta
                title={
                  <div className="commentHeader">{`${comment.firstName} ${comment.lastName}`}</div>
                }
                description={<div className="commentText">{comment.text}</div>}
              />
              <span className="secondaryText">{comment.dateTimeCreated}</span>
              <br />
              <Button
                  className="deleteButton"
                  danger
                  size="large"
                  icon={<DeleteOutlined />}
                  onClick={() => removeCommentTvShow(comment.id)}
              />
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

  .secondaryText {
    color: #888888;
  }

  .commentDate {
    margin-top: 5px;
    display: inline-block;
    margin-right: 10px;
  }

  .deleteButton {
    margin-left: 10px;
    font-size: 18px;
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
          <Button type="primary" onClick={addCommentToTvShow}>
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
  
  export default TvShowDetails;
  
  
 

