import React, { useEffect, useState } from 'react';

interface Props {
  currLocation: string;
  setCurrLocation: Function;
}

const Location: React.FC<Props> = ({ currLocation, setCurrLocation }) => {
  const [locationInput, setLocationInput] = useState<string>("");
  const [long, setLong] = useState<string>('');
  const [lat, setLat] = useState<string>('');
  const [showLoad, setShowLoad] = useState<boolean>(false);

  const getCurrentPosition = () => {
    if (long.length === 0) {
      setShowLoad(true);
    }
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        setLong(position.coords.longitude.toString());
        setLat(position.coords.latitude.toString());
      });
    } else {
      alert("Sorry, your browser does not support HTML5 geolocation.");
    }
  };

  useEffect(() => {
    if (long.length) {
      setShowLoad(false);
    }
  }, [long]);

  return (
    <div>
      <label>
        Change location
        <input
          type="text"
          placeholder="Enter location"
          defaultValue={currLocation}
          onChange={(e: any) => {
            setLocationInput(e.target.value);
          }}
        />
      </label>
      <button onClick={getCurrentPosition}>Current Location</button>
      {showLoad ? <h3>Loading...</h3> : null}
      <div>{long}</div>
      <div>{lat}</div>
    </div>
  );
};

export default Location;