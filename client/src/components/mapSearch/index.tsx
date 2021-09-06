import React, { useState, useEffect, useRef } from 'react';
import { Redirect, useLocation } from 'react-router-dom';

import ReactMapGL, { Marker, FlyToInterpolator } from 'react-map-gl';
import axios from 'axios';
import RoomIcon from '@material-ui/icons/Room';
import './styles.scss';

const getViewportLocation = (query) => {
  return axios.get(
    `http://api.positionstack.com/v1/forward?access_key=${process.env.REACT_APP_POSITION_KEY}&query=${query}`
  );
};

const MapSearch = (props) => {
  const [viewport, setViewport] = useState({
    latitude: 0,
    longitude: 0,
    zoom: 10,
    width: '100vw',
    height: '100vh',
  });

  // Turn viewport location prop to coordinates for the map viewport
  useEffect(() => {
    const viewportLocationQuery = `${props.viewPortLocation.city}, ${props.viewPortLocation.province}`;
    getViewportLocation(viewportLocationQuery)
      .then((res) => {
        const initialViewportLatitude = res.data.data[0].latitude;
        const initialViewportLongitude = res.data.data[0].longitude;

        setViewport((prev) => ({
          ...prev,
          latitude: initialViewportLatitude,
          longitude: initialViewportLongitude,
        }));
      })
      .catch((err) => console.log(err));
  }, []);

  const [sheltersWithCoords, setSheltersWithCoords] = useState<any[]>([]);

  // loop through shelters data and and store information with coordinates in localstorage
  // https://stackoverflow.com/questions/56532652/axios-get-then-in-a-for-loop
  useEffect(() => {
    const dataFromShelterCoordsRequest: any[] = [];
    const getShelterCoordsPromises: any[] = [];
    props.shelters.forEach((shelter) => {
      const shelterLocationQuery = `${shelter.street_address} ${shelter.city}, ${shelter.province}`;
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
        setSheltersWithCoords(dataFromShelterCoordsRequest);
      })
      .catch((err) => console.log(err));
  }, [props.shelters]);

  // add all the pins to the map
  const shelterMapMarkers = sheltersWithCoords.map((shelter) => {
    const checkIfShelterIsFull =
      (shelter.capacity - shelter.confirmedReservations) / shelter.capacity;

    const markerStyle = checkIfShelterIsFull
      ? 'shelter-marker'
      : 'shelter-marker--full';

    return (
      <Marker
        key={shelter.id}
        latitude={shelter.latitude}
        longitude={shelter.longitude}
        offsetLeft={-20}
        offsetTop={-10}
        className={markerStyle}
        captureClick={false}
        capturePointerMove={false}>
        <RoomIcon fontSize='large' />
      </Marker>
    );
  });

  const [selectedShelter, setSelectedShelter] = useState({});

  const [showCard, setShowCard] = useState(false);
  const handleMapClick = (e) => {
    if (e.target.closest('path')) {
      // make the card display
      setShowCard((prev) => true);
    } else {
      setShowCard((prev) => false);
    }
  };

  return (
    <div>
      <ReactMapGL
        {...viewport}
        // mapStyle='mapbox://styles/shaunp/ckt1yp4sc1kul17s1v99jevj9'
        mapStyle='mapbox://styles/mapbox/dark-v9'
        onViewportChange={(viewport) => setViewport(viewport)}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        transitionInterpolator={new FlyToInterpolator()}
        onClick={handleMapClick}
        getCursor={(e) => 'grab'}>
        {shelterMapMarkers}

        {showCard && (
          <div className='shelter-card'>
            <div>
              <h1 className='shelter-card__title'>Women and Family Shelter</h1>
              <p>Phone: 604-777-7777</p>
              <p>Website: www.shelter.ca</p>
              <p>Address: 604 Calgary Street, Vancouver BC</p>
              <button className='shelter-card__directions-btn'>
                Get Directions
              </button>
            </div>
            <div className='shelter-card__info'>
              <h1>25</h1>
              <p>Beds</p>
              <p>Available</p>
            </div>
          </div>
        )}
      </ReactMapGL>
    </div>
  );
};

export default MapSearch;
