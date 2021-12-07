/* eslint-disable @next/next/no-sync-scripts */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../../styles/Home/Location.module.css';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from 'react-places-autocomplete';

interface Props {
  currLocation: string;
  setCurrLocation: Function;
}

const Location: React.FC<Props> = ({ currLocation, setCurrLocation }) => {
  const [locationInput, setLocationInput] = useState<string>("");
  const [long, setLong] = useState<string>('');
  const [lat, setLat] = useState<string>('');
  const [showLoad, setShowLoad] = useState<boolean>(false);
  const places = `https://maps.googleapis.com/map/api/js?libraries=places&key${process.env.NEXT_PUBLIC_GOOGLE_API}&libraries=places`;

  const getCurrentPosition = () => {
    if (navigator.geolocation) {
      setShowLoad(true);
      setLong('');
      setLat('');
      navigator.geolocation.getCurrentPosition(function (position) {
        setLong(position.coords.longitude.toString());
        setLat(position.coords.latitude.toString());
      });
    } else {
      alert("Sorry, your browser does not support HTML5 geolocation.");
    }
  };

  const convertToAddress = (): void => {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=${process.env.NEXT_PUBLIC_GOOGLE_API}`;
    axios.get(url)
      .then((res) => {
        setLocationInput(res.data.results[0].formatted_address);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    if (long.length, lat.length) {
      setShowLoad(false);
      convertToAddress();
      console.log(long, lat);
    }
  }, [long, lat]);

  const handleSelect = async (value: string) => {
    const results = await geocodeByAddress(value);
    setLocationInput(value);

    const latLng = await getLatLng(results[0]);
    setLong(latLng.lng.toString());
    setLat(latLng.lat.toString());
  }

  useEffect(() => {
  }, []);

  return (
    <div>
      <br />
      <section className={styles.container}>
        <PlacesAutocomplete
          value={locationInput}
          onChange={setLocationInput}
          onSelect={handleSelect} >
          {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
            <div className={styles.inputDiv} id="location-input-section">
              <input className={styles.input} {...getInputProps({ placeholder: "Enter Your Address" })} defaultValue={locationInput} />
              <div>
                {loading ? <div>...loading</div> : null}
                {suggestions.map((suggestion) => {
                  const style = {
                    backgroundColor: suggestion.active ? "#76b1c9" : "#fff"
                  }

                  return (
                    <div {...getSuggestionItemProps(suggestion, { style })} key={suggestion.description}>{suggestion.description}</div>
                  )
                })}
              </div>
              <button onClick={getCurrentPosition}>Current location</button>
            </div>
          )}
        </PlacesAutocomplete>
      </section>
      {showLoad ? <h3>Loading...</h3> : null}
    </div >
  );
};

export default Location;