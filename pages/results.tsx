/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import axios from 'axios';
import type { NextPage } from 'next'
import styles from '../styles/Results/results.module.css';
import FoodResults from '../Components/Results/FoodResults';
import Maps from '../Components/Results/Map/Maps';
import Head from 'next/head';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import SortButtons from '../Components/Results/SortButtons';
import RandomDecide from '../Components/Results/RandomDecide';
import SingleRestMap from '../Components/Results/Map/SingleRestMap';
import { priceSort, distanceSort, ratingSort, locationSort, getRandomInt, nameFilter } from '../Components/Results/sortingFunc';


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
  const [oneRest, setOneRest] = React.useState<any>([]);
  const [showMap, setMap] = React.useState<boolean>(true);
  const [showSingMap, setSingleMap] = React.useState<boolean>(false);


  React.useEffect(() => {
    setYelp(foods);
    setOriginal(foods);
    setAllLocs(locationSort(foods));
  }, [foods])

  const sortingHat = (sortCategory: string, value: any) => {
    if (sortCategory === 'price') {
      setYelp(priceSort(value, original));
      setSingleMap(false);
      setMap(true);
    } else if (sortCategory === 'distance') {
      setYelp(distanceSort(value, original));
      setSingleMap(false);
      setMap(true);
    } else if (sortCategory === 'rating') {
      setYelp(ratingSort(value, original));
      setSingleMap(false);
      setMap(true);
    }
  }

  const randomeChoice = () => {
    const randArr = [];
    const rand = getRandomInt(yelpResult.length);
    randArr.push(original[rand]);
    setOneRest(locationSort(randArr));
    if (oneRest) {
      setMap(false);
      setSingleMap(true);
    }
    setYelp(randArr);
  }

  const currentSelect = (insert: any):void => {
    const currentSelectedRestaurant = nameFilter(insert, original);
    setOneRest(locationSort(currentSelectedRestaurant));
    setMap(!showMap);
    setSingleMap(!showSingMap);
    // setYelp(nameFilter(insert, original));
  }

  return (
    <div>
       <Head>
        <title>Munch Hunt: restaurant results</title>
        <meta name="description" content="Munch Hunt helps you choose a restaurant when you are feeling indecisive" />
        <link rel="icon" href="https://i.imgur.com/Y8KaQBX.png" />
      </Head>
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
            <FoodResults foods={yelpResult} select={currentSelect}/>
          </div>
          <div className={styles.mapBox}>
            {showMap ? <Maps styleHeight={100} styleWidth={100} defaultZoom={14} localRestaurants={allLocs} defaultCenter={{ lat: location[0], lng: location[1] }}/> : null}
            {showSingMap ? <SingleRestMap styleHeight={100} styleWidth={100} defaultZoom={16} localRestaurants={oneRest} defaultCenter={{ lat: oneRest[0].lat, lng: oneRest[0].lng }}/> : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;