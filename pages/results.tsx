import React from 'react';
import type { NextPage } from 'next'
import styles from '../styles/Results/results.module.css';

const Results: NextPage = () => {
  return (
    <div>
      <h1>Results</h1>
      <div className={styles.outterBox}>
        <div className={styles.innerBox}>
          <div className={styles.resultsColumns}>
            result columns
            import component that renders results
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