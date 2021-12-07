import React, { useState } from "react";
import CreateTemplate from "./CreateTemplate";
import styles from '../../../styles/Home/Templates.module.css';

interface Props {
  isLoggedIn: boolean;
}

const Templates: React.FC<Props> = ({ isLoggedIn }) => {
  const [tempTemplates, setTempTemplates] = useState<string[]>([
    "Date night",
    "Family",
    "Friends",
    "Munchies",
  ]);

  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <h3>My Templates</h3>
        {isLoggedIn ? (
          <div>
            {tempTemplates.length ? tempTemplates.map(temp => <div key={temp}>{temp}</div>) :
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
