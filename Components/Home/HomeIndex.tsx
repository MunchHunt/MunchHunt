import React, { useState } from 'react';
import Form from './Form/Form';
import Templates from './Templates/Templates';
import styles from '../../styles/Home/Home.module.css'

const Home: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
  const [currLocation, setCurrLocation] = useState<string>('');
  const [currChoices, setCurrChoices] = useState<string[]>();

  return (
    <div className={styles.container}>
      {isLoggedIn ? <button onClick={() => setIsLoggedIn(false)}>Log out</button> : <button onClick={() => setIsLoggedIn(true)}>Log in</button>}
      <div className={styles.findContainer}>
        <Templates isLoggedIn={isLoggedIn} />
        <Form currLocation={currLocation} setCurrLocation={setCurrLocation} />
      </div>
    </div>
  );
};

export default Home;