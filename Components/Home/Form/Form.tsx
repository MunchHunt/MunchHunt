import React, { useEffect, useState, useRef, useContext } from "react";
import styles from "../../../styles/Home/Form.module.css";
import Location from "./Location";
import { TextField, Button, Card, CircularProgress, Box, Alert, IconButton, Collapse } from "@mui/material";
import { MunchContext } from "../../Contexts/MunchContext";
import { choices } from './Choices';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import CloseIcon from '@mui/icons-material/Close';
import AreYouSure from './AreYouSure';
import Router from 'next/router'
import TemplatesDrawer from "../Templates/Mobile/TemplatesDrawer";

interface Props {
  selectedTemplate: string;
  setSelectedTemplate: Function;
}

const Form: React.FC<Props> = ({ selectedTemplate, setSelectedTemplate }) => {
  const [input1, setInput1] = useState<string>("");
  const [input2, setInput2] = useState<string>("");
  const [input3, setInput3] = useState<string>("");
  const [input4, setInput4] = useState<string>("");
  const [input5, setInput5] = useState<string>("");
  const [input6, setInput6] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [invalidLocation, setInvalidLocation] = useState<boolean>(false);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [showUpdating, setShowUpdating] = useState<boolean>(false);
  const [showSpinner, setShowSpinner] = useState<boolean>(false);
  const [openInvalid, setOpenInvalid] = useState<boolean>(false);

  const {
    result,
    setResult,
    currAddress,
    userTemplates,
    setUserTemplates,
    currCoords,
    currChoices,
    setCurrChoices,
    isDrawerOpen,
    setIsDrawerOpen
  } = useContext(MunchContext);

  useEffect(() => {
    if (currChoices.length) {
      setInput1(currChoices[0]);
      setInput2(currChoices[1]);
      setInput3(currChoices[2]);
      setInput4(currChoices[3]);
      setInput5(currChoices[4]);
      setInput6(currChoices[5]);
    }
  }, [currChoices]);

  useEffect(() => {
    setCurrChoices([input1, input2, input3, input4, input5, input6]);
  }, [input1, input2, input3, input4, input5, input6])

  const choicesAreValid = (arr: string[]): boolean => {
    if (arr.length) {
      return true;
    } else {
      setOpenInvalid(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return false;
    }
  };

  const locationIsValid = (): boolean => {
    if (currAddress.length) {
      setInvalidLocation(false);
      return true;
    } else {
      setInvalidLocation(true);
      setOpenInvalid(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return false;
    }
  };

  const submitHandler = (e: any) => {
    e.preventDefault();
    let arr = [
      input1,
      input2,
      input3,
      input4,
      input5,
      input6
    ];
    arr = arr.filter((input) => input !== "");
    if (choicesAreValid(arr) && locationIsValid()) {
      setOpenInvalid(false);
      let randIndex = Math.floor(Math.random() * arr.length);
      setResult(arr[randIndex]!);
      setShowSpinner(true);
    }
  };

  const randomAutoFill = () => {
    setLoading(true);
    setSelectedTemplate('');

    setTimeout(() => {
      setLoading(false);
    }, 2000);

    setTimeout(() => {
      let index = Math.floor(Math.random() * choices.length);
      setInput1(choices[index]);
      choices.splice(choices.indexOf(choices[index]), 1);

      index = Math.floor(Math.random() * choices.length);
      setInput2(choices[index]);
      choices.splice(choices.indexOf(choices[index]), 1);

      index = Math.floor(Math.random() * choices.length);
      setInput3(choices[index]);
      choices.splice(choices.indexOf(choices[index]), 1);

      index = Math.floor(Math.random() * choices.length);
      setInput4(choices[index]);
      choices.splice(choices.indexOf(choices[index]), 1);

      index = Math.floor(Math.random() * choices.length);
      setInput5(choices[index]);
      choices.splice(choices.indexOf(choices[index]), 1);

      index = Math.floor(Math.random() * choices.length);
      setInput6(choices[index]);
      choices.splice(choices.indexOf(choices[index]), 1);
    }, 2000);
  };

  useEffect(() => {
    if (result && result !== "") {
      Router.push(`/results?result=${result}&lat=${currCoords.lat}&long=${currCoords.long}`);
      setResult('');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result]);

  const getIndex = (): number => {
    for (let i = 0; i < userTemplates.length; i++) {
      if (userTemplates[i].name === selectedTemplate) {
        return i;
      }
    }
    return -1;
  }

  const updateTemplate = (e: any): void => {
    e.preventDefault();
    let index = getIndex();
    let temp: any = userTemplates.slice(0);
    let data = {
      name: selectedTemplate,
      location: currCoords,
      choices: [
        input1,
        input2,
        input3,
        input4,
        input5,
        input6
      ],
    }
    data.choices = data.choices.sort((a, b) => (b.length - a.length));
    temp[index] = data;
    console.log('Form:', data.choices);
    setCurrChoices(data.choices);
    setUserTemplates(temp);
    setShowUpdating(true);
  };

  useEffect(() => {
    if (showUpdating) {
      setTimeout(() => {
        setShowUpdating(false);
      }, 2000)
    }
  }, [showUpdating])

  const areYouSure = (e: any): void => {
    e.preventDefault();
    setOpenDialog(true);
  }

  const deleteTemplate = (): void => {
    let index = getIndex();
    let temp = userTemplates.slice(0);
    temp.splice(index, 1);
    setUserTemplates(temp);
    setSelectedTemplate('');
  };

  const openTemplates = () => {
    setIsDrawerOpen(true);
  };

  return (
    <Card className={styles.container}>
      <Box sx={{ width: '100%' }}>
        <Collapse in={openInvalid}>
          <Alert
            severity="warning"
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setOpenInvalid(false);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
            sx={{ mb: 2 }}
          >
            Please check inputs below and try again.
          </Alert>
        </Collapse>
      </Box>
      <AreYouSure open={openDialog} setOpenDialog={setOpenDialog} deleteTemplate={deleteTemplate} />
      <div className={styles.innerContainer}>
        <div className={styles.topText}>
          <div className={styles.leftSide}>
            {selectedTemplate.length ? (
              <div className={styles.templateTitleDiv}>
                <h3 className={styles.formTitle}>Template: {selectedTemplate}</h3>
                <div className={styles.templateBtnDiv}>
                  <Button size="small" variant="outlined" className={styles.btn} onClick={(e: any) => updateTemplate(e)}>Update</Button>
                  <Button size="small" variant="outlined" className={styles.btn} onClick={(e: any) => areYouSure(e)}>Delete</Button>
                </div>
                {showUpdating ? <div className={styles.updatingMsg}>Updated!</div> : null}
              </div>
            ) : (
              <h3 className={styles.formTitle}>Lets get started!</h3>
            )}
            <div className={styles.desc}>
              List up to 6 possible cuisines or categories you would want to eat.
              (At least 1 required)
            </div>
          </div>
          <Button variant="contained" className={styles.templatesBtn} onClick={(e: any) => { openTemplates() }}>Templates</Button>
        </div>
        <Button
          className={styles.chooseBtn}
          variant="contained"
          onClick={randomAutoFill}
        >
          Can{"'"}t Decide? Let us decide
          <ShuffleIcon className={styles.shuffle} />
        </Button>
        {loading ? (
          <div className={styles.loading}>
            <div className={styles.loadingText}>
              Auto-filling with random choices
            </div>
            <CircularProgress size={20} />
          </div>
        ) : null}
        <div className={styles.formContainer}>
          <form className={styles.form} onSubmit={(e: any) => submitHandler(e)}>
            <TextField
              autoComplete="off"
              className={styles.inputField}
              placeholder="Enter cuisine"
              value={input1}
              onChange={(e: any) => setInput1(e.target.value)}
              variant="outlined"
            />
            <TextField
              autoComplete="off"
              className={styles.inputField}
              placeholder="Enter cuisine"
              value={input2}
              onChange={(e: any) => setInput2(e.target.value)}
              variant="outlined"
            />
            <TextField
              autoComplete="off"
              className={styles.inputField}
              placeholder="Enter cuisine"
              value={input3}
              onChange={(e: any) => setInput3(e.target.value)}
              variant="outlined"
            />
            <TextField
              autoComplete="off"
              className={styles.inputField}
              placeholder="Enter cuisine"
              value={input4}
              onChange={(e: any) => setInput4(e.target.value)}
              variant="outlined"
            />
            <TextField
              autoComplete="off"
              className={styles.inputField}
              placeholder="Enter cuisine"
              value={input5}
              onChange={(e: any) => setInput5(e.target.value)}
              variant="outlined"
            />
            <TextField
              autoComplete="off"
              className={styles.inputField}
              placeholder="Enter cuisine"
              value={input6}
              onChange={(e: any) => setInput6(e.target.value)}
              variant="outlined"
            />
          </form>
          <br />
        </div>
        <label className={styles.updateLabel}>
          Update Location
        </label>
        <Location
          invalidLocation={invalidLocation}
          setInvalidLocation={setInvalidLocation}
        />
        <br />
        <div className={styles.submitDiv}>
          <Button
            className={styles.findBtn}
            variant="contained"
            type="submit"
            onClick={(e: any) => submitHandler(e)}
          >
            Find!
            <RestaurantIcon className={styles.icon} />
          </Button>
          {showSpinner ? <CircularProgress size={20} className={styles.spinner} /> : null}
        </div>
      </div>
      <TemplatesDrawer isDrawerOpen={isDrawerOpen} setIsDrawerOpen={setIsDrawerOpen} selectedTemplate={selectedTemplate} setSelectedTemplate={setSelectedTemplate} />
    </Card>
  );
};

export default Form;
