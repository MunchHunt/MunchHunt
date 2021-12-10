/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import axios from 'axios';
import type { NextPage } from 'next'
import styles from '../styles/Results/results.module.css';
import FoodResults from '../Components/Results/FoodResults';
import Maps from '../Components/Results/Maps';
import Head from 'next/head';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import SortButtons from '../Components/Results/SortButtons';
import RandomDecide from '../Components/Results/RandomDecide';
import { priceSort, distanceSort, ratingSort, locationSort, getRandomInt } from '../Components/Results/sortingFunc';


type Foods = {
  foods: any
}
export async function getServerSideProps() {
  const config = {
    headers:
      { Authorization: `Bearer ${process.env.NEXT_PUBLIC_YELP_API}` }
  }
  const data = await axios.get('https://api.yelp.com/v3/businesses/search?term=delis&latitude=37.786882&longitude=-122.399972', config)

  return {
    props: {
      foods: data.data.businesses
    }
  }
}


const Results: NextPage<Foods> = ({ foods }) => {
  const [yelpResult, setYelp] = React.useState<any>([]);
  const [original, setOriginal] = React.useState<any>([]);
  const [location, setLocation] = React.useState<any>([37.786882, -122.399972]);
  const [allLocs, setAllLocs] = React.useState<any>([]);


  React.useEffect(() => {
    setYelp(foods);
    setOriginal(foods);
    setAllLocs(locationSort(foods));
  }, [foods])

  const sortingHat = (sortCategory: string, value: any) => {
    if (sortCategory === 'price') {
      setYelp(priceSort(value, original));
    } else if (sortCategory === 'distance') {
      setYelp(distanceSort(value, original));
    } else if (sortCategory === 'rating') {
      setYelp(ratingSort(value, original));
    }
  }

  const randomeChoice = () => {
    const randArr = [];
    const rand = getRandomInt(yelpResult.length);
    randArr.push(original[rand]);
    setYelp(randArr);
  }

  return (
    <div>
      <div className={styles.foodChoiceDiv}>
        <div className={styles.foodChoiceBox}>
          <div className={styles.foodChoiceTitle}>
            <h4>Munch Hunt chose:</h4>
          </div>
          <div className={styles.foodChoiceResult}>
            American (Fast Food)
          </div>
        </div>
      </div>
      <div className={styles.sortBy}>
        <p className={styles.sortByText}>Sort by:</p>
        <SortButtons sortingHat={sortingHat} />
        <div className={styles.randomizeButtonContainer}>
          <RandomDecide yelpResult={randomeChoice}/>
        </div>
      </div>
      <div className={styles.outterBox}>
        <div className={styles.innerBox}>
          <div className={styles.resultsColumns}>
            <FoodResults foods={yelpResult} />
          </div>
          <div className={styles.mapBox}>
            <Maps styleHeight={100} styleWidth={100} defaultZoom={14} localRestaurants={allLocs} defaultCenter={{ lat: location[0], lng: location[1] }}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;