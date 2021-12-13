import React, { useState } from 'react';
import styles from '../../styles/Landing/Landing.module.css';
import Image from 'next/Image';

import Location from '../Home/Form/Location';

const myLoader = ({ src, width, quality }: any) => {
  return `https://i.imgur.com/${src}?w=${width}&q=${quality || 75}`
}

const Landing: React.FC = () => {
  const [invalidLocation, setInvalidLocation] = useState<boolean>(false);

  return (
    <div className={styles.container}>
      <div className={styles.contentContainer}>
        <div className={styles.top}>
          <div className={styles.title}>Munch Hunt</div>
          <Image
            loader={myLoader}
            src="/Y8KaQBX.png"
            alt="Munch Hunt logo"
            width={300}
            height={300}
            className={styles.logo}
          />
        </div>
        <div className={styles.mid}>Struggling to choose a restaurant? Date night? Just hungry? <br /> Lets find the right place for you.</div>
        <div className={styles.bottom}>
          <Location
            invalidLocation={invalidLocation}
            setInvalidLocation={setInvalidLocation}
          />
        </div>
      </div>
    </div>
  );
};

export default Landing;