import React from 'react'
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import styles from '../../../styles/Results/maps.module.css';



function GoogleMaps(props: any) {
  let token = process.env.NEXT_PUBLIC_GOOGLE_API || ''
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: token,
  })

  const [map, setMap] = React.useState(null);
  const [selectedRest, setSelectedRest] = React.useState<any>(null);
  const [width, setWidth] = React.useState<number>(0);
  const [height, setHeight] = React.useState<string>("400px");
  const localRestaurants = props.localRestaurants || null;
  const defaultZoom = props.defaultZoom || 10;
  const defaultCenter = props.defaultCenter || { lat: 39.8283, lng: -98.5795 };

  React.useEffect(() => {
    window.addEventListener('resize', () => {
      setWidth(window.innerWidth)
    })
  })

  React.useEffect(() => {
    if (width <= 500) {
      setHeight("620px");
    } else if (width > 500) {
      setHeight("350px");
    }
  }, [width])

  const containerStyle = {
    width: '100%',
    height: height
  };

  const onLoad = React.useCallback(function callback(map) {
    // const bounds = new window.google.maps.LatLngBounds();
    // map.fitBounds(bounds);
    // setMap(map);
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
          <div className={styles.indoWindow}>
            <h3 className={styles.title}>{selectedRest.name}</h3>
            <p className={styles.paragraphs}>{selectedRest.address}</p>
            <p className={styles.paragraphs}>{selectedRest.city}</p>
            <p className={styles.paragraphs}>{selectedRest.state}</p>
            <a className={styles.link} target="_blank" href={`https://www.google.com/maps/place/${selectedRest.address}, ${selectedRest.city}/@${selectedRest.lat},${selectedRest.lng}/`} rel="noopener noreferrer">Get directions</a>
          </div>
        </InfoWindow>
      )}
      <></>
    </GoogleMap>
  ) : <></>
}

export default React.memo(GoogleMaps);