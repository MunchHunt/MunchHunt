import React, { useEffect, useState } from 'react';
import styles from '../../styles/Home/Form.module.css';
// import Button from '@mui/material/Button';
// import ButtonGroup from '@mui/material/ButtonGroup';

interface Props {
  isLoggedIn: boolean;
}

const Form: React.FC<Props> = ({ isLoggedIn }) => {
  const [input1, setInput1] = useState<string>('');
  const [input2, setInput2] = useState<string>('');
  const [input3, setInput3] = useState<string>('');
  const [input4, setInput4] = useState<string>('');
  const [input5, setInput5] = useState<string>('');
  const [input6, setInput6] = useState<string>('');

  const [randomResult, setResult] = useState<string>('');

  const submitHandler = (e: any) => {
    e.preventDefault();
    let arr = [input1, input2, input3, input4, input5, input6];
    arr = arr.filter(input => input !== '');
    let randIndex = Math.floor(Math.random() * arr.length);
    setResult(arr[randIndex]);
  };

  useEffect(() => {
    if (randomResult !== '') {
      window.open('/results', '_self');
    }
  }, [randomResult])

  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <h3>Lets get started!</h3>
        <div>List up to 6 possible cuisines or categories you would want to eat.</div>
        <form onSubmit={(e: any) => submitHandler(e)}>
          <input type="text" placeholder="Enter cuisine/category" onChange={(e: any) => { setInput1(e.target.value) }} />
          <input type="text" placeholder="Enter cuisine/category" onChange={(e: any) => { setInput2(e.target.value) }} />
          <input type="text" placeholder="Enter cuisine/category" onChange={(e: any) => { setInput3(e.target.value) }} />
          <input type="text" placeholder="Enter cuisine/category" onChange={(e: any) => { setInput4(e.target.value) }} />
          <input type="text" placeholder="Enter cuisine/category" onChange={(e: any) => { setInput5(e.target.value) }} />
          <input type="text" placeholder="Enter cuisine/category" onChange={(e: any) => { setInput6(e.target.value) }} />
          <br />
          {/* Dietary Restrictions
        <br />
        <label>
          <input type="checkbox" value="Vegan" />
          Vegan
        </label>
        <label>
          <input type="checkbox" value="Vegetarian" />
          Vegetarian
        </label>
        <label>
          <input type="checkbox" value="Halal" />
          Halal
        </label>
        <label>
          <input type="checkbox" value="Kosher" />
          Kosher
        </label>
        <label>
          <input type="checkbox" value="Dairy-Free" />
          Dairy-Free
        </label>
        <label>
          <input type="checkbox" value="Gluten-Free" />
          Gluten-Free
        </label>
        <br /> */}
          <input type="submit" value="Find!" onClick={(e: any) => submitHandler(e)} />
        </form>
      </div>
    </div>
  );
};

export default Form;