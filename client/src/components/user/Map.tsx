import React, { useState } from 'react';
import ReactMapGL from 'react-map-gl';

const Map = () => {
  const [viewport, setViewport] = useState({
    latitude: 51.0460954,
    longitude: -114.065465,
    zoom: 10,
    width: '100vw',
    height: '100vh',
  });
  return (
    <div>
      <ReactMapGL
        {...viewport}
        mapStyle='mapbox://styles/shaunp/ckt1yp4sc1kul17s1v99jevj9'
        onViewportChange={(viewport) => setViewport(viewport)}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      >
        HERE IS OUR MAP
      </ReactMapGL>
    </div>
  );
};

export default Map;
