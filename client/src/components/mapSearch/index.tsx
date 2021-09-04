import React, { useState, useEffect, useCallback } from 'react';
import ReactMapGL, { Marker, FlyToInterpolator } from 'react-map-gl';
import axios from 'axios';
import RoomIcon from '@material-ui/icons/Room';

const getViewportLocation = (query, cb) => {
  axios
    .get(
      `http://api.positionstack.com/v1/forward?access_key=${process.env.REACT_APP_POSITION_KEY}&query=${query}`
    )
    .then((res) => {
      const initialViewportLatitude = res.data.data[0].latitude;
      const initialViewportLongitude = res.data.data[0].longitude;

      cb((prev) => ({
        ...prev,
        latitude: initialViewportLatitude,
        longitude: initialViewportLongitude,
      }));
    })
    .catch((err) => console.log(err));
};
// PROPS
// 1 - an array of shelters with addresses to render
//    will need to convert addresses to coordinates
// 2 - a city and province e.g "city: Vancouver, province: BC"
//    will need to convert to coordinates for the initial viewport render

// need to map through the shelters to build the Markers on the map

const mockInitialLocation = { city: 'vancouver', province: 'BC' };
const mockShelters = [
  {
    id: 1,
    address: '1445 14th Ave W Vancouver BC V6H 1R5',
  },
  {
    id: 2,
    address: '1990 Panorama Dr North Vancouver BC V7G 1V1',
  },
  {
    id: 3,
    address: '302 590 12th Ave W Vancouver BC V5Z 1M2',
  },
  {
    id: 4,
    address: '1772 W 15th Vancouver BC V6J 2K8',
  },
  {
    id: 5,
    address: '1633 MacKay Ave 416 North Vancouver BC V7P 0A2',
  },
  {
    id: 6,
    address: '4402 Oxford St Burnaby BC V5C 1E5',
  },
  {
    id: 7,
    address: '242 6th St E North Vancouver BC V7L 1P5',
  },
];

const MapSearch = () => {
  // turn the initial city to coordinates

  const [location, setLocation] = useState();
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [viewport, setViewport] = useState({
    latitude: 0,
    longitude: 0,
    zoom: 10,
    width: '100vw',
    height: '100vh',
  });

  // turn location to coordinates on initial load for the map viewport
  useEffect(() => {
    const viewportLocationQuery = `${mockInitialLocation.city}, ${mockInitialLocation.province}`;
    getViewportLocation(viewportLocationQuery, setViewport);
  }, []);

  // loop through shelters data and and store information with coordinates in localstorage
  // https://stackoverflow.com/questions/56532652/axios-get-then-in-a-for-loop
  useEffect(() => {
    const dataFromShelterCoordsRequest: any[] = [];
    const getShelterCoordsPromises: any[] = [];
    mockShelters.forEach((shelter) => {
      const shelterLocationQuery = `${shelter.address}`;
      getShelterCoordsPromises.push(
        axios
          .get(
            `http://api.positionstack.com/v1/forward?access_key=${process.env.REACT_APP_POSITION_KEY}&query=${shelterLocationQuery}`
          )
          .then((res) => {
            dataFromShelterCoordsRequest.push({
              ...shelter,
              latitude: res.data.data[0].latitude,
              longitude: res.data.data[0].longitude,
            });
          })
      );
    });

    Promise.all(getShelterCoordsPromises)
      .then(() => {
        localStorage.setItem(
          'sheltersWithCoords',
          JSON.stringify(dataFromShelterCoordsRequest)
        );
      })
      .catch((err) => console.log(err));
  }, []);

  // add all the pins to the map
  const shelterDataWithCoords =
    localStorage.getItem('sheltersWithCoords') || '';
  const parsedShelterDataWithCoords = JSON.parse(shelterDataWithCoords);
  const shelterMapMarkers = parsedShelterDataWithCoords.map((shelter) => (
    <Marker
      key={shelter.id}
      latitude={shelter.latitude}
      longitude={shelter.longitude}
      offsetLeft={-20}
      offsetTop={-10}>
      <RoomIcon />
    </Marker>
  ));

  // Directions API

  const handleChange = (e) => {
    setLocation((prev) => e.target.value);
  };

  const handleClick = (e) => {
    axios
      .get(
        `http://api.positionstack.com/v1/forward?access_key=${process.env.REACT_APP_POSITION_KEY}&query=${location}`
      )
      .then((response) => {
        setLatitude(response.data.data[0].latitude);
        setLongitude(response.data.data[0].longitude);
        setViewport((prev) => ({
          ...prev,
          latitude: response.data.data[0].latitude,
          longitude: response.data.data[0].longitude,
          transitionInterpolator: new FlyToInterpolator({ speed: 1.9 }),
          transitionDuration: 'auto',
          zoom: 10,
          scrollSpeed: 50,
        }));
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <ReactMapGL
        {...viewport}
        mapStyle='mapbox://styles/shaunp/ckt1yp4sc1kul17s1v99jevj9'
        onViewportChange={(viewport) => setViewport(viewport)}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        transitionInterpolator={new FlyToInterpolator()}>
        {shelterMapMarkers}
        <input type='text' value={location} onChange={handleChange}></input>
        <button onClick={handleClick}>Enter</button>
      </ReactMapGL>
    </div>
  );
};

export default MapSearch;
