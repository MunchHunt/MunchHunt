import React, { useEffect, useState } from "react";
import CreateTemplate from "./CreateTemplate";
import styles from '../../../styles/Home/Templates.module.css';
// import { templates } from '../dummyData';

interface Coords {
  lat: string;
  long: string;
}

interface Props {
  isLoggedIn: boolean;
  currChoices: string[];
  setCurrChoices: Function;
  setCoords: Function;
  tempTemplates: any;
  setTempTemplates: Function;
  currCoords: Coords;
}

const Templates: React.FC<Props> = ({ isLoggedIn, currChoices, setCurrChoices, setCoords, tempTemplates, setTempTemplates, currCoords }) => {
  // const [tempTemplates, setTempTemplates] = useState<any>([]);

  // useEffect(() => {
  //   setTempTemplates(templates);
  // }, [])

  const selectTemplate = (e: any) => {
    e.preventDefault();
    const templateName = e.target.innerHTML;
    let newChoices = tempTemplates.filter((each: any) => each.name === templateName);
    setCurrChoices(newChoices[0].choices);
    setCoords(newChoices[0].location);
  };

  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <h3>My Templates</h3>
        {isLoggedIn ? (
          <div>
            {tempTemplates.length ? tempTemplates.map((temp: any) => (
              <div key={temp.name} onClick={(e: any) => selectTemplate(e)}>{temp.name}</div>
            )) :
              <div>No templates! Create a new template below</div>}
            <CreateTemplate tempTemplates={tempTemplates} setTempTemplates={setTempTemplates} currChoices={currChoices} currCoords={currCoords} />
          </div>
        ) : (
          <div>
            <p>Login to create and use templates.</p>
            <button>Login with Google</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Templates;
