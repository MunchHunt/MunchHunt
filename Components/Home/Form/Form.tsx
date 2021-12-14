import React, { useEffect, useState, useRef, useContext } from "react";
import styles from "../../../styles/Home/Form.module.css";
import Location from "./Location";
import { TextField, Button, Card, CircularProgress } from "@mui/material";
import { MunchContext } from "../../Contexts/MunchContext";
import { choices } from './Choices';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import RestaurantIcon from '@mui/icons-material/Restaurant';

interface Props {
  currChoices: string[];
  setCurrChoices: Function;
  selectedTemplate: string;
}

const Form: React.FC<Props> = ({ currChoices, setCurrChoices, selectedTemplate }) => {
  const [input1, setInput1] = useState<string>("");
  const [input2, setInput2] = useState<string>("");
  const [input3, setInput3] = useState<string>("");
  const [input4, setInput4] = useState<string>("");
  const [input5, setInput5] = useState<string>("");
  const [input6, setInput6] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [invalidLocation, setInvalidLocation] = useState<boolean>(false);
  const {
    result,
    setResult,
    currAddress,
  } = useContext(MunchContext);

  const inputRef1 = useRef<any>(null);
  const inputRef2 = useRef<any>(null);
  const inputRef3 = useRef<any>(null);
  const inputRef4 = useRef<any>(null);
  const inputRef5 = useRef<any>(null);
  const inputRef6 = useRef<any>(null);

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
    let arr = [
      inputRef1.current?.["value"],
      inputRef2.current?.["value"],
      inputRef3.current?.["value"],
      inputRef4.current?.["value"],
      inputRef5.current?.["value"],
      inputRef6.current?.["value"],
    ];
    arr = arr.filter((input) => input !== "");
    if (choicesAreValid(arr) && locationIsValid()) {
      let randIndex = Math.floor(Math.random() * arr.length);
      setResult(arr[randIndex]!);
    }
  };

  const changeHandler = () => {
    let temp = [];
    if (inputRef1.current?.value.length) {
      temp.push(inputRef1.current?.value);
    } else {
      temp.push('');
    }
    if (inputRef2.current?.value.length) {
      temp.push(inputRef2.current?.value);
    } else {
      temp.push('');
    }
    if (inputRef3.current?.value.length) {
      temp.push(inputRef3.current?.value);
    } else {
      temp.push('');
    }
    if (inputRef4.current?.value.length) {
      temp.push(inputRef4.current?.value);
    } else {
      temp.push('');
    }
    if (inputRef5.current?.value.length) {
      temp.push(inputRef5.current?.value);
    } else {
      temp.push('');
    }
    if (inputRef6.current?.value.length) {
      temp.push(inputRef6.current?.value);
    } else {
      temp.push('');
    }
    temp = temp.sort((a, b) => (b.length - a.length));
    setCurrChoices(temp);
  };

  const randomAutoFill = () => {
    setLoading(true);

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

      changeHandler();
    }, 2000);
  };

  useEffect(() => {
    changeHandler();
  }, [input1, input2, input3, input4, input5, input6]);

  useEffect(() => {
    if (result && result !== "") {
      // window.open("/results", "_self");
      console.log("Result:", result);
    }
  }, [result]);

  return (
    <Card className={styles.container}>
      <div className={styles.innerContainer}>
        {selectedTemplate.length ? (
          <h3 className={styles.formTitle}>Template: {selectedTemplate}</h3>
        ) : (
          <h3 className={styles.formTitle}>Lets get started!</h3>
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
              inputRef={inputRef1}
              placeholder="Enter cuisine"
              value={input1}
              // onChange={changeHandler}
              onChange={(e: any) => setInput1(e.target.value)}
              variant="outlined"
            />
            <TextField
              autoComplete="off"
              className={styles.inputField}
              inputRef={inputRef2}
              placeholder="Enter cuisine"
              value={input2}
              // onChange={changeHandler}
              onChange={(e: any) => setInput2(e.target.value)}
              variant="outlined"
            />
            <TextField
              autoComplete="off"
              className={styles.inputField}
              inputRef={inputRef3}
              placeholder="Enter cuisine"
              value={input3}
              // onChange={changeHandler}
              onChange={(e: any) => setInput3(e.target.value)}
              variant="outlined"
            />
            <TextField
              autoComplete="off"
              className={styles.inputField}
              inputRef={inputRef4}
              placeholder="Enter cuisine"
              value={input4}
              // onChange={changeHandler}
              onChange={(e: any) => setInput4(e.target.value)}
              variant="outlined"
            />
            <TextField
              autoComplete="off"
              className={styles.inputField}
              inputRef={inputRef5}
              placeholder="Enter cuisine"
              value={input5}
              // onChange={changeHandler}
              onChange={(e: any) => setInput5(e.target.value)}
              variant="outlined"
            />
            <TextField
              autoComplete="off"
              className={styles.inputField}
              inputRef={inputRef6}
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
        </div>
      </div>
    </Card>
  );
};

export default Form;
