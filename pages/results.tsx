/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import axios from 'axios';
import useSWR from 'swr';
import type { NextPage } from 'next'
import styles from '../styles/Results/results.module.css';
import FoodResults from '../Components/Results/results/FoodResults';
import Head from 'next/head';
import SortButtons from '../Components/Results/Buttons/SortButtons';
import RandomDecide from '../Components/Results/Buttons/RandomDecide';
import GoogleMaps from '../Components/Results/Map/GoogleMaps';
import Details from '../Components/Results/results/Details';
import { priceSort, distanceSort, ratingSort, locationSort, getRandomInt, nameFilter, sortZoom } from '../Components/Results/sortingFunc';
import BasicTabs from '../Components/Results/results/Tab';

type Foods = {
  foods: any
}

export async function getServerSideProps() {
  const config = {
    headers:
      { Authorization: `Bearer ${process.env.NEXT_PUBLIC_YELP_API}` }
  }
  const data = await axios.get('https://api.yelp.com/v3/businesses/search?term=delis&latitude=37.786882&longitude=-122.399972&radius=40000&limit=50', config)

  return {
    props: {
      foods: data.data.businesses
    }
  }
}

const Results: NextPage<Foods> = ({ foods }) => {
  const [yelpResult, setYelp] = React.useState<any>([]);
  const [original, setOriginal] = React.useState<any>([]);
  const [location, setLocation] = React.useState<any>({ lat: 37.786882, lng: -122.399972 });
  const [allLocs, setAllLocs] = React.useState<any>([]);
  const [showMap, setMap] = React.useState<boolean>(false);
  const [random, setRandom] = React.useState<number>(280);
  const [zoom, setZoom] = React.useState<number | undefined>(13);
  const [shouldFetch, setFetch] = React.useState<boolean>(true);
  const [details, setDetails] = React.useState<any>([]);

  React.useEffect(() => {
    setYelp(foods);
    setOriginal(foods);
    setAllLocs(locationSort(foods));
  }, [foods]);

  const config = {
    headers:
      { Authorization: `Bearer ${process.env.NEXT_PUBLIC_YELP_API}` }
  };

  const getDetails = (id: string) => {
    axios.get(`/api/yelp/?id=${id}`)
      .then((res) => {
        setDetails(res.data);
        if (details) {
          setMap(false);
        }
      })
      .catch((error) => console.log(error));
  }

  const sortingHat = (sortCategory: string, value: any) => {
    if (sortCategory === 'price') {
      const result = priceSort(value, original);
      setAllLocs(locationSort(result));
      setYelp(result);
    } else if (sortCategory === 'distance') {
      const zoomChange = sortZoom(value);
      const result2 = distanceSort(value, original);
      setAllLocs(locationSort(result2));
      setZoom(zoomChange);
      setYelp(result2);
    } else if (sortCategory === 'rating') {
      const result3 = ratingSort(value, original);
      setAllLocs(locationSort(result3));
      setYelp(result3);
    }
  }

  const randomeChoice = () => {
    const randArr = [];
    const rand = getRandomInt(yelpResult.length);
    randArr.push(original[rand]);
    setAllLocs(locationSort(randArr));
    setLocation({ lat: randArr[0].coordinates.latitude, lng: randArr[0].coordinates.longitude });
    setRandom(650);
    setYelp(randArr);
  }

  const reset = () => {
    setYelp(original);
    setRandom(280);
    setLocation({ lat: original[0].coordinates.latitude, lng: original[0].coordinates.longitude });
    setZoom(13);
    setAllLocs(locationSort(original));
  }

  const currentSelect = (insert: any): void => {
    const currentSelectedRestaurant = nameFilter(insert, original);
    const currentLoc = currentSelectedRestaurant[0].coordinates;
    const id = currentSelectedRestaurant[0].id;
    setAllLocs(locationSort(currentSelectedRestaurant));
    getDetails(id);
    setLocation({ lat: currentLoc.latitude, lng: currentLoc.longitude });
    setMap(false);
  }

  const mapProps = {
    defaultZoom: zoom,
    localRestaurants: allLocs,
    defaultCenter: { lat: location.lat, lng: location.lng }
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
        <div className={styles.sortByTextCont}>
          <p className={styles.sortByText}>Sort by:</p>
          <SortButtons sortingHat={sortingHat} reset={reset} />
        </div>
        <div className={styles.randomizeButtonContainer}>
          <RandomDecide yelpResult={randomeChoice} reset={reset} />
        </div>
      </div>
      <div className={styles.outterBox}>
        <div className={styles.innerBox}>
          <div className={styles.resultsColumns}>
            <FoodResults foods={yelpResult} select={currentSelect} random={random} />
          </div>
          <div className={styles.mapBox}>
            {showMap ? <GoogleMaps defaultZoom={zoom} localRestaurants={allLocs} defaultCenter={{ lat: location.lat, lng: location.lng }} /> : null}
            {!showMap ? <BasicTabs details={details} maps={mapProps} /> : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;

