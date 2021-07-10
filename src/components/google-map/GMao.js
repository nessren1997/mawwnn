import React, { useEffect, useRef } from 'react';

const GMap = ({ branch }) => {
  const googleMapRef = useRef(null);
  let googleMap = null;

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    let cor = branch?.coordinates ? JSON.parse(branch.coordinates) : { lan: 41.40338, lon: 2.17403 };

    // log the coordinates
    console.log(Number(cor.lan), Number(cor.lon));

    googleMap = initGoogleMap(Number(cor.lan), Number(cor.lon));
    createMarker(Number(cor.lan), Number(cor.lon));
  }, [branch]);

  // initialize the google map
  const initGoogleMap = (lan, lon) => {
    return new window.google.maps.Map(googleMapRef.current, {
      center: { lat: lan, lng: lon },
      zoom: 8,
    });
  };

  // create marker on google map
  const createMarker = (lan, lon) =>
    new window.google.maps.Marker({
      position: { lat: lan, lng: lon },
      map: googleMap,
    });

  return <div ref={googleMapRef} style={{ minWidth: 300, height: 400 }} />;
};

export default GMap;
