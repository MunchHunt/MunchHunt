import React, { useState, useContext } from "react";
import CreateTemplate from "./CreateTemplate";
import styles from "../../../styles/Home/Templates.module.css";
import { Card, Button } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import { MunchContext } from '../../Contexts/MunchContext';

interface Props {
  currChoices: string[];
  setCurrChoices: Function;
  selectedTemplate: string;
  setSelectedTemplate: Function;
}

const Templates: React.FC<Props> = ({
  currChoices,
  setCurrChoices,
  selectedTemplate,
  setSelectedTemplate,
}) => {
  const { isLoggedIn, setCoords, tempTemplates } = useContext(MunchContext);
  const [active, setActive] = useState<string>('');

  const selectTemplate = (e: any, i: number) => {
    e.preventDefault();
    const templateName = e.target.innerHTML;
    if (templateName === 'No template') {
      setSelectedTemplate('');
      setCurrChoices(['', '', '', '', '', '']);
      setCoords({ lat: '', long: '' });
      let template = document.getElementById(active);
      template?.classList.remove('activeTemplate');
    } else {
      let newChoices: any = tempTemplates.filter(
        (each: any) => each.name === templateName
      );
      setCurrChoices(newChoices[0].choices);
      setCoords(newChoices[0].location);
      setSelectedTemplate(newChoices[0].name);

      if (selectedTemplate.length) {
        let prev = document.getElementById(active);
        prev?.classList.remove('activeTemplate');
      }
      setActive('template' + i.toString());
      let template = document.getElementById('template' + i.toString());
      template?.classList.add('activeTemplate');
      setSelectedTemplate(templateName);
    }
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
                  onClick={(e: any) => selectTemplate(e, 1)}
                  id='noTemplate'
                >

                  No template
                </div>
                {tempTemplates.map((temp: any, i: number) => (
                  <div
                    key={temp.name}
                    className={styles.template}
                    onClick={(e: any) => selectTemplate(e, i)}
                    id={'template' + i.toString()}
                  >
                    {temp.name}
                  </div>
                ))}
              </>
            ) : (
              <div>No templates! Create a new template below</div>
            )}
            <CreateTemplate currChoices={currChoices} setSelectedTemplate={setSelectedTemplate} />
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
