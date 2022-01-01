import React from 'react';
import styles from '../../../styles/Results/buttons.module.css';
import Button from '@mui/material/Button';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { makeStyles } from '@mui/styles';

interface Random {
  yelpResult: any;
  reset: any;
}

const RandomDecide: React.FC<Random> = ({ yelpResult, reset }) => {
  const [show, setShow] = React.useState<boolean>(true);
  const [width, setWidth] = React.useState(0);
  const [size, setSize] = React.useState<string>('small');

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

  const theme = makeStyles({
    root: {
      height: '40px',
      fontSize: '1em',
      backgroundColor: '#ff7300',
      color: 'white',
      border: '1px solid transparent',
      '&:hover': {
        backgroundColor: '#1a1a1a',
        color: '#ffffff',
        border: '1px solid #ffa500',
    },
    },
  });
  const classes = theme();

return (
  <div>
    {show ? <Button type="button" className={classes.root} onClick={() => handleSubmit()} variant="contained" size="small">Can&#39;t decide? Let us decide for you<ShuffleIcon /></Button> : null}
    {!show ? <Button type="button" className={classes.root} onClick={() => handleReset()} variant="contained" size="small"><ArrowBackIcon />Go Back</Button> : null}
  </div>
)
}

export default RandomDecide;