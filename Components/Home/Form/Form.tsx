import React, { useEffect, useState, useRef } from "react";
import styles from "../../../styles/Home/Form.module.css";
import Location from './Location';
import { TextField, Button, Card, CircularProgress } from "@mui/material";

interface Coords {
  lat: string;
  long: string;
}

interface Props {
  currLocation: string;
  setCurrLocation: Function;
  currChoices: string[];
  setCurrChoices: Function;
  currCoords: Coords;
  setCoords: Function;
  selectedTemplate: string;
}

const Form: React.FC<Props> = ({
  currLocation,
  setCurrLocation,
  currChoices,
  setCurrChoices,
  currCoords,
  setCoords,
  selectedTemplate
}) => {
  const [input1, setInput1] = useState<string>("");
  const [input2, setInput2] = useState<string>("");
  const [input3, setInput3] = useState<string>("");
  const [input4, setInput4] = useState<string>("");
  const [input5, setInput5] = useState<string>("");
  const [input6, setInput6] = useState<string>("");
  const [randomResult, setResult] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [invalidLocation, setInvalidLocation] = useState<boolean>(false);

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
  }, [currChoices])

  const choicesValid = (arr: string[]): boolean => {
    if (arr.length) {
      return true;
    } else {
      window.alert('No choices entered!');
      return false;
    }
  };

  const locationValid = (): boolean => {
    if (currLocation) {
      setInvalidLocation(false);
      return true;
    } else {
      setInvalidLocation(true);
      window.alert('No location entered!');
      return false;
    }
  };

  const submitHandler = (e: any) => {
    e.preventDefault();
    let arr = [inputRef1.current?.['value'], inputRef2.current?.['value'], inputRef3.current?.['value'], inputRef4.current?.['value'], inputRef5.current?.['value'], inputRef6.current?.['value']];
    arr = arr.filter((input) => input !== "");
    if (choicesValid(arr) && locationValid()) {
      let randIndex = Math.floor(Math.random() * arr.length);
      setResult(arr[randIndex]!);
    }
  };

  const changeHandler = () => {
    let temp = [];
    if (inputRef1.current?.value.length) {
      temp.push(inputRef1.current?.value);
    }
    if (inputRef2.current?.value.length) {
      temp.push(inputRef2.current?.value);
    }
    if (inputRef3.current?.value.length) {
      temp.push(inputRef3.current?.value);
    }
    if (inputRef4.current?.value.length) {
      temp.push(inputRef4.current?.value);
    }
    if (inputRef5.current?.value.length) {
      temp.push(inputRef5.current?.value);
    }
    if (inputRef6.current?.value.length) {
      temp.push(inputRef6.current?.value);
    }
    setCurrChoices(temp);
  }

  const randomAutoFill = () => {
    let choices = [
      'American',
      'Japanese',
      'Chinese',
      'Korean',
      'Sushi',
      'Ramen',
      'Burgers',
      'Takeout',
      'Pizza',
      'Greek',
      'Italian',
      'Pasta',
      'BBQ',
      'Vietnamese',
      'Pho',
      'Thai',
      'Mediterranean',
      'Restaurants',
      'Korean BBQ',
      'Dessert',
      'Ice Cream',
      'Vegan',
      'Vegetarian',
      'Healthy',
      'Salad',
      'Asian',
      'Jamaican',
      'Indian',
      'Halal',
      'Mexican',
    ]
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 2000);

    setTimeout(() => {
      let index = Math.floor(Math.random() * choices.length);
      setInput1(choices[index]);
      choices.splice(choices.indexOf(choices[index]), 1);

      index = Math.floor(Math.random() * choices.length);
      setInput2(choices[index])
      choices.splice(choices.indexOf(choices[index]), 1);

      index = Math.floor(Math.random() * choices.length);
      setInput3(choices[index])
      choices.splice(choices.indexOf(choices[index]), 1);

      index = Math.floor(Math.random() * choices.length);
      setInput4(choices[index])
      choices.splice(choices.indexOf(choices[index]), 1);

      index = Math.floor(Math.random() * choices.length);
      setInput5(choices[index])
      choices.splice(choices.indexOf(choices[index]), 1);

      index = Math.floor(Math.random() * choices.length);
      setInput6(choices[index])
      choices.splice(choices.indexOf(choices[index]), 1);

      changeHandler();
    }, 2000);

  };

  useEffect(() => {
    if (randomResult && randomResult !== "") {
      // window.open("/results", "_self");
      console.log('Result:', randomResult)
    }
  }, [randomResult]);

  return (
    <Card className={styles.container}>
      <div className={styles.innerContainer}>
        {selectedTemplate.length ? <h3 className={styles.formTitle}>{selectedTemplate}</h3> : <h3 className={styles.formTitle}>Lets get started!</h3>}
        <div className={styles.desc}>
          List up to 6 possible cuisines or categories you would want to eat. (At least 1 required)
        </div>
        <Button className={styles.chooseBtn} variant="contained" onClick={randomAutoFill}>Can{"'"}t Decide? Let us decide</Button>
        {loading ?
          <div className={styles.loading}>
            <div className={styles.loadingText}>Picking 6 random choices</div>
            <CircularProgress size={20} />
          </div> : null}
        <div className={styles.formContainer}>
          <form className={styles.form} onSubmit={(e: any) => submitHandler(e)}>
            <TextField
              className={styles.inputField}
              inputRef={inputRef1}
              placeholder="Enter cuisine"
              value={input1}
              onChange={changeHandler}
              variant="outlined"
            />
            <TextField
              className={styles.inputField}
              inputRef={inputRef2}
              placeholder="Enter cuisine"
              value={input2}
              onChange={changeHandler}
              variant="outlined"
            />
            <TextField
              className={styles.inputField}
              inputRef={inputRef3}
              placeholder="Enter cuisine"
              value={input3}
              onChange={changeHandler}
              variant="outlined"
            />
            <TextField
              className={styles.inputField}
              inputRef={inputRef4}
              placeholder="Enter cuisine"
              value={input4}
              onChange={changeHandler}
              variant="outlined"
            />
            <TextField
              className={styles.inputField}
              inputRef={inputRef5}
              placeholder="Enter cuisine"
              value={input5}
              onChange={changeHandler}
              variant="outlined"
            />
            <TextField
              className={styles.inputField}
              inputRef={inputRef6}
              placeholder="Enter cuisine"
              value={input6}
              onChange={changeHandler}
              variant="outlined"
            />
          </form>
          <br />
        </div>
        <Location currLocation={currLocation} setCurrLocation={setCurrLocation} currCoords={currCoords} setCoords={setCoords} invalidLocation={invalidLocation} setInvalidLocation={setInvalidLocation} />
        <br />
        <div className={styles.submitDiv}>
          <Button
            className={styles.findBtn}
            variant="contained"
            type="submit"
            onClick={(e: any) => submitHandler(e)}>Find!</Button>
        </div>
      </div>
    </Card>
  );
};

export default Form;
