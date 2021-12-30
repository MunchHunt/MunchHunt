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
  const { userTemplates, setUserTemplates, currCoords, setIsDrawerOpen } = useContext(MunchContext);
  const [invalidMsg, setInvalidMsg] = useState<string>('Invalid Entry');

  const changeHandler = (e: any): void => {
    e.preventDefault();
    setTyped(e.target.value);
  };

  const validator = (): boolean => {
    for (let i = 0; i < userTemplates.length; i++) {
      if (userTemplates[i].name.toLowerCase() === typed.toLowerCase()) {
        setIsValid(false);
        setInvalidMsg('Template name already exists.')
        return false;
      }
    }
    if (typed === '') {
      setIsValid(false);
      setInvalidMsg('Invalid template name.');
      return false;
    }
    if (currCoords === { lat: '', long: '' }) {
      setIsValid(false);
      setInvalidMsg('Location not set.');
      return false;
    }
    setIsValid(true);
    return true;
  };

  useEffect(() => {
    if (!isValid) {
      setTimeout(() => {
        setIsValid(true);
      }, 3500)
    }
  }, [isValid])

  const addTemplate = (e: any): void => {
    e.preventDefault();
    if (validator()) {
      let temp: any = userTemplates.slice(0);
      // console.log(currChoices);
      let data = {
        name: typed,
        location: currCoords,
        choices: currChoices,
      }
      temp.push(data);
      setUserTemplates(temp);
      setSelectedTemplate(typed);
      setTyped('');
      setIsDrawerOpen(false);
    }
  };

  useEffect(() => {
    for (let i = 0; i < userTemplates.length; i++) {
      let template = document.getElementById('template' + i.toString());
      template?.classList.remove('activeTemplate');
    }
    let template = document.getElementById('template' + (userTemplates.length - 1).toString());
    template?.classList.add('activeTemplate');
  }, [userTemplates])

  return (
    <div className={styles.createTemplate}>
      <h3 className={styles.createTitle}>Create Template</h3>
      <form onSubmit={(e: any) => addTemplate(e)}>
        {isValid ? (
          <TextField className={styles.inputField} type="text" label="Template name" value={typed} autoComplete="off" onChange={(e: any) => changeHandler(e)} />
        ) : (
          <TextField error className={styles.inputField} type="text" label="Template name" value={typed} helperText={invalidMsg} autoComplete="off" onChange={(e: any) => changeHandler(e)} />
        )}
        <Button className={styles.createBtn} variant="contained" onClick={(e: any) => addTemplate(e)}>Create</Button>
      </form>
    </div >
  );
};

export default CreateTemplate;