import React, { useEffect, useState, useRef } from "react";
import styles from "../../styles/Home/Form.module.css";
import Location from './Location';

interface Props {
  currLocation: string;
  setCurrLocation: Function;
}

const Form: React.FC<Props> = ({
  currLocation,
  setCurrLocation,
}) => {
  const [input1, setInput1] = useState<string>("");
  const [input2, setInput2] = useState<string>("");
  const [input3, setInput3] = useState<string>("");
  const [input4, setInput4] = useState<string>("");
  const [input5, setInput5] = useState<string>("");
  const [input6, setInput6] = useState<string>("");

  const [randomResult, setResult] = useState<string>("");
  const inputRef1 = useRef(null);
  const inputRef2 = useRef(null);
  const inputRef3 = useRef(null);
  const inputRef4 = useRef(null);
  const inputRef5 = useRef(null);
  const inputRef6 = useRef(null);

  const submitHandler = (e: any) => {
    e.preventDefault();
    let arr = [inputRef1.current?.['value'], inputRef2.current?.['value'], inputRef3.current?.['value'], inputRef4.current?.['value'], inputRef5.current?.['value'], inputRef6.current?.['value']];
    arr = arr.filter((input) => input !== "");
    let randIndex = Math.floor(Math.random() * arr.length);
    setResult(arr[randIndex]!);
  };

  const randomAutoFill = () => {
    console.log("Auto-filling input fields!");
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
      'Jamaican'
    ]
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
  };

  useEffect(() => {
    if (randomResult && randomResult !== "") {
      // window.open("/results", "_self");
      console.log('Result:', randomResult)
    }
  }, [randomResult]);

  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <h3>Lets get started!</h3>
        <div>
          List up to 6 possible cuisines or categories you would want to eat.
        </div>
        <button onClick={randomAutoFill}>Choose for me!</button>
        <form onSubmit={(e: any) => submitHandler(e)}>
          <input
            ref={inputRef1}
            type="text"
            placeholder="Enter cuisine/category"
            defaultValue={input1}
          />
          <input
            ref={inputRef2}
            type="text"
            placeholder="Enter cuisine/category"
            defaultValue={input2}
          />
          <input
            ref={inputRef3}
            type="text"
            placeholder="Enter cuisine/category"
            defaultValue={input3}
          />
          <input
            ref={inputRef4}
            type="text"
            placeholder="Enter cuisine/category"
            defaultValue={input4}
          />
          <input
            ref={inputRef5}
            type="text"
            placeholder="Enter cuisine/category"
            defaultValue={input5}
          />
          <input
            ref={inputRef6}
            type="text"
            placeholder="Enter cuisine/category"
            defaultValue={input6}
          />
          <br />
          <Location currLocation={currLocation} setCurrLocation={setCurrLocation} />
          <br />
          <input
            type="submit"
            value="Find!"
            onClick={(e: any) => submitHandler(e)}
          />
        </form>
      </div>
    </div>
  );
};

export default Form;
