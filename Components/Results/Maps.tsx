import React, { useState } from 'react';
import { GoogleMap, withScriptjs, withGoogleMap, Marker, InfoWindow } from "react-google-maps";


const DisplayMap = (props: any) => {
  const [selectedBird, setSelectedBird] = useState(null);

  const currentZoom = props.props.zoom;
  const currentCenter = props.props.center;
  const currentUserData = props.props.userData;
  const currentFriendData = props.props.friendData;

  return (
    <GoogleMap
      defaultZoom={currentZoom}
      defaultCenter={currentCenter}>
        { currentUserData &&
        currentUserData.map((bird:any, index:any) => (
        <Marker
        key={index}
        position={{
          lat: bird.lat,
          lng: bird.lng
        }}
        onClick={() => {
          setSelectedBird(bird);
        }}
        />
        ))}
        {currentFriendData &&
        currentFriendData.map((bird, index) => (
        <Marker
        key={index}
        position={{
          lat: bird.coordinates[0],
          lng: bird.coordinates[1]
        }}
        onClick={() => {
          setSelectedBird(bird);
        }}
        />
        ))}
    </GoogleMap>
  );
}

const WrappedMap = withScriptjs(withGoogleMap(props => (<DisplayMap props={props}/>)));

const Map = (props: any) => {

  const defaultZoom = props.defaultZoom || 10;
  const defaultCenter = props.defaultCenter || { lat: 39.8283, lng: -98.5795 };
  const userMarkers = props.userMarkers || null;
  const friendMarkers = props.friendMarkers || null;
  const localBirdsMarkers = props.localBirdsMarkers || null;
  const heatMap = props.heatMap || null;
  const styleWidth = props.styleWidth || 100;
  const styleHeight = props.styleHeight || 100;


  return (
    <div style={{ width: `${styleWidth}%`, height: `${styleHeight}%` }}>
      <WrappedMap googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,visualization,drawing,places&key=${process.env.NEXT_PUBLIC_GOOGLE_API}`}
        loadingElement={<div style={{ height: "50%" }} />}
        containerElement={<div style={{ height: "50%" }} />}
        mapElement={<div style={{ height: "50%" }} />}
        zoom={defaultZoom}
        center={defaultCenter}
        userData={localBirdsMarkers}
        friendData={friendMarkers}
        localBirdsData={localBirdsMarkers}
        heatmapLayer={heatMap}
      />
    </div>
  )
}

export default Map;