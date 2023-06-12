import fetchAwards from 'api/fetch-all-awards';
import { AwardsQuery } from 'api/fetch-all-awards';
import { Skeleton } from 'antd';
import { useEffect, useState } from 'react';


const Awards = () => {
  const [awards, setAwards] = useState<AwardsQuery | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAwardsData = async () => {
      try {
        const response = await fetchAwards(1); 
        setAwards(response);
      } catch (error) {
        console.error('Error fetching awards:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAwardsData();
  }, []);

  if (isLoading) {
    return <Skeleton active />;
  }

  return (
    <>
      <h1>Award List</h1>
      {awards?.data.map((award) => (
        <div key={award.id}>
          <h3>{award.name}</h3>
          <p>Category: {award.category}</p>
          <p>Winner: {award.winner ? 'Yes' : 'No'}</p>
          <p>Year: {award.year}</p>
          <p>Description: {award.description}</p>
        </div>
      ))}
    </>
  );
};

export default Awards;
