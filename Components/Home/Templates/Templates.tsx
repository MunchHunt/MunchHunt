import React, { useEffect, useState } from "react";
import CreateTemplate from "./CreateTemplate";
import styles from '../../../styles/Home/Templates.module.css';
import { templates } from '../dummyData';

interface Props {
  isLoggedIn: boolean;
}

const Templates: React.FC<Props> = ({ isLoggedIn }) => {
  const [tempTemplates, setTempTemplates] = useState<any>([]);

  useEffect(() => {
    setTempTemplates(templates);
  }, [])

  const selectTemplate = (e: any) => {
    e.preventDefault();
    console.log(e.target.innerHTML)
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
            <CreateTemplate tempTemplates={tempTemplates} setTempTemplates={setTempTemplates} />
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
