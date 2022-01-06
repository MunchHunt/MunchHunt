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
import { closingTimes } from '../sortingFunc';
import { makeStyles } from '@mui/styles';


interface ResultProps {
  details: any
}

const Details: React.FC<ResultProps> = ({ details }) => {
  const [closing, setClosing] = React.useState<any>([]);
  const theme = makeStyles({
    root: {
      height: '30px',
      fontSize: '1em',
      backgroundColor: 'transparent',
      color: '#e98d1df1',
      border: '1px solid transparent',
      '&:hover': {
        backgroundColor: 'transparent',
        color: '#ff130f',
    },
    },
  });
  const classes = theme();

  React.useEffect(() => {
    if (details.hours) {
      const result = closingTimes(details.hours[0].open);
      setClosing(result);
    }
  }, [details.hours])

  return (
    <Card sx={{ minWidth: "100%", minHeight: 300 }}>
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
                    <p className={styles.addy}>{details.location.address1},
                      &nbsp; {details.location.city},
                      &nbsp; {details.location.state}
                    </p>
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
                  {closing.length > 0 ? <p className={styles.time}>{moment(closing[0].end, ['HH.mm']).format("hh:mm a")}</p> : <p className={styles.time}>Closed</p>}
                </div>
              </li>
              <li>
                <div className={styles.takeOut}>
                  <DeliveryDiningIcon fontSize="small" />
                  <p className={styles.takeOutText}>Take out:</p>
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
              <Button
              className={classes.root}
              variant="text"
              size="medium"
              onClick={() => window.open(details.url, "_blank")}
              >Visit Yelp page</Button>
          </div>
        </CardContent>
      </div>
    </Card>
  )
}

export default Details;
