/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import Button from '@mui/material/Button';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import styles from '../../../styles/Results/results.module.css';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

interface Sort {
  sortingHat: any
  reset: any
  refresh: boolean
}

const SortButtons: React.FC<Sort> = ({ sortingHat, reset, refresh }) => {
  const [price, setPrice] = React.useState('');
  const [dist, setDistance] = React.useState('');
  const [rate, setRate] = React.useState('');

  React.useEffect(() => {
    sortingHat('price', price)
  }, [price]);

  React.useEffect(() => {
    sortingHat('distance', dist)
  }, [dist]);

  React.useEffect(() => {
    sortingHat('rating', rate)
  }, [rate]);

  // React.useEffect(() => {
  //   if (refresh === false) {

  //   }
  // }, [price, dist, rate, refresh])


  // React.useEffect(() => {
  //     setPrice('');
  //     setDistance('');
  //     setRate('');
  // }, [refresh])

  const handleChangePrice = (event: any) => {
    setPrice(event.target.value);
  };

  const handleChangeDistance = (event: any) => {
    setDistance(event.target.value);
  };
  const handleChangeRating = (event: any) => {
    setRate(event.target.value);
  };
  return (
    <div className={styles.sortButtonContainer}>
      <div className={styles.sortButtons}>
        <FormControl sx={{ minWidth: 120, }} size="small">
          <InputLabel id="select-helper-label-price">Price</InputLabel>
          <Select
            labelId="select-helper-label-price"
            id="select-helper-price"
            value={price}
            label="price"
            onChange={handleChangePrice}
          >
            <MenuItem value={''}>
            </MenuItem>
            <MenuItem value={'$'}>
              <AttachMoneyIcon fontSize="small" />
            </MenuItem>
            <MenuItem value={'$$'}>
              <AttachMoneyIcon fontSize="small" />
              <AttachMoneyIcon fontSize="small" />
            </MenuItem>
            <MenuItem value={'$$$'}>
              <AttachMoneyIcon fontSize="small" />
              <AttachMoneyIcon fontSize="small" />
              <AttachMoneyIcon fontSize="small" />
            </MenuItem>
            <MenuItem value={'$$$$'}>
              <AttachMoneyIcon fontSize="small" />
              <AttachMoneyIcon fontSize="small" />
              <AttachMoneyIcon fontSize="small" />
              <AttachMoneyIcon fontSize="small" />
            </MenuItem>
            <MenuItem value={'all'}>
              All
            </MenuItem>
          </Select>
        </FormControl>
      </div>
      <div className={styles.sortButtons}>
        <FormControl sx={{ minWidth: 120 }} size="small">
          <InputLabel id="select-helper-label-distance">Distance</InputLabel>
          <Select
            labelId="select-helper-label-distance"
            id="select-helper-distance"
            value={dist}
            label="distance"
            onChange={handleChangeDistance}
          >
            <MenuItem value={''}></MenuItem>
            <MenuItem value={0.9}>&lt; 1 mi</MenuItem>
            <MenuItem value={1}>1 mi</MenuItem>
            <MenuItem value={5}>5 mi</MenuItem>
            <MenuItem value={10}>10 mi</MenuItem>
            <MenuItem value={25}>25 mi</MenuItem>
            <MenuItem value={30}>All</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div className={styles.sortButtons}>
        <FormControl sx={{ minWidth: 120 }} size="small">
          <InputLabel id="select-helper-label-rating">Rating</InputLabel>
          <Select
            labelId="select-helper-label-rating"
            id="select-helper-rating"
            value={rate}
            label="rating"
            onChange={handleChangeRating}
          >
            <MenuItem value={''}></MenuItem>
            <MenuItem value={1}>1 star</MenuItem>
            <MenuItem value={2}>2 stars</MenuItem>
            <MenuItem value={3}>3 stars</MenuItem>
            <MenuItem value={4}>4 stars</MenuItem>
            <MenuItem value={5}>5 stars</MenuItem>
            <MenuItem value={6}>All</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div>
        <Button
          variant="outlined"
          size="large"
          className={styles.resetButton}
          onClick={() => reset()}
        >Reset</Button>
      </div>
    </div>
  )
}

export default SortButtons;
