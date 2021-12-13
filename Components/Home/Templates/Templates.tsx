import React, { useContext } from "react";
import CreateTemplate from "./CreateTemplate";
import styles from "../../../styles/Home/Templates.module.css";
import { Card, Button } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import { MunchContext } from '../../Contexts/MunchContext';

interface Coords {
  lat: string;
  long: string;
}

interface Props {
  currChoices: string[];
  setCurrChoices: Function;
  setSelectedTemplate: Function;
}

const Templates: React.FC<Props> = ({
  currChoices,
  setCurrChoices,
  setSelectedTemplate,
}) => {
  const { isLoggedIn, setCoords, tempTemplates } = useContext(MunchContext);

  const selectTemplate = (e: any) => {
    e.preventDefault();
    const templateName = e.target.innerHTML;
    let newChoices: any = tempTemplates.filter(
      (each: any) => each.name === templateName
    );
    setCurrChoices(newChoices[0].choices);
    setCoords(newChoices[0].location);
    setSelectedTemplate(newChoices[0].name);
  };

  const noTemplate = (e: any) => {
    e.preventDefault();
    setSelectedTemplate('');
    setCurrChoices(['', '', '', '', '', '']);
    setCoords({ lat: '', long: '' });
  };

  return (
    <Card className={styles.container}>
      <div className={styles.innerContainer}>
        <h2>My Templates</h2>
        {isLoggedIn ? (
          <div className={styles.templateColumn}>
            {tempTemplates.length ? (
              <>
                <div
                  className={styles.template}
                  onClick={(e: any) => noTemplate(e)}>
                  No template
                </div>
                {tempTemplates.map((temp: any) => (
                  <div
                    key={temp.name}
                    className={styles.template}
                    onClick={(e: any) => selectTemplate(e)}
                  >
                    {temp.name}
                  </div>
                ))}
              </>
            ) : (
              <div>No templates! Create a new template below</div>
            )}
            <CreateTemplate currChoices={currChoices} />
          </div>
        ) : (
          <div>
            <p>Login to create and use templates.</p>
            <Button>
              <div className={styles.loginText}>Login with Google</div>
              <GoogleIcon />
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
};

export default Templates;
