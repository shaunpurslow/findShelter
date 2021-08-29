import axios from 'axios';
import { useState, useEffect } from 'react';

const useShelterInfo = () => {
  const [shelterInfo, setShelterInfo] = useState({
    first_name: 'Dwight',
    last_name: 'Schrute',
    thumbnail_url: 'https://picsum.photos/200',
    capacity: 100
  });

  useEffect(() => {
    Promise.all([
      axios.get(`/api/login/:id`),
    ])
      .then(response => {
        const shelter = response;

        setShelterInfo(prev => ({
          ...prev, ...shelter
        }));
      })
      .catch(error => {
        console.log(error);
      })
  }, []);

  return shelterInfo;
};

export default useShelterInfo;
