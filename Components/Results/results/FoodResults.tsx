import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import styles2 from '../../../styles/Results/cards.module.css';
import Image from 'next/image';
import { CardActionArea } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material/styles';
import { grey } from '@mui/material/colors';
// import { createMuiTheme } from '@material-ui/core';

interface Foods {
  foods: any
  select: any
  random: boolean
  active: boolean
}

interface CardProps {
  id: string,
  name: string,
  image: string,
  address: string,
  city: string,
  price: string,
  distance: number,
  rating: number,
  handleClick: any,
  current: string,
  selected: any,
  random: boolean,
  width: number,
  height: number,
  imgSize: string,
}

const myLoader = ({ src, width, quality }: any) => {
  return `https://i.imgur.com/${src}?w=${width}&q=${quality || 75}`
}

const textTheme = createTheme({
  palette: {
    primary: {
      main: '#ffffff',
    },
  },
  typography: {
    fontFamily: [
      'Mukta',
      'Arial',
      'sans-serif',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
  components: {
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },
  },
});


function Cards({ id, name, image, address, city, price, distance, rating, handleClick, selected, random, width, height, imgSize }: CardProps) {
  const getMiles = (i: number) => {
    const miles = (i * 0.000621371192).toFixed(2);
    return miles;
  }

  return (
      <Card id={id} style={selected} className={styles2.cardResult} sx={{ minWidth: width, minHeight: height }} onClick={(id) => handleClick(id)}>
          <CardMedia
            component="img"
            height={imgSize}
            image={image}
            alt="yelp restaurant result"
          />
          <CardContent className={styles2.cardContent}>
            <Typography color="primary" className={styles2.cardName}>
              {name}
            </Typography>
            <div className={styles2.cardOrganizer}>
              <div className={styles2.cardOrgSub}>
                <Typography color="primary" className={styles2.cardText} >
                  {address}
                </Typography>
                <Typography color="primary" className={styles2.cardText}>
                  {city}
                </Typography>
                <Typography color="primary" className={styles2.cardPrice}>
                  {price}
                </Typography>
              </div>
              <div className={styles2.bottomCardBox}>
                <Typography color="primary" className={styles2.cardDistance}>
                  {getMiles(distance)} miles away
                </Typography>
                <Typography className={styles2.cardStars}>
                  <Rating
                    name="read-only"
                    size="small"
                    precision={0.5}
                    value={rating}
                    readOnly
                  />
                </Typography>
              </div>
            </div>
          </CardContent>
      </Card>
  )
}

const FoodResults: React.FC<Foods> = ({ foods, select, random, active }) => {
  const [current, setCurrent] = React.useState<string>('');
  const [selected, setSelected] = React.useState<any>();
  const [prevSelected, setCurrentSelected] = React.useState<string>('');
  const [width, setWidth] = React.useState<number>(280);
  const [height, setHeight] = React.useState<number>(350);
  const [imgSize, setImgSize] = React.useState<string>("157");
  const [size, setSize] = React.useState<number | undefined>();
  const [single, setSingle] = React.useState<number>(480);

  const handleClick = (event: any, id: number, name: string) => {
    let card = document.querySelector('#rest' + id);
    card?.classList.add('active');
    if (prevSelected.length) {
      let prev = document.querySelector(prevSelected);
      prev?.classList.remove('active');
    }
    setCurrentSelected('#rest' + id);
    select(name);
  }

  React.useEffect(() => {
    setSize(window.innerWidth)
    window.addEventListener('resize', () => {
      setSize(window.innerWidth)
    })
  }, []);

  React.useEffect(() => {
    if (size) {
      if (size <= 500) {
        setSingle(350);
        setHeight(250);
        setImgSize("115");
      } else if (size > 500) {
        setSingle(480);
        setHeight(350);
        setImgSize("157");
      }
    }
  }, [size]);

  React.useEffect(() => {
    if (active === true && prevSelected) {
      let prev = document.querySelector(prevSelected);
      prev?.classList.remove('active');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  React.useEffect(() => {
    if (random === true) {
      setWidth(single);
    } else {
      setWidth(280)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [random])

  return (
    <div>
      {foods.length > 0 ? (<Box p={0.5}>
        <Grid container spacing={5}>
          {foods.map((rest: any, index: number) => (
            <Grid key={index} item xs={12} sm={12} md={10} lg={5.5} xl={5.8}>
              <Cards id={'rest' + index} handleClick={(event: any) => handleClick(event, index, rest.name)} width={width} height={height} imgSize={imgSize} name={rest.name} address={rest.location.address1} image={rest.image_url} city={rest.location.city} price={rest.price} rating={rest.rating} distance={rest.distance} current={current} selected={selected} random={random} />
            </Grid>
          ))}
        </Grid>
      </Box>) : (
        <Box p={0.5}>
          <h3 className={styles2.noMatch}>No matches found...</h3>
          <Image
            loader={myLoader}
            src="/PrdSEho.png"
            alt="hungry kid, empty plate in front holding knife and fork in hand"
            width={400}
            height={400}
            placeholder="blur"
            blurDataURL="/iqrmXmz.png"
          />
        </Box>
      )}
    </div>
  );
};

export default FoodResults;
