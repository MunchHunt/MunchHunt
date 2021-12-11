import React from 'react'
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px'
};

function GoogleMaps(props: any) {
  // console.log(props);
  let token = process.env.NEXT_PUBLIC_GOOGLE_API || ''
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: token,
  })

  const [map, setMap] = React.useState(null);
  const [selectedRest, setSelectedRest] = React.useState<any>(null);
  const localRestaurants = props.localRestaurants || null;
  const defaultZoom = props.defaultZoom || 10;
  const defaultCenter = props.defaultCenter || { lat: 39.8283, lng: -98.5795 };

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    const center = {
      lat: defaultCenter.lat,
      lng: defaultCenter.lng
    };
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, []);

  const center = {
    lat: defaultCenter.lat,
    lng: defaultCenter.lng
  };

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={defaultZoom}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {localRestaurants &&
        localRestaurants.map((rest: any, index: any) => (
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
      <></>
    </GoogleMap>
  ) : <></>
}

export default React.memo(GoogleMaps);