/* eslint-disable @next/next/no-sync-scripts */
import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import styles from '../../../styles/Home/Location.module.css';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from 'react-places-autocomplete';
import { CircularProgress, List, ListItem, Divider } from '@mui/material';
import CurrentLocation from './CurrentLocation';
import { MunchContext } from '../../Contexts/MunchContext';

interface Props {
  invalidLocation: boolean;
  setInvalidLocation: Function;
}

const Location: React.FC<Props> = ({ invalidLocation, setInvalidLocation }) => {
  const [locationInput, setLocationInput] = useState<string>("");
  const [showLoad, setShowLoad] = useState<boolean>(false);
  const [locationUpdated, setUpdated] = useState<boolean>(false);
  const { currAddress, setCurrAddress, currCoords, setCoords } = useContext(MunchContext);

  const getCurrentPosition = (): void => {
    if (navigator.geolocation) {
      setShowLoad(true);
      navigator.geolocation.getCurrentPosition(function (position) {
        setCoords({ lat: position.coords.latitude.toString(), long: position.coords.longitude.toString() })
      });
      setInvalidLocation(false);
      setTimeout(() => {
        setUpdated(true);
      }, 4000)
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
    setInvalidLocation(false);
    setUpdated(true);
  }

  useEffect(() => {
    if (locationUpdated) {
      setTimeout(() => {
        setUpdated(false);
      }, 3000)
    }
  }, [locationUpdated])

  useEffect(() => {
    if (locationInput.length) {
      setCurrAddress(locationInput);
      console.log('update address')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locationInput]);

  useEffect(() => {
    if (currAddress.length) {
      setLocationInput(currAddress);
      console.log(currAddress)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.locationContainer}>
      <br />
      <section className={styles.container}>
        <PlacesAutocomplete
          value={locationInput}
          onChange={setLocationInput}
          onSelect={handleSelect} >
          {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
            <div className={styles.inputDiv}>
              <span className={styles.inputGroup}>
                {!invalidLocation ? (
                  <div className={styles.inputRow}>
                    <div className={styles.inputRowInner}>
                      <input className={styles.input} {...getInputProps({ label: "Update Address" })} placeholder="Enter address or zip code" value={locationInput} />
                      <CurrentLocation getCurrentPosition={getCurrentPosition} />
                    </div>
                  </div>
                ) : (
                  <div className={styles.inputRowInvalid}>
                    <div className={styles.inputRowInner}>
                      <input className={styles.input} {...getInputProps({ label: "Update Address" })} value={locationInput} />
                      <CurrentLocation getCurrentPosition={getCurrentPosition} />
                    </div>
                  </div>
                )}
              </span>
              <div className={styles.messagesDiv}>
                {showLoad ? (
                  <div className={styles.message}>
                    <div className={styles.text}>Finding current location</div>
                    <CircularProgress size={20} />
                  </div>
                ) : null}
                {locationUpdated ? <div className={styles.message}>Location successfully updated!</div> : null}
              </div>
              <div className={styles.suggestionBox}>
                <List className={styles.suggestions}>
                  {suggestions.map((suggestion) => {
                    const style = {
                      backgroundColor: suggestion.active ? '#f3f3f3' : '#fff',
                      cursor: "pointer",
                    }
                    return (
                      <div key={suggestion.description} className={styles.suggestion}>
                        <ListItem {...getSuggestionItemProps(suggestion, { style })}>{suggestion.description}</ListItem>
                        {/* <Divider /> */}
                      </div>
                    )
                  })}
                </List>
              </div>
            </div>
          )}
        </PlacesAutocomplete>
      </section>

    </div >
  );
};

export default Location;