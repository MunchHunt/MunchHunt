import react from 'react';
import styles from '../../../styles/Results/results.module.css';
import FoodResults from '../results/FoodResults';
import Head from 'next/head';
import SortButtons from '../Buttons/SortButtons';
import RandomDecide from '../Buttons/RandomDecide';
import GoogleMaps from '../Map/GoogleMaps';
import LoadingResults from '../loading/Loading';
import LoadingMap from '../loading/LoadingMap';
import Image from 'next/image';
import BasicTabs from '../results/Tab';
import React from 'react';


interface MobileProps {
  grub: string,
  yelpResult: any,
  original: any,
  location: any,
  allLocs: any,
  showMap: boolean,
  random: boolean,
  zoom: any,
  details: any,
  active: boolean,
  noMatch: boolean,
  loading: boolean,
  sortingHat: any,
  refresh: boolean,
  reset: any,
  randomeChoice: any,
  currentSelect: any,
}


const MobileResults: React.FC<MobileProps> = ({grub, yelpResult, original, location, allLocs, showMap, random, zoom, details, active, noMatch, loading, sortingHat, refresh, reset, randomeChoice, currentSelect}) => {
  const [mobileDetail, setDetail] = React.useState<boolean>(false);

  const myLoader = ({ src, width, quality }: any) => {
    return `https://i.imgur.com/${src}?w=${width}&q=${quality || 75}`
  }

  const mapProps = {
    defaultZoom: zoom,
    localRestaurants: allLocs,
    defaultCenter: { lat: location.lat, lng: location.lng }
  }

  // React.useEffect(() => {
  //   se
  // }, [details, yelpResult])

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
          {grub}
        </div>
      </div>
    </div>
    <div className={styles.sortBy}>
      {noMatch ? null : (<div className={styles.sortByTextCont}>
        <p className={styles.sortByText}>Sort by:</p>
        <SortButtons sortingHat={sortingHat} reset={reset} refresh={refresh} />
      </div>)}
      {noMatch ? null : (<div className={styles.randomizeButtonContainer}>
        <RandomDecide yelpResult={randomeChoice} reset={reset} />
      </div>)}
    </div>
    <div className={styles.outterBox}>
      <div className={styles.innerBox}>
        {noMatch ? (<div className={styles.resultsColumns}>
          <h3 className={styles.noMatchTitle}>No matches found...</h3>
          <Image
            loader={myLoader}
            src="/PrdSEho.png"
            alt="hungry kid, empty plate in front holding knife and fork in hand"
            width={450}
            height={450}
            placeholder="blur"
            blurDataURL="/iqrmXmz.png"
          />
        </div>) : (<div className={styles.resultsColumns}>
          {loading ? <LoadingResults /> : <FoodResults foods={yelpResult} select={currentSelect} random={random} active={active} />}
        </div>)}
        {noMatch ? (<div className={styles.mapBox}>
          <Image
            loader={myLoader}
            src="/zgJAFK5.jpg"
            alt="hungry kid, empty plate in front holding knife and fork in hand"
            width={400}
            height={200}
            placeholder="blur"
            blurDataURL="/iqrmXmz.png"
          />
        </div>) : (<div className={styles.mapBox}>
          {loading ? <LoadingMap /> : (
            <div>
              {/* {showMap ? <GoogleMaps defaultZoom={zoom} localRestaurants={allLocs} defaultCenter={{ lat: location.lat, lng: location.lng }} /> : null} */}
              {!showMap ? <BasicTabs details={details} maps={mapProps} /> : null}
            </div>
          )}
        </div>)}
      </div>
    </div>
  </div>
  )
}

export default MobileResults;