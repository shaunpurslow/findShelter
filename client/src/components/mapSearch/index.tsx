import React, { useState, useEffect } from 'react';
import Shelter from '../newDashboard/Shelter';

import 'mapbox-gl/dist/mapbox-gl.css';
import MapGL, { Marker } from 'react-map-gl';
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
  });
  const [selectedShelter, setSelectedShelter] = useState({});
  const [showCard, setShowCard] = useState(false);

  // Turn viewport location prop to coordinates for the map viewport
  useEffect(() => {
    const viewportLocationQuery = `${props.viewPortLocation.city}, ${props.viewPortLocation.province}`;
    getViewportLocation(viewportLocationQuery)
      .then((res) => {
        const initialViewportLatitude = res.data.data[0].latitude;
        const initialViewportLongitude = res.data.data[0].longitude;

        // reload page if data comes back undefined from (semi-reliable) position stack API
        if (!initialViewportLatitude || !initialViewportLongitude) {
          window.location.href = '/';
        }

        setViewport((prev) => ({
          ...prev,
          latitude: initialViewportLatitude,
          longitude: initialViewportLongitude,
        }));
      })
      .catch((err) => console.log(err));
  }, []);

  // add all the pins to the map
  const shelterMapMarkers = props.searchResults.map((shelter) => {
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
        latitude={Number(shelter.latitude)}
        longitude={Number(shelter.longitude)}
        offsetLeft={-20}
        offsetTop={-10}
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

  const handleMapClick = (e) => {
    if (e.target.closest('svg')) {
      setShowCard((prev) => true);
    } else {
      setShowCard((prev) => false);
    }
  };

  return (
    <div>
      <MapGL
        {...viewport}
        width='100vw'
        height='100vh'
        mapStyle='mapbox://styles/mapbox/dark-v9'
        onViewportChange={setViewport}
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
      </MapGL>
    </div>
  );
};

export default MapSearch;
