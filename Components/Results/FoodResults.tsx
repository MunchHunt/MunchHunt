import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import styles from '../../styles/Results/FoodResults.module.css';
import styles2 from '../../styles/Results/cards.module.css';
import { AnyNsRecord } from 'dns';
import { CardActionArea } from '@mui/material';

interface Foods {
  foods: any
  select: any
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
}

function Cards({ id, name, image, address, city, price, distance, rating, handleClick }: CardProps) {
  const getMiles = (i: number) => {
    const miles = (i * 0.000621371192).toFixed(2);
    return miles;
  }
  return (
    <div id={id} onClick={(id) => handleClick(id)}>
      <Card className={styles2.cardResult} sx={{ minWidth: 280, minHeight: 200 }}>
        <CardActionArea >
          <CardMedia
            component="img"
            height="140"
            image={image}
            alt="yelp restaurant result"
          />
          <CardContent className={styles2.cardContent}>
            <Typography className={styles2.cardName} gutterBottom variant="h6" component="div">
              {name}
            </Typography>
            <Typography className={styles2.cardText} variant="body1" color="text.secondary">
              {address}
            </Typography>
            <Typography className={styles2.cardText} variant="body1" color="text.secondary">
              {city}
            </Typography>
            <Typography className={styles2.cardPrice} variant="body1" color="text.secondary">
              {price}
            </Typography>
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
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  )
}

const FoodResults: React.FC<Foods> = ({ foods, select }) => {

  const handleClick = (event: any) => {
    const currentRest = event.currentTarget.id;
    select(currentRest);
  }
  return (
    <div>
      <Box p={0.5}>
        <Grid container spacing={5}>
          {foods.map((rest: any, index: number) => (
            <Grid key={index} item xs={12} sm={12} md={6} lg={6} xl={4}>
              <Cards id={rest.name} handleClick={handleClick} name={rest.name} address={rest.location.address1} image={rest.image_url} city={rest.location.city} price={rest.price} rating={rest.rating} distance={rest.distance} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
};

export default FoodResults;
