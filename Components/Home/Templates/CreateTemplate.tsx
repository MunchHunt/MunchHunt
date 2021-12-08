import React, { useState } from 'react';
import { TextField, Button } from "@mui/material";
import styles from '../../../styles/Home/Templates.module.css';

interface Coords {
  lat: string;
  long: string;
}

interface Props {
  tempTemplates: any;
  setTempTemplates: Function;
  currChoices: string[];
  currCoords: Coords;
}

const CreateTemplate: React.FC<Props> = ({ tempTemplates, setTempTemplates, currChoices, currCoords }) => {
  const [typed, setTyped] = useState<string>('');
  const [isValid, setIsValid] = useState<boolean>(true);

  const changeHandler = (e: any): void => {
    e.preventDefault();
    setTyped(e.target.value);
  };

  const validator = (): boolean => {
    for (let i = 0; i < tempTemplates.length; i++) {
      if (tempTemplates[i].name.toLowerCase() === typed.toLowerCase()) {
        setIsValid(false);
        return false;
      }
    }

    setIsValid(true);
    return true;
  };


  const addTemplate = (e: any): void => {
    e.preventDefault();
    if (validator()) {
      let temp: any = tempTemplates.slice(0);
      let data = {
        name: typed,
        location: currCoords,
        choices: currChoices,
      }
      temp.push(data);
      setTempTemplates(temp);
      setTyped('');
    }
  };


  return (
    <div>
      <h3>Create Template</h3>
      <form onSubmit={(e: any) => addTemplate(e)}>
        {isValid ? (
          <TextField className={styles.inputField} type="text" label="Template name" value={typed} autoComplete="off" onChange={(e: any) => changeHandler(e)} />
        ) : (
          <TextField error className={styles.inputField} type="text" label="Template name" value={typed} helperText="Template name already exists." autoComplete="off" onChange={(e: any) => changeHandler(e)} />
        )}
        <Button className={styles.createBtn} variant="contained" onClick={(e: any) => addTemplate(e)}>Create</Button>
      </form>
    </div >
  );
};

export default CreateTemplate;