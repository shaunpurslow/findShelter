import { useState, useEffect } from 'react';
import axios from 'axios';
import useShelters from './useShelters';

const useSearch = () => {
  const [search, setSearch] = useState('');
  const [shelters, setShelters] = useShelters();

  useEffect(() => {
    axios
      .get(`http://localhost:8080/search/?value=${search}`)
      .then((res) => {
        const mySearch = res.data;
        setShelters((prev) => ({ ...prev, ...mySearch }));
      })
      .catch((err) => console.error(err));
  }, []);

  return [search, setSearch] as const;
};

export default useSearch;
