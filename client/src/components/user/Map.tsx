import React, { useState } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';
import axios from 'axios';
import RoomIcon from '@material-ui/icons/Room';

const Map = () => {
  const [viewport, setViewport] = useState({
    latitude: 51.0460954,
    longitude: -114.065465,
    zoom: 10,
    width: '100vw',
    height: '100vh',
  });
  
  
  // const getLocation = () => {
  //   axios
  //     .get('https://data.calgary.ca/resource/fd9t-tdn2.json')
  //     .then((response) => {
  //       console.log(response.data[0]);
      
  //     });
  // };

  return (
    <div>
      <ReactMapGL
        {...viewport}
        mapStyle='mapbox://styles/shaunp/ckt1yp4sc1kul17s1v99jevj9'
        onViewportChange={(viewport) => setViewport(viewport)}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      >
        <Marker
        key={1}
        latitude={50.887836920058064}
        longitude={-113.97597027648685}
        offsetLeft={-20}
        offsetTop={-10}
        >
          <RoomIcon />
        </Marker>
      </ReactMapGL>
    </div>
  );
};

export default Map;
