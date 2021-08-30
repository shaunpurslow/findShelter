import axios from 'axios';
import { useState, useEffect } from 'react';

const useShelterInfo = (setAppState) => {
  const [shelterInfo, setShelterInfo] = useState({
    first_name: 'Dwight',
    last_name: 'Schrute',
    thumbnail_url: 'https://picsum.photos/200',
    capacity: 100
  });

  useEffect((): void => {
    Promise.all([
      axios.get(`/login/:id`),
    ])
      .then(response => {
        const shelter: any = response;
        console.log(shelter);

        setShelterInfo(prev => ({
          ...prev, ...shelter
        }));

        setAppState(prev => ({ ...prev, shelter: { id: shelter.shelter_id, thumbnail_url: shelter.thumbnail_url } }))
      })
      .catch(error => {
        console.log(error);
      })

  }, []);

  return shelterInfo;
};

export default useShelterInfo;
