import React, { useState } from 'react';
import { GoogleMap, withScriptjs, withGoogleMap, Marker, InfoWindow } from "react-google-maps";


const DisplayMap = (props: any) => {
  const currentZoom = props.props.zoom;
  const currentCenter = props.props.center;
  const currentUserData = props.props.userData;

  return (
    <GoogleMap
      defaultZoom={currentZoom}
      defaultCenter={currentCenter}>
        { currentUserData &&
        currentUserData.map((rest:any, index:any) => (
        <Marker
        key={index}
        position={{
          lat: rest.lat,
          lng: rest.lng
        }}
        />
        ))}
    </GoogleMap>
  );
}

const WrappedMap = withScriptjs(withGoogleMap(props => (<DisplayMap props={props}/>)));

const Map = (props: any) => {

  const defaultZoom = props.defaultZoom || 13;
  const defaultCenter = props.defaultCenter || { lat: 39.8283, lng: -98.5795 };
  const userMarkers = props.userMarkers || null;
  const localRestaurants = props.localRestaurants || null;
  const styleWidth = props.styleWidth || 100;
  const styleHeight = props.styleHeight || 100;


  return (
    <div style={{ width: `${styleWidth}%`, height: `${styleHeight}%` }}>
      <WrappedMap googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,visualization,drawing,places&key=${process.env.NEXT_PUBLIC_GOOGLE_API}`}
        loadingElement={<div style={{ height: "50%" }} />}
        containerElement={<div style={{ height: "100%" }} />}
        mapElement={<div style={{ height: "50%" }} />}
        zoom={defaultZoom}
        center={defaultCenter}
        userData={localRestaurants}
        localBirdsData={localRestaurants}
      />
    </div>
  )
}

export default Map;