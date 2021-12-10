import React from 'react';
import Button from '@mui/material/Button';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import styles from '../../styles/Results/results.module.css';

interface Random {
  yelpResult: any;
}

const RandomDecide: React.FC<Random> = ({ yelpResult }) => {

  const handleSubmit = () => {
    yelpResult();
  };

  return (
    <div>
      <Button type="button" className={styles.randomizeButton} onClick={() => handleSubmit()} variant="contained" size="small">Can&#39;t decide? Let us decide for you<ShuffleIcon /></Button>
    </div>
  )
}

export default RandomDecide;