import styles from './EventCard.module.css';
import React from 'react';
import { Event } from 'types/common';


type EventCardsProps = {
  events: Event[];
};

const EventCards: React.FC<EventCardsProps> = ({ events }) => {
  return (
    <div>
      {events.map((event) => (
        <div key={event.id} className={styles['event-card']}>
          <h2>{event.name}</h2>
          <div className={styles['event-image']}>
            <img src={event.posterPath} alt={event.name} />
          </div>
          {/* Add other card elements here */}
        </div>
      ))}
    </div>
  );
};

export default EventCards;
