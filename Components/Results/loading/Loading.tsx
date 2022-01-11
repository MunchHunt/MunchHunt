import React from "react";
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { ShimmerPostItem } from "react-shimmer-effects";
import styles from '../../../styles/Results/cards.module.css';

const LoadingResults = () => {
  return (
    <Box p={4}>
      <Grid container spacing={4.5}>
        <Grid xs={12} sm={12} md={10} lg={6} xl={5}>
          <>
            <ShimmerPostItem card title text cta />
          </>
        </Grid>
        <Grid xs={12} sm={12} md={10} lg={6} xl={5}>
          <>
            <ShimmerPostItem card title text cta />
          </>
        </Grid>
        <Grid xs={12} sm={12} md={10} lg={6} xl={5}>
          <>
            <ShimmerPostItem card title text cta />
          </>
        </Grid>
        <Grid xs={12} sm={12} md={10} lg={6} xl={5}>
          <>
            <ShimmerPostItem  card title text cta />
          </>
        </Grid>
        <Grid xs={12} sm={12} md={10} lg={6} xl={5}>
          <>
            <ShimmerPostItem card title text cta />
          </>
        </Grid>
        <Grid xs={12} sm={12} md={10} lg={6} xl={5}>
          <>
            <ShimmerPostItem className={styles.shimCards} card title text cta />
          </>
        </Grid>
      </Grid>
    </Box>
  );
}

export default LoadingResults;
