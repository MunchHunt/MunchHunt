import React, { useState, useContext, useEffect } from 'react';
import { TextField, Button } from "@mui/material";
import styles from '../../../styles/Home/Templates.module.css';
import { MunchContext } from '../../Contexts/MunchContext';

interface Props {
  currChoices: string[];
  setSelectedTemplate: Function;
}

const CreateTemplate: React.FC<Props> = ({ currChoices, setSelectedTemplate }) => {
  const [typed, setTyped] = useState<string>('');
  const [isValid, setIsValid] = useState<boolean>(true);
  const { tempTemplates, setTempTemplates, currCoords } = useContext(MunchContext);

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
    if (currCoords === { lat: '', long: '' } || typed === '' || currChoices.length < 1) {
      setIsValid(false);
      return false;
    }

    setIsValid(true);
    return true;
  };

  const addTemplate = (e: any): void => {
    e.preventDefault();
    if (validator()) {
      let temp: any = tempTemplates.slice(0);
      console.log(currChoices);
      let data = {
        name: typed,
        location: currCoords,
        choices: currChoices,
      }
      temp.push(data);
      setTempTemplates(temp);
      setSelectedTemplate(typed);
      setTyped('');
    }
  };

  return (
    <div className={styles.createTemplate}>
      <h3 className={styles.createTitle}>Create Template</h3>
      <form onSubmit={(e: any) => addTemplate(e)}>
        {isValid ? (
          <TextField className={styles.inputField} type="text" label="Template name" value={typed} autoComplete="off" onChange={(e: any) => changeHandler(e)} />
        ) : (
          <TextField error className={styles.inputField} type="text" label="Template name" value={typed} helperText="Invalid entry." autoComplete="off" onChange={(e: any) => changeHandler(e)} />
        )}
        <Button className={styles.createBtn} variant="contained" onClick={(e: any) => addTemplate(e)}>Create</Button>
      </form>
    </div >
  );
};

export default CreateTemplate;