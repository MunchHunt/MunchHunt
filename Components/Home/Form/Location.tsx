/* eslint-disable @next/next/no-sync-scripts */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../../../styles/Home/Location.module.css';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from 'react-places-autocomplete';
import { Button } from '@mui/material';
import CurrentLocation from './CurrentLocation';

interface Coords {
  lat: string;
  long: string;
}

interface Props {
  currLocation: string;
  setCurrLocation: Function;
  currCoords: Coords;
  setCoords: Function;
}

const Location: React.FC<Props> = ({ currLocation, setCurrLocation, currCoords, setCoords }) => {
  const [locationInput, setLocationInput] = useState<string>("");
  const [showLoad, setShowLoad] = useState<boolean>(false);
  const [locationUpdated, setUpdated] = useState<boolean>(false);

  const updateAddress = (e: any) => {
    e.preventDefault();
    setCurrLocation({ lat: currCoords.lat, long: currCoords.long });
    setUpdated(true);
  };

  const getCurrentPosition = () => {
    if (navigator.geolocation) {
      setShowLoad(true);
      navigator.geolocation.getCurrentPosition(function (position) {
        setCoords({ lat: position.coords.latitude.toString(), long: position.coords.longitude.toString() })
      });
    } else {
      alert("Sorry, your browser does not support HTML5 geolocation.");
    }
  };

  const convertToAddress = (): void => {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${currCoords.lat},${currCoords.long}&key=${process.env.NEXT_PUBLIC_GOOGLE_API}`;
    axios.get(url)
      .then((res) => {
        const address = res.data.results[0].formatted_address;
        setLocationInput(address);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    if (currCoords.long.length, currCoords.lat.length) {
      setShowLoad(false);
      convertToAddress();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currCoords]);

  const handleSelect = async (value: string) => {
    const results = await geocodeByAddress(value);
    setLocationInput(value);
    const latLng = await getLatLng(results[0]);
    setCoords({ lat: latLng.lat.toString(), long: latLng.lng.toString() });
  }

  useEffect(() => {
    if (locationUpdated) {
      setTimeout(() => {
        setUpdated(false);
      }, 3000)
    }
  }, [locationUpdated])

  return (
    <div>
      <br />
      <section className={styles.container}>
        <PlacesAutocomplete
          value={locationInput}
          onChange={setLocationInput}
          onSelect={handleSelect} >
          {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
            <div className={styles.inputDiv}>
              <span className={styles.inputGroup}>
                <label>Update Location</label>
                <div className={styles.inputTop}>
                  <div className={styles.inputRow}>
                    <div className={styles.inputRowInner}>
                      <input className={styles.input} {...getInputProps({ label: "Update Address" })} value={locationInput} />
                      <CurrentLocation getCurrentPosition={getCurrentPosition} />
                    </div>
                  </div>
                  <Button className={styles.updateBtn} variant="outlined" type="submit" onClick={updateAddress}>Update</Button>
                </div>
              </span>
              {loading ? <div>...loading</div> : null}
              <div className={styles.suggestions}>
                {suggestions.map((suggestion) => {
                  const style = {
                    backgroundColor: suggestion.active ? "#76b1c9" : "#fff",
                    border: "0.5px solid #a7a7a79d",
                    padding: "3px",
                    width: "100%",
                    innerWidth: "300px",
                    cursor: "pointer",
                  }

                  return (
                    <div {...getSuggestionItemProps(suggestion, { style })} key={suggestion.description}>{suggestion.description}</div>
                  )
                })}
              </div>
            </div>
          )}
        </PlacesAutocomplete>
      </section>
      <div className={styles.messagesDiv}>
        {locationUpdated ? <div className={styles.message}>Location successfully updated!</div> : null}
        {showLoad ? <div className={styles.message}>Finding current location...</div> : null}
      </div>
    </div >
  );
};

export default Location;