import React, { useEffect, useState, useRef, useContext } from "react";
import styles from "../../../styles/Home/Form.module.css";
import Location from "./Location";
import { TextField, Button, Card, CircularProgress } from "@mui/material";
import { MunchContext } from "../../Contexts/MunchContext";
import { choices } from './Choices';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import AreYouSure from './AreYouSure';

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

  const {
    result,
    setResult,
    currAddress,
    tempTemplates,
    setTempTemplates,
    currCoords,
    currChoices,
    setCurrChoices
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

  const choicesAreValid = (arr: string[]): boolean => {
    if (arr.length) {
      return true;
    } else {
      window.alert("No choices entered!");
      return false;
    }
  };

  const locationIsValid = (): boolean => {
    if (currAddress.length) {
      setInvalidLocation(false);
      return true;
    } else {
      setInvalidLocation(true);
      window.alert("No location entered!");
      return false;
    }
  };

  const submitHandler = (e: any) => {
    e.preventDefault();
    // updateChoices();
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
      setTimeout(() => {
        window.open(`/results?result=${result}&lat=${currCoords.lat}&long=${currCoords.long}`, "_self");
      }, 2000)
      console.log("Result:", result);
    }
  }, [result]);

  const getIndex = (): number => {
    for (let i = 0; i < tempTemplates.length; i++) {
      if (tempTemplates[i].name === selectedTemplate) {
        return i;
      }
    }
    return -1;
  }

  const updateTemplate = (e: any): void => {
    e.preventDefault();
    let index = getIndex();
    let temp: any = tempTemplates.slice(0);
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
    // console.log(data.choices);
    temp[index] = data;
    setCurrChoices(data.choices);
    setTempTemplates(temp);
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
    let temp = tempTemplates.slice(0);
    temp.splice(index, 1);
    setTempTemplates(temp);
    setSelectedTemplate('');
  };

  return (
    <Card className={styles.container}>
      <AreYouSure open={openDialog} setOpenDialog={setOpenDialog} deleteTemplate={deleteTemplate} />
      <div className={styles.innerContainer}>
        {selectedTemplate.length ? (
          <div className={styles.templateTitleDiv}>
            <h3 className={styles.formTitle}>Template: {selectedTemplate}</h3>
            <div className={styles.templateBtnDiv}>
              <Button size="small" variant="outlined" className={styles.btn} onClick={(e: any) => updateTemplate(e)}>Update Template</Button>
              <Button size="small" variant="outlined" className={styles.btn} onClick={(e: any) => areYouSure(e)}>Delete Template</Button>
            </div>
            {showUpdating ? <div className={styles.updatingMsg}>Updated!</div> : null}
          </div>
        ) : (
          <div className={styles.templateTitleDiv}>
            <h3 className={styles.formTitle}>Lets get started!</h3>
          </div>
        )}
        <div className={styles.desc}>
          List up to 6 possible cuisines or categories you would want to eat.
          (At least 1 required)
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
              // onChange={changeHandler}
              onChange={(e: any) => setInput1(e.target.value)}
              variant="outlined"
            />
            <TextField
              autoComplete="off"
              className={styles.inputField}
              placeholder="Enter cuisine"
              value={input2}
              // onChange={changeHandler}
              onChange={(e: any) => setInput2(e.target.value)}
              variant="outlined"
            />
            <TextField
              autoComplete="off"
              className={styles.inputField}
              placeholder="Enter cuisine"
              value={input3}
              // onChange={changeHandler}
              onChange={(e: any) => setInput3(e.target.value)}
              variant="outlined"
            />
            <TextField
              autoComplete="off"
              className={styles.inputField}
              placeholder="Enter cuisine"
              value={input4}
              // onChange={changeHandler}
              onChange={(e: any) => setInput4(e.target.value)}
              variant="outlined"
            />
            <TextField
              autoComplete="off"
              className={styles.inputField}
              placeholder="Enter cuisine"
              value={input5}
              // onChange={changeHandler}
              onChange={(e: any) => setInput5(e.target.value)}
              variant="outlined"
            />
            <TextField
              autoComplete="off"
              className={styles.inputField}
              placeholder="Enter cuisine"
              value={input6}
              // onChange={changeHandler}
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
    </Card>
  );
};

export default Form;
