import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { resultData } from './dummyData';
import styles from '../../styles/Results/FoodResults.module.css';

const FoodResults: React.FC = () => {
  return (
    <div>
      <Grid container spacing={1}>
        {resultData.businesses.map((rest) => (
          <Grid key={rest.name} item xs={6} sm={6} md={6}>
            <Card sx={{ maxWidth: 280}}>
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
                <Typography variant="body2" color="text.secondary">
                  {rest.alias}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {rest.distance}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {rest.rating}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">See more details</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default FoodResults;