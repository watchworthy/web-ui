import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Award } from 'types/common';
import AwardCards from 'libs/watchworthy/src/lib/AwardCards/AwardCards';


const AwardsPage: React.FC = () => {
  const [awards, setAwards] = useState<Award[]>([]);

  useEffect(() => {
    const fetchAwards = async () => {
      try {
        const response = await axios.get('http://localhost:8081/award/list');
        setAwards(response.data);
      } catch (error) {
        console.error('Error fetching awards:', error);
      }
    };

    fetchAwards();
  }, []);

  return (
    <div>
      <h1>Awards</h1>
      <AwardCards awards={awards} />
    </div>
  );
};

export default AwardsPage;
