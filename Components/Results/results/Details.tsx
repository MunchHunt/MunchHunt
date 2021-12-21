import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import Carousel from 'react-material-ui-carousel';
import moment from 'moment';
import styles from '../../../styles/Results/details.module.css';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import HomeIcon from '@mui/icons-material/Home';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';


interface ResultProps {
  details: any
}

const Details: React.FC<ResultProps> = ({ details }) => {
  return (
    <Card sx={{ minWidth: "100%", minHeight: 350 }}>
      <Carousel>
        {details.photos.map((pics: any, index: any) => (
          <CardMedia
            key={index}
            component="img"
            height="240"
            image={pics}
            alt="yelp restaurant result"
          />
        ))}
      </Carousel>
      <div className={styles.contentContainer}>
        <CardContent className={styles.cardArea} >
          <div className={styles.detailTitleCont}>
            <div className={styles.detailTitle}>
              {details.name}
            </div>
            <div className={styles.rating}>
              <div>
                <Rating
                  name="read-only"
                  size="medium"
                  precision={0.5}
                  value={details.rating}
                  readOnly />
              </div>
            </div>
          </div>
          <div className={styles.price}>
            <div className={styles.dollars}>
              price: {details.price}
            </div>
          </div>
          <div className={styles.detailContainer}>
            <ul className={styles.ulOrganizer}>
              <li>
                <div className={styles.addressCont}>
                  <HomeIcon fontSize="small" />
                  <div className={styles.addressText}>
                    <p className={styles.addy}>{details.location.address1}</p>
                    <p className={styles.addy}> {details.location.city}</p>
                    <p className={styles.addy}>{details.location.state}</p>
                  </div>
                </div>
              </li>
              <li>
                <div className={styles.phone}>
                  <LocalPhoneIcon fontSize='small' />
                  <p className={styles.phoneNum}>{details.display_phone}</p>
                </div>
              </li>
              <li>
                <div className={styles.closingTime}>
                  <AccessTimeIcon fontSize="small" />
                  <p className={styles.close}>Closes today at :</p>
                  <p className={styles.time}>{moment(details.hours[0].open[0].end, ['HH.mm']).format("hh:mm a")}</p>
                </div>
              </li>
              <li>
                <div className={styles.takeOut}>
                  <DeliveryDiningIcon fontSize="small" />
                  <p className={styles.takeOutText}>Take out options:</p>
                  <div className={styles.takeOutOption}>
                    {details.transactions.map((trans: any, index: number) => (
                      <p className={styles.option} key={index}>{trans}</p>
                    ))}
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div className={styles.yelpUrl}>
            <Typography>
              <a className={styles.yelpLink} target="_blank" href={details.url} rel="noopener noreferrer">Visit Yelp Page</a>
            </Typography>
          </div>
        </CardContent>
      </div>
    </Card>
  )
}

export default Details;
