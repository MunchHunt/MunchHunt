import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import styles2 from '../../../styles/Results/cards.module.css';
import Image from 'next/image';
import { CardActionArea } from '@mui/material';

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

function Cards({ id, name, image, address, city, price, distance, rating, handleClick, selected, random, width, height, imgSize }: CardProps) {
  const getMiles = (i: number) => {
    const miles = (i * 0.000621371192).toFixed(2);
    return miles;
  }

  return (
    <Card id={id} style={selected} className={styles2.cardResult} sx={{ minWidth: width, minHeight: height }} onClick={(id) => handleClick(id)}>
      <CardActionArea className={styles2.cardArea}>
        <CardMedia
          component="img"
          height={imgSize}
          image={image}
          alt="yelp restaurant result"
        />
        <CardContent className={styles2.cardContent}>
          <Typography className={styles2.cardName} gutterBottom variant="body1" component="div">
            {name}
          </Typography>
          <div className={styles2.cardOrganizer}>
            <div>
              <Typography className={styles2.cardText} variant="body1" color="text.secondary">
                {address}
              </Typography>
              <Typography className={styles2.cardText} variant="body1" color="text.secondary">
                {city}
              </Typography>
              <Typography className={styles2.cardPrice} variant="body1" color="text.secondary">
                {price}
              </Typography>
            </div>
            <div className={styles2.bottomCardBox}>
              <Typography className={styles2.cardDistance} variant="body2" color="text.secondary">
                {getMiles(distance)} miles away
              </Typography>
              <Typography className={styles2.cardStars} variant="body2" color="text.secondary">
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
      </CardActionArea>
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
        setSingle (480);
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
            <Grid key={index} item xs={12} sm={12} md={11} lg={5.5} xl={5.8}>
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
