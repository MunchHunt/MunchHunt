import React from 'react';
import styles from '../../styles/Landing/Location.module.css';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from 'react-places-autocomplete';
import { Button, TextField } from '@mui/material';
import Link from 'next/link';

const Location: React.FC = () => {
  const goFind = () => {
    setTimeout(() => {
      window.open('/find', '_self')
    }, 500)
  }
  return (
    <div className={styles.inputContainer}>
      <div className={styles.title}>Location</div>
      <form className={styles.formContainer}>
        <TextField variant="outlined" className={styles.formInput} type="text" placeholder='Enter location' />
        <Button
          variant="contained"
          className={styles.submitBtn}
          onClick={goFind}>
          Start
        </Button>
      </form>
      {/* <PlacesAutocomplete
        // value={locationInput}
        // onChange={setLocationInput}
        onSelect={handleSelect} >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div className={styles.inputRow}>
            <div className={styles.inputRowInner}>
              <input className={styles.input} {...getInputProps({ label: "Update Address" })} value={locationInput} />
              <CurrentLocation getCurrentPosition={getCurrentPosition} />
            </div>
          </div>
        )}
      </PlacesAutocomplete> */}
    </div>
  );
};

export default Location;