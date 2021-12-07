import React from 'react';
import type { NextPage } from 'next'
import styles from '../styles/Results/results.module.css';
import FoodResults from '../Components/Results/FoodResults';
import Head from 'next/head';

const Results: NextPage = () => {
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
      <div className={styles.outterBox}>
        <div className={styles.innerBox}>
          <div className={styles.resultsColumns}>
            <FoodResults />
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