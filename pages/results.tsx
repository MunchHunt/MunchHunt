import React from 'react';
import axios from 'axios';
import type { NextPage } from 'next'
import styles from '../styles/Results/results.module.css';
import FoodResults from '../Components/Results/FoodResults';
import Head from 'next/head';
import Button from '@mui/material/Button';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ShuffleIcon from '@mui/icons-material/Shuffle';

export async function getServerSideProps() {
  const config = {
    headers:
    { Authorization: `Bearer ${process.env.NEXT_PUBLIC_YELP_API}`}
  }
  const data = await axios.get('https://api.yelp.com/v3/businesses/search?term=delis&latitude=37.786882&longitude=-122.399972', config)

  return {
    props: {
      foods: data.data.businesses
    }
  }
}

interface FoodProps {
  foods: any
}

const Results: NextPage = ({ foods }) => {
  return (
    <div>
      {/* <Head>
        <script async
         src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap">
        </script>
      </Head> */}
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
      <div>
        Sort by:
          <Button variant="outlined" size="small">Price <ArrowDropDownIcon/></Button>
          <Button variant="outlined"size="small">Distance<ArrowDropDownIcon/></Button>
          <Button variant="outlined" size="small">Rating<ArrowDropDownIcon/></Button>
          <div>
          <Button variant="outlined" size="small">Can't decide? Let us decide for you<ShuffleIcon/></Button>
          </div>
        </div>
      <div className={styles.outterBox}>
        <div className={styles.innerBox}>
          <div className={styles.resultsColumns}>
            <FoodResults foods={foods}/>
          </div>
          <div className={styles.mapBox}>
            map/ detail boxes
            import map component
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;