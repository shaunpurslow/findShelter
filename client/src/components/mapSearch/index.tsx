import React, { useState, useEffect, useRef } from 'react';
import ReactMapGL, { Marker, FlyToInterpolator } from 'react-map-gl';
import axios from 'axios';
import RoomIcon from '@material-ui/icons/Room';
import './styles.scss';

const getViewportLocation = (query) => {
  return axios.get(
    `http://api.positionstack.com/v1/forward?access_key=${process.env.REACT_APP_POSITION_KEY}&query=${query}`
  );
};

const mockInitialLocation = { city: 'vancouver', province: 'BC' };
const mockShelters = [
  {
    id: 1,
    address: '1445 14th Ave W Vancouver BC V6H 1R5',
    capacity: 100,
    confirmedReservations: 95,
  },
  {
    id: 2,
    address: '1990 Panorama Dr North Vancouver BC V7G 1V1',
    capacity: 100,
    confirmedReservations: 100,
  },
  {
    id: 3,
    address: '302 590 12th Ave W Vancouver BC V5Z 1M2',
    capacity: 100,
    confirmedReservations: 90,
  },
  {
    id: 4,
    address: '1772 W 15th Vancouver BC V6J 2K8',
    capacity: 100,
    confirmedReservations: 100,
  },
  {
    id: 5,
    address: '1633 MacKay Ave 416 North Vancouver BC V7P 0A2',
    capacity: 100,
    confirmedReservations: 50,
  },
  {
    id: 6,
    address: '4402 Oxford St Burnaby BC V5C 1E5',
    capacity: 100,
    confirmedReservations: 50,
  },
  {
    id: 7,
    address: '242 6th St E North Vancouver BC V7L 1P5',
    capacity: 100,
    confirmedReservations: 50,
  },
];

const MapSearch = (props) => {
  console.log('PROPS PASSED TO MAP SEARCH: ', props);

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

  const shelterDataWithCoordsRef = useRef<any[]>([]);
  const [sheltersWithCoords, setSheltersWithCoords] = useState<any[]>([]);

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

    // can save in alternate place than localstorage
    Promise.all(getShelterCoordsPromises)
      .then(() => {
        setSheltersWithCoords(dataFromShelterCoordsRequest);
        console.log('DATA STORED IN REF: ', shelterDataWithCoordsRef);
      })
      .catch((err) => console.log(err));
  }, []);

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
