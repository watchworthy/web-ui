import { Card, Divider } from 'antd';

const { Meta } = Card;

export const PeopleCard = () => {
  return (
    <div>
      <h1>Actors</h1>
      <Divider style={{ margin: '20px 0' }} />
      <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
        <Card
          hoverable
          style={{ width: 180, border: '#D9D9D9 solid 0.5px' }}
          cover={
            <img
              alt="Adam Sandler"
              src="https://www.kindpng.com/picc/m/749-7496368_adam-sandler-as-howard-ratner-holding-a-self.png"
            />
          }
        >
          <Meta title="Adam Sandler" description="Very Very nice actor with great potential" />
        </Card>
        <Card
          hoverable
          style={{ width: 180, border: '#D9D9D9 solid 0.5px' }}
          cover={
            <img
              alt="Brad Pitt"
              src="https://www.kindpng.com/picc/m/749-7496368_adam-sandler-as-howard-ratner-holding-a-self.png"
            />
          }
        >
          <Meta title="Brad Pitt" description="Very Very nice actor with great potential" />
        </Card>
        <Card
          hoverable
          style={{ width: 180, border: '#D9D9D9 solid 0.5px' }}
          cover={
            <img
              alt="Tom Hanks"
              src="https://www.kindpng.com/picc/m/749-7496368_adam-sandler-as-howard-ratner-holding-a-self.png"
            />
          }
        >
          <Meta title="Tom Hanks" description="Very Very nice actor with great potential" />
        </Card>
        <Card
          hoverable
          style={{ width: 180, border: '#D9D9D9 solid 0.5px' }}
          cover={
            <img
              alt="Will Smith"
              src="https://www.kindpng.com/picc/m/749-7496368_adam-sandler-as-howard-ratner-holding-a-self.png"
            />
          }
        >
          <Meta title="Will Smith" description="Very Very nice actor with great potential" />
        </Card>
        <Card
          hoverable
          style={{ width: 180, border: '#D9D9D9 solid 0.5px' }}
          cover={
            <img
              alt="Adam Sandler"
              src="https://www.kindpng.com/picc/m/749-7496368_adam-sandler-as-howard-ratner-holding-a-self.png"
            />
          }
        >
          <Meta title="Adam Sandler" description="Very Very nice actor with great potential" />
        </Card>
        <Card
          hoverable
          style={{ width: 180, border: '#D9D9D9 solid 0.5px' }}
          cover={
            <img
              alt="Adam Sandler"
              src="https://www.kindpng.com/picc/m/749-7496368_adam-sandler-as-howard-ratner-holding-a-self.png"
            />
          }
        >
          <Meta title="Adam Sandler" description="Very Very nice actor with great potential" />
        </Card>
        <Card
          hoverable
          style={{ width: 180, border: '#D9D9D9 solid 0.5px' }}
          cover={
            <img
              alt="Adam Sandler"
              src="https://www.kindpng.com/picc/m/749-7496368_adam-sandler-as-howard-ratner-holding-a-self.png"
            />
          }
        >
          <Meta title="Adam Sandler" description="Very Very nice actor with great potential" />
        </Card>
      </div>
    </div>
  );
};
export default PeopleCard;