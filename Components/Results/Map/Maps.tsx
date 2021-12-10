import React, { useState } from 'react';
import { GoogleMap, withScriptjs, withGoogleMap, Marker, InfoWindow } from "react-google-maps";

interface MapProps {
  zoom: number,
  center: any,
  userData: any,
}


const DisplayMap = (props: any) => {
  const [selectedRest, setSelectedRest] = useState<any>(null);
  const currentZoom = props.props.zoom;
  const currentCenter = props.props.center;
  const currentUserData = props.props.userData;

  return (
    <GoogleMap
      defaultZoom={currentZoom}
      defaultCenter={currentCenter}>
      {currentUserData &&
        currentUserData.map((rest: any, index: any) => (
          <Marker
            key={index}
            position={{
              lat: rest.lat,
              lng: rest.lng
            }}
            onClick={() => {
              setSelectedRest(rest);
            }}
          />
        ))}
      {selectedRest && (
        <InfoWindow
          position={{
            lat: selectedRest.lat,
            lng: selectedRest.lng,
          }}
          onCloseClick={() => {
            setSelectedRest(null)
          }}
        >
          <div>
            <div>restaurant details</div>
            <h3>{selectedRest.name}</h3>
            <p>{selectedRest.address}</p>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
}

const WrappedMap = withScriptjs(withGoogleMap(props => (<DisplayMap props={props} />)));

const Map = (props: any) => {

  const defaultZoom = props.defaultZoom || 10;
  const defaultCenter = props.defaultCenter || { lat: 39.8283, lng: -98.5795 };
  const userMarkers = props.userMarkers || null;
  const localRestaurants = props.localRestaurants || null;
  const styleWidth = props.styleWidth || 100;
  const styleHeight = props.styleHeight || 100;


  return (
    <div style={{ width: `${styleWidth}%`, height: `${styleHeight}%` }}>
      <WrappedMap googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,visualization,drawing,places&key=${process.env.NEXT_PUBLIC_GOOGLE_API}`}
        loadingElement={<div style={{ height: "100%" }} />}
        containerElement={<div style={{ height: "430px" }} />}
        mapElement={<div style={{ height: "100%" }} />}
        zoom={defaultZoom}
        center={defaultCenter}
        userData={localRestaurants}
      />
    </div>
  )
}

export default Map;