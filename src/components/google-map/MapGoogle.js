import React, { useState, useEffect } from 'react';
import { Row, Col } from 'antd';
import GMap from './GMao';

// API key of the google map
const GOOGLE_MAP_API_KEY = 'AIzaSyASxGPnJI4Ydycha5DwFkqkIccF7tzTjSA';

// load google map script
const loadGoogleMapScript = (callback) => {
  if (
    typeof window.google === 'object' &&
    typeof window.google.maps === 'object'
  ) {
    callback();
  } else {
    const googleMapScript = document.createElement('script');
    googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAP_API_KEY}`;
    window.document.body.appendChild(googleMapScript);
    googleMapScript.addEventListener('load', callback);
  }
};

const Map = ({ branch }) => {
  const [loadMap, setLoadMap] = useState(false);

  useEffect(() => {
    loadGoogleMapScript(() => {
      setLoadMap(true);
    });
  }, []);

  return (
    <Row>
      <Col flex={5}>
        {!loadMap ? <div>Loading...</div> : <GMap branch={branch} />}
      </Col>
    </Row>
  );
};

export default Map;
