import React, { useState } from 'react';

interface Props {
  currLocation: string;
  setCurrLocation: Function;
}
const Location: React.FC<Props> = ({ currLocation, setCurrLocation }) => {
  const [locationInput, setLocationInput] = useState<string>("");

  const getCurrentPosition = () => {

  };

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
    </div>
  );
};

export default Location;