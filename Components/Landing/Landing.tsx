import React, { useState } from 'react';
import styles from '../../styles/Landing/Landing.module.css';
import Image from 'next/Image';

import Location from '../Home/Form/Location';
import { Button } from '@mui/material';

const myLoader = ({ src, width, quality }: any) => {
  return `https://i.imgur.com/${src}?w=${width}&q=${quality || 75}`
}

const Landing: React.FC = () => {
  const [invalidLocation, setInvalidLocation] = useState<boolean>(false);

  return (
    <div className={styles.container}>
      <div className={styles.contentContainer}>
        <div className={styles.top}>
          <div className={styles.leftSide}>
            <div className={styles.title}>Munch Hunt</div>
            <div className={styles.desc}>Struggling to choose a restaurant? Date night? Just hungry? Lets find the right place for you.</div>
          </div>
          <div className={styles.logo}>
            <Image
              loader={myLoader}
              // src="/Y8KaQBX.png"
              src="/iqrmXmz.png"
              alt="Munch Hunt logo"
              width={800}
              height={800}
            />
          </div>
        </div>
        <div className={styles.bottom}>
          <div className={styles.start}>Get started now!</div>
          <label htmlFor="Location">Enter Location</label>
          <div className={styles.locationRow}>
            <Location
              invalidLocation={invalidLocation}
              setInvalidLocation={setInvalidLocation}
            />
            <Button className={styles.findBtn} variant="contained" onClick={() => { window.open('/find', '_self') }}>Start</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;