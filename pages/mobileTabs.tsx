import { NextPage } from 'next';
import { useRouter } from 'next/router'
import React from 'react';
import axios from 'axios';
import BasicTabs from '../Components/Results/results/Tab';
import styles from '../styles/Results/tabs.module.css';
import Button from '@mui/material/Button';
import { locationSort } from '../Components/Results/sortingFunc';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export async function getServerSideProps(context: any) {
  const { params, res, req, query } = context;

  let id = query.id || "hxrUV8tJf1MwZbs3nYjrXw";

  const config = {
    headers:
      { Authorization: `Bearer ${process.env.NEXT_PUBLIC_YELP_API}` }
  }
  const data = await axios.get(
    `https://api.yelp.com/v3/businesses/${id}`,
    config
  );

  return {
    props: {
      foods: data.data,
    }
  }
}

interface Foods {
  foods: any
}

const MobileTabs: NextPage<Foods> = ({ foods }) => {
  const [yelpResult, setYelp] = React.useState<any>([]);
  const [location, setLocation] = React.useState<any>({ lat: 37.786882, lng: -122.399972 });
  const [allLocs, setAllLocs] = React.useState<any>([]);
  const [zoom, setZoom] = React.useState<number | undefined>(13);
  const [details, setDetails] = React.useState<any>([]);
  const [tempArr, setTemp] = React.useState<any>([]);

  React.useEffect(() => {
    tempArr.push(foods);
    const lat = foods.coordinates.latitude;
    const lng = foods.coordinates.longitude;
    setTimeout(() => {
      setYelp(foods);
      setAllLocs(locationSort(tempArr));
      setLocation({ lat: lat, lng: lng });
      setDetails(foods);
    }, 1000)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [foods]);

  const mapProps = {
    defaultZoom: zoom,
    localRestaurants: allLocs,
    defaultCenter: { lat: location.lat, lng: location.lng }
  }

  const router = useRouter();

  return (
    <div className={styles.tabPageContainer}>
      <div className={styles.backBtnCont}>
      <Button
        className={styles.backBtn}
        variant="contained"
        size="medium"
        onClick={() => router.back()}
      >
        <ArrowBackIcon fontSize='small' />
        Back to results</Button>
      </div>
      <div className={styles.innerTabs}>
        <BasicTabs details={details} maps={mapProps} />
      </div>
    </div>
  )
}

export default MobileTabs;
