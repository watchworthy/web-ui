import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EventCards from 'libs/watchworthy/src/lib/EventCards/EventCards';
import { Event } from 'types/common';

const EventsPage: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:8081/events/list');
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div>
      <h1>Events</h1>
      <EventCards events={events} />
    </div>
  );
};

export default EventsPage;
