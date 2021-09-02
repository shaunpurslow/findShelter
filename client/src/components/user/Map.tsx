import React, { useState, useCallback } from 'react';
import ReactMapGL, { Marker, FlyToInterpolator } from 'react-map-gl';
import axios from 'axios';
import RoomIcon from '@material-ui/icons/Room';

const Map = () => {
  const [location, setLocation] = useState()
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [viewport, setViewport] = useState({
    latitude: 51.0460954,
    longitude: -114.065465,
    zoom: 12,
    width: '100vw',
    height: '100vh',
  });


  const handleChange = (e) => {
    setLocation((prev) => e.target.value)
  }

  const handleClick = (e) => {
    console.log('LOCATION FROM STATE: ', location)
    axios
      .get(
        `http://api.positionstack.com/v1/forward?access_key=${process.env.REACT_APP_POSITION_KEY}&query=${location}`
      )
      .then((response) => {
        setLatitude(response.data.data[0].latitude);
        setLongitude(response.data.data[0].longitude)
        setViewport((prev) => ({
          ...prev,
          latitude: response.data.data[0].latitude, 
          longitude: response.data.data[0].longitude, 
          transitionInterpolator: new FlyToInterpolator({speed: 1.9}),
          transitionDuration: 'auto',
          zoom: 17,
          scrollSpeed: 50,
        }))
      })
      .catch((err) => console.log(err));
  }

  return (
    <div>
      <ReactMapGL
        {...viewport}
        mapStyle='mapbox://styles/shaunp/ckt1yp4sc1kul17s1v99jevj9'
        onViewportChange={(viewport) => setViewport(viewport)}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        transitionDuration={1000}
        transitionInterpolator={new FlyToInterpolator()}
      >
        <Marker
          key={1}
          latitude={latitude}
          longitude={longitude}
          offsetLeft={-20}
          offsetTop={-10}
        >
          <RoomIcon />
        </Marker>
        <input type="text" value={location} onChange={handleChange}></input>
        <button onClick={handleClick}>Enter</button>
      </ReactMapGL>
    </div>
  );
};

export default Map;
