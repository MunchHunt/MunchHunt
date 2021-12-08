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
import { resultData } from './dummyData';
import styles from '../../styles/Results/FoodResults.module.css';

type Foods = {
  foods: any
}

const FoodResults: React.FC<Foods> = ({ foods }) => {
  // console.log(foods);
  const getMiles = (i: number) => {
    const miles = (i * 0.000621371192).toFixed(2);
    return miles;
  }
  return (
    <div>
      <Box p={0.5}>
        <Grid container spacing={5}>
          {foods.map((rest: any, index: number) => (
            <Grid key={index} item xs={12} sm={12} md={6} lg={6} xl={4}>
              <Card sx={{ minWidth: 280, minHeight: 200 }}>
                <CardMedia
                  component="img"
                  height="140"
                  image={rest.image_url}
                  alt="yelp restaurant result"
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div">
                    {rest.name}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {rest.location.address1}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {rest.location.city}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {rest.price}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {getMiles(rest.distance)} miles away
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <Rating
                      name="read-only"
                      size="small"
                      precision={0.5}
                      value={rest.rating}
                      readOnly
                    />
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button variant="text" size="small">See more details</Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
};

export default FoodResults;