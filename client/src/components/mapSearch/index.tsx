import React, { useState, useEffect } from 'react';
import Shelter from '../newDashboard/Shelter';

import 'mapbox-gl/dist/mapbox-gl.css';
import ReactMapGL, { Marker } from 'react-map-gl';
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
    props.searchResults.forEach((shelter) => {
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
  }, [props.searchResults]);

  const [selectedShelter, setSelectedShelter] = useState({});
  console.log(selectedShelter);

  // add all the pins to the map
  const shelterMapMarkers = sheltersWithCoords.map((shelter) => {
    const checkIfShelterIsFull =
      (shelter.capacity - shelter.confirmedReservations) / shelter.capacity;

    const markerStyle = checkIfShelterIsFull
      ? 'shelter-marker'
      : 'shelter-marker--full';

    const shelterData = JSON.stringify({ ...shelter });

    const handleMarkerIconClick = (e) => {
      // https://www.designcise.com/web/tutorial/how-to-fix-property-does-not-exist-on-type-eventtarget-typescript-error
      const target = e.target as Element;
      const svgElement: any = target.closest('svg');
      const shelterData: string =
        svgElement.getAttribute('data-shelter') || '{}';
      const parsedShelterData = JSON.parse(shelterData);
      setSelectedShelter((prev) => parsedShelterData);
    };

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
        <RoomIcon
          className='marker-icon'
          fontSize='large'
          onClick={handleMarkerIconClick}
          data-shelter={shelterData}
        />
      </Marker>
    );
  });

  const [showCard, setShowCard] = useState(false);
  const handleMapClick = (e) => {
    console.log(e.target);
    if (e.target.closest('svg')) {
      setShowCard((prev) => true);
    } else {
      setShowCard((prev) => false);
    }
  };

  return (
    <div>
      <ReactMapGL
        {...viewport}
        mapStyle='mapbox://styles/mapbox/dark-v9'
        onViewportChange={(viewport) => setViewport(viewport)}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        onClick={handleMapClick}
        getCursor={(e) => 'grab'}>
        <div
          className='search-results--back-btn-map'
          onClick={props.changeToSearchView}>
          GO BACK
        </div>

        {shelterMapMarkers}

        {showCard && (
          <div className='shelter-card-container'>
            <Shelter
              key={selectedShelter['id']}
              id={selectedShelter['id']}
              capacity={selectedShelter['capacity']}
              city={selectedShelter['city']}
              confirmedReservations={selectedShelter['confirmed_reservations']}
              country={selectedShelter['country']}
              couples={selectedShelter['couples']}
              email={selectedShelter['email']}
              family={selectedShelter['family']}
              female_only={selectedShelter['female_only']}
              male_only={selectedShelter['male_only']}
              name={selectedShelter['name']}
              unconfirmedReservations={
                selectedShelter['not_confirmed_reservations']
              }
              pets={selectedShelter['pets']}
              phone={selectedShelter['phone']}
              postal_code={selectedShelter['postal_code']}
              province={selectedShelter['province']}
              street_address={selectedShelter['street_address']}
              thumbnail_url={selectedShelter['thumbnail_url']}
              website_url={selectedShelter['website_url']}
            />
          </div>
        )}
      </ReactMapGL>
    </div>
  );
};

export default MapSearch;
