import React, { useEffect, useState } from 'react';
import Form from './Form/Form';
import Templates from './Templates/Templates';
import styles from '../../styles/Home/Home.module.css'
import { templates } from './dummyData';

interface Coords {
  lat: string;
  long: string;
}

const Home: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');
  const [currLocation, setCurrLocation] = useState<string>('');
  const [currCoords, setCoords] = useState<Coords>({ lat: '', long: '' });
  const [currChoices, setCurrChoices] = useState<string[]>([]);
  const [tempTemplates, setTempTemplates] = useState<any>([]);

  useEffect(() => {
    setTempTemplates(templates);
  }, [])

  return (
    <div className={styles.container}>
      {isLoggedIn ? <button onClick={() => setIsLoggedIn(false)}>Log out</button> : <button onClick={() => setIsLoggedIn(true)}>Log in</button>}
      <div className={styles.findContainer}>
        <Templates isLoggedIn={isLoggedIn} currChoices={currChoices} setCurrChoices={setCurrChoices} setCoords={setCoords} tempTemplates={tempTemplates} setTempTemplates={setTempTemplates} currCoords={currCoords} setSelectedTemplate={setSelectedTemplate} />
        <Form currLocation={currLocation} setCurrLocation={setCurrLocation} currChoices={currChoices} setCurrChoices={setCurrChoices} currCoords={currCoords} setCoords={setCoords} selectedTemplate={selectedTemplate} />
      </div>
    </div>
  );
};

export default Home;