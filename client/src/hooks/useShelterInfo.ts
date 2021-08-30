import axios from 'axios';
import { useState, useEffect } from 'react';

const useShelterInfo = (setAppState) => {
  const [shelterInfo, setShelterInfo] = useState({
    first_name: '',
    last_name: '',
    thumbnail_url: '',
    capacity: 0
  });

  useEffect((): void => {
    Promise.all([
      axios.get(`http://localhost:8080/shelters/login/`),
    ])
      .then(response => {
        const shelter: any = response[0].data[0];

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
