/* eslint-disable @next/next/no-sync-scripts */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../../../styles/Home/Location.module.css';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from 'react-places-autocomplete';

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
  const [long, setLong] = useState<string>('');
  const [lat, setLat] = useState<string>('');
  const [showLoad, setShowLoad] = useState<boolean>(false);
  const [locationUpdated, setUpdated] = useState<boolean>(false);

  const updateAddress = (e: any) => {
    e.preventDefault();
    setCurrLocation({ lat: lat, long: long });
    setUpdated(true);
  };

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
        const address = res.data.results[0].formatted_address;
        setLocationInput(address);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    if (currCoords) {
      setLat(currCoords.lat);
      setLong(currCoords.long);
    }
  }, [currCoords])

  useEffect(() => {
    if (long.length, lat.length) {
      setShowLoad(false);
      convertToAddress();
      setCoords({ lat: lat, long: long });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [long, lat]);

  const handleSelect = async (value: string) => {
    const results = await geocodeByAddress(value);
    setLocationInput(value);
    const latLng = await getLatLng(results[0]);
    setLong(latLng.lng.toString());
    setLat(latLng.lat.toString());
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
            <div className={styles.inputDiv} id="location-input-section">
              <input className={styles.input} {...getInputProps({ placeholder: "Enter Your Address" })} defaultValue={locationInput} />
              <div>
                {loading ? <div>...loading</div> : null}
                {suggestions.map((suggestion) => {
                  const style = {
                    backgroundColor: suggestion.active ? "#76b1c9" : "#fff",
                    border: "0.5px solid #a7a7a79d",
                    padding: "3px",
                    width: "315px",
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
        <input type="submit" onClick={updateAddress} value="Update" />
      </section>
      <button className={styles.currLocationBtn} onClick={getCurrentPosition}>Current location</button>
      {locationUpdated ? <h3>Location successfully updated!</h3> : null}
      {showLoad ? <h3>Loading...</h3> : null}
    </div >
  );
};

export default Location;