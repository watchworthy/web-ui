import { useEffect, useState } from 'react';
import axios from 'axios';
import { Award } from 'types/common';
import styles from './AwardCards.module.css';

const AwardCard = () => {
  const [awards, setAwards] = useState<Award[]>([]);

  useEffect(() => {
    const fetchAwards = async () => {
      try {
        const response = await axios.get('http://localhost:8081/award/list');
        console.log(response.data); // Log the response data to the console
        setAwards(response.data);
      } catch (error) {
        console.error('Error fetching awards:', error);
      }
    };

    fetchAwards();
  }, []);

  return (
    <div className={styles.cardContainer}>
      
      {awards.map((award) => (
        <div key={award.id} className={styles.card}>
          <img src={award.posterPath} alt={award.name} className={styles.cardImage} />
          <div>
            <h2>{award.name}</h2>
            <p>{award.category}</p>
            <p>{award.movieName }</p>
            <p>{award.name}</p>
            <p>{award.year}</p>
            <p>{award.description}</p>
            
          </div>
        </div>
      ))}
    </div>
  );
};

export default AwardCard;
