import React from 'react';
import styles from '../../../styles/Results/buttons.module.css';
import Button from '@mui/material/Button';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

interface Random {
  yelpResult: any;
  reset: any;
}

const RandomDecide: React.FC<Random> = ({ yelpResult, reset }) => {
  const [show, setShow] = React.useState<boolean>(true);

  const handleSubmit = () => {
    setShow(!show);
    yelpResult();
  };

  const handleReset = () => {
    reset();
    setTimeout(() => {
      setShow(!show)
    }, 500)
  }

  return (
    <div>
      {show ? <Button type="button" className="button" onClick={() => handleSubmit()} variant="contained" size="small">Can&#39;t decide? Let us decide for you<ShuffleIcon /></Button>: null}
      {!show ? <Button type="button" className="button" onClick={() => handleReset()} variant="contained" size="small"><ArrowBackIcon />Go Back</Button> : null }
    </div>
  )
}

export default RandomDecide;