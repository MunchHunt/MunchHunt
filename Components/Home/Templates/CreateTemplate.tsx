import React, { useState, useRef } from 'react';
import { TextField, Button } from "@mui/material";
import styles from '../../../styles/Home/Templates.module.css';

interface Coords {
  lat: string;
  long: string;
}

interface Props {
  tempTemplates: string[];
  setTempTemplates: Function;
  currChoices: string[];
  currCoords: Coords;
}

const CreateTemplate: React.FC<Props> = ({ tempTemplates, setTempTemplates, currChoices, currCoords }) => {
  const [typed, setTyped] = useState<string>('');
  const formRef = useRef<any>(null);

  const changeHandler = (e: any): void => {
    e.preventDefault();
    setTyped(e.target.value);
  };

  const validator = (): boolean => {
    if (tempTemplates.includes(typed)) {
      return false;
    }
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
    } else {
      window.alert('Template name already exists.');
    }
    formRef.current?.reset();
  };


  return (
    <div>
      <h3>Create Template</h3>
      <form ref={formRef} onSubmit={(e: any) => addTemplate(e)}>
        <TextField className={styles.inputField} type="text" placeholder="Enter template name" onChange={(e: any) => changeHandler(e)} />
        <Button variant="contained" onClick={(e: any) => addTemplate(e)}>Create</Button>
      </form>
    </div >
  );
};

export default CreateTemplate;