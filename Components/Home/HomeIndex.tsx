import React, { useEffect, useState, useContext } from "react";
import Form from "./Form/Form";
import Templates from "./Templates/Templates";
import styles from "../../styles/Home/Home.module.css";
import { templates } from "./dummyData";
import { MunchContext } from "../Contexts/MunchContext";

// interface Coords {
//   lat: string;
//   long: string;
// }

const Home: React.FC = () => {
  // const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
  // const [currLocation, setCurrLocation] = useState<string>('');
  // const [currCoords, setCoords] = useState<Coords>({ lat: '', long: '' });
  // const [tempTemplates, setTempTemplates] = useState<any>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');
  const [currChoices, setCurrChoices] = useState<string[]>([]);

  const {
    setTempTemplates,
  } = useContext(MunchContext);

  useEffect(() => {
    setTempTemplates(templates);
  }, []);

  return (
    <div className={styles.container}>
      {/* {isLoggedIn ? <button onClick={() => setIsLoggedIn(false)}>Log out</button> : <button onClick={() => setIsLoggedIn(true)}>Log in</button>} */}
      <div className={styles.findContainer}>
        <Templates
          currChoices={currChoices}
          setCurrChoices={setCurrChoices}
          setSelectedTemplate={setSelectedTemplate}
        />
        <Form
          currChoices={currChoices}
          setCurrChoices={setCurrChoices}
          selectedTemplate={selectedTemplate}
        />
      </div>
    </div>
  );
};

export default Home;
