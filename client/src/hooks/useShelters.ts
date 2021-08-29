import axios from 'axios';
import { useState, useEffect } from 'react';

const mockData = [{
  id: 1,
  name: 'Family & Friends',
  street_address: '303 1st Street SW',
  city: 'Calgary',
  province: 'Alberta',
  postal_code: 'T2P 0A5',
  country: 'Canada',
  phone: '4032968000',
  email: 'info@familynfriends.com',
  thumbnail_url: 'https://picsum.photos/200',
  website_url: 'familynfriends.com',
  capacity: 100,
  couples: true,
  female_only: false,
  male_only: false,
  family: true,
  pets: true
}, {
  id: 2,
  name: 'Women Support',
  street_address: '303 1st Street SW',
  city: 'Calgary',
  province: 'Alberta',
  postal_code: 'T2P 0A5',
  country: 'Canada',
  phone: '4032968000',
  email: 'info@womensupport.ca',
  thumbnail_url: 'https://picsum.photos/200',
  website_url: 'info@womensupport.ca',
  capacity: 50,
  couples: false,
  female_only: true,
  male_only: false,
  family: true,
  pets: true
}, {
  id: 3,
  name: 'Mens Shelter',
  street_address: '650 W 41st Ave',
  city: 'Vancouver',
  province: 'BC',
  postal_code: 'V5Z 2M9',
  country: 'Canada',
  phone: '4032968000',
  email: 'info@mensshelter.ca',
  thumbnail_url: 'https://picsum.photos/200',
  website_url: 'familynfriends.com',
  capacity: 80,
  couples: false,
  female_only: false,
  male_only: true,
  family: false,
  pets: true
}]

const useShelters = () => {
  const [shelters, setShelters] = useState(mockData);

  // useEffect and Axios request goes here

  return shelters;
};

export default useShelters;
