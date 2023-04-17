import { Card, Divider } from 'antd';

const { Meta } = Card;

export const MovieCard = () => {
  return (
    <div>
      <h1>Movies</h1>
      <Divider style={{ margin: '20px 0' }} />
      <div style={{ display: 'flex', gap: '15px' }}>
        <Card
          hoverable
          style={{ width: 180, border: '#D9D9D9 solid 0.5px' }}
          cover={
            <img
              alt="example"
              src="https://m.media-amazon.com/images/M/MV5BMzkyMjU1ZjMtMDJlMS00M2YzLWJhZDQtYjFjZTUyMzI2MDViXkEyXkFqcGdeQXVyMzQyMDgzOTU@._V1_.jpg"
            />
          }
        >
          <Meta title="Murder Mystery" description="Adventure" />
        </Card>
        <Card
          hoverable
          style={{ width: 180, border: '#D9D9D9 solid 0.5px' }}
          cover={
            <img
              alt="example"
              src="https://m.media-amazon.com/images/M/MV5BZDA0OGQxNTItMDZkMC00N2UyLTg3MzMtYTJmNjg3Nzk5MzRiXkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_.jpg"
            />
          }
        >
          <Meta title="Murder Mystery" description="Adventure" />
        </Card>
        <Card
          hoverable
          style={{ width: 180, border: '#D9D9D9 solid 0.5px' }}
          cover={
            <img
              alt="example"
              src="https://m.media-amazon.com/images/M/MV5BNmZkYjQzY2QtNjdkNC00YjkzLTk5NjUtY2MyNDNiYTBhN2M2XkEyXkFqcGdeQXVyMjMwNDgzNjc@._V1_.jpg"
            />
          }
        >
          <Meta title="Murder Mystery" description="Adventure" />
        </Card>
        <Card
          hoverable
          style={{ width: 180, border: '#D9D9D9 solid 0.5px' }}
          cover={
            <img
              alt="example"
              src="https://m.media-amazon.com/images/M/MV5BZTg3ZWY5MDctNjAxNy00MzZhLWJiZTEtNzI3MzJjNzdiNTkyXkEyXkFqcGdeQXVyMTUzMTg2ODkz._V1_.jpg"
            />
          }
        >
          <Meta title="Murder Mystery" description="Adventure" />
        </Card>
        <Card
          hoverable
          style={{ width: 180, border: '#D9D9D9 solid 0.5px' }}
          cover={
            <img
              alt="example"
              src="https://m.media-amazon.com/images/M/MV5BNTM4NjIxNmEtYWE5NS00NDczLTkyNWQtYThhNmQyZGQzMjM0XkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_FMjpg_UX1000_.jpg"
            />
          }
        >
          <Meta title="Murder Mystery" description="Adventure" />
        </Card>
        <Card
          hoverable
          style={{ width: 180, border: '#D9D9D9 solid 0.5px' }}
          cover={
            <img
              alt="example"
              src="https://m.media-amazon.com/images/M/MV5BODAwZDQ5ZjEtZDI1My00MTFiLTg0ZjUtOGE2YTBkOTdjODFhXkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_FMjpg_UX1000_.jpg"
            />
          }
        >
          <Meta title="Murder Mystery" description="Adventure" />
        </Card>
        <Card
          hoverable
          style={{ width: 180, border: '#D9D9D9 solid 0.5px' }}
          cover={
            <img
              alt="example"
              src="https://m.media-amazon.com/images/M/MV5BYjhkNzNjNzYtMzkzOS00NmM3LWJhZmUtNWIyYTc3OTc0MjNkXkEyXkFqcGdeQXVyNjI4NDY5ODM@._V1_FMjpg_UX1000_.jpg"
            />
          }
        >
          <Meta title="Murder Mystery" description="Adventure" />
        </Card>
        <Card
          hoverable
          style={{ width: 180, border: '#D9D9D9 solid 0.5px' }}
          cover={
            <img
              alt="example"
              src="https://m.media-amazon.com/images/M/MV5BMDExZGMyOTMtMDgyYi00NGIwLWJhMTEtOTdkZGFjNmZiMTEwXkEyXkFqcGdeQXVyMjM4NTM5NDY@._V1_FMjpg_UX1000_.jpg"
            />
          }
        >
          <Meta title="Murder Mystery" description="Adventure" />
        </Card>
      </div>
    </div>
  );
};
