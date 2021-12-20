import React, { useEffect, useState, useContext } from "react";
import Form from "./Form/Form";
import Templates from "./Templates/Templates";
import styles from "../../styles/Home/Home.module.css";
import { templates } from "./dummyData";
import { MunchContext } from "../Contexts/MunchContext";

const Home: React.FC = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');

  const {
    setTempTemplates,
  } = useContext(MunchContext);

  useEffect(() => {
    setTempTemplates(templates);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.container}>
      {/* {isLoggedIn ? <button onClick={() => setIsLoggedIn(false)}>Log out</button> : <button onClick={() => setIsLoggedIn(true)}>Log in</button>} */}
      <div className={styles.findContainer}>
        <Templates
          selectedTemplate={selectedTemplate}
          setSelectedTemplate={setSelectedTemplate}
        />
        <Form
          selectedTemplate={selectedTemplate}
          setSelectedTemplate={setSelectedTemplate}
        />
      </div>
    </div>
  );
};

export default Home;
