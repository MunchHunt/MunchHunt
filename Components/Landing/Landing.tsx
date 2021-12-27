import React, { useEffect, useState, useContext } from 'react';
import styles from '../../styles/Landing/Landing.module.css';
import Image from 'next/image';
import { MunchContext } from '../Contexts/MunchContext';
import Location from '../Home/Form/Location';
import { Button } from '@mui/material';
import GoogleLogin, { GoogleLogout } from 'react-google-login';
import GoogleIcon from '@mui/icons-material/Google';
import Router from 'next/router'
import LogoutIcon from '@mui/icons-material/Logout';

const myLoader = ({ src, width, quality }: any) => {
  return `https://i.imgur.com/${src}?w=${width}&q=${quality || 75}`
}

const Landing: React.FC = () => {
  const [invalidLocation, setInvalidLocation] = useState<boolean>(false);
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const [imageSize, setImageSize] = useState<number>(800);
  const { isLoggedIn, setIsLoggedIn } = useContext(MunchContext);

  useEffect(() => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
    window.addEventListener('resize', () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    })
  }, [])

  useEffect(() => {
    if (width < 400) {
      if (height > 700) {
        setImageSize(300);
      } else {
        setImageSize(200);
      }
    } else if (width < 700) {
      setImageSize(250);
    } else {
      setImageSize(800);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width])

  const logout = () => {
    setIsLoggedIn(false);
    console.log('Logout success.');
  };

  const responseSuccess = (res: any) => {
    setIsLoggedIn(true);
    console.log('Login success:', res.profileObj);
  }

  const responseFailure = () => {
    console.log('Login failed');
  }

  return (
    <div className={styles.container}>
      <div className={styles.contentContainer}>
        <div className={styles.top}>
          <div className={styles.textDiv}>
            <div className={styles.title}>Munch Hunt</div>
            <div className={styles.desc}>Struggling to choose a restaurant? Date night? Just hungry? Lets find the right place for you.</div>
          </div>
          <div className={styles.logo}>
            <Image
              loader={myLoader}
              src="/iqrmXmz.png"
              alt="Munch Hunt logo"
              width={imageSize}
              height={imageSize}
              placeholder="blur"
              blurDataURL="/iqrmXmz.png"
            />
          </div>
        </div>
        <div className={styles.bottom}>
          <div className={styles.startDiv}>
            <div className={styles.start}>Get started now!</div>
            {isLoggedIn ?
              <GoogleLogout
                clientId={`${process.env.NEXT_PUBLIC_CLIENT_ID}`}
                buttonText="Logout"
                onLogoutSuccess={logout}
                render={(renderProps) => (
                  <Button variant="contained" onClick={renderProps.onClick} className={styles.loginBtn} disabled={renderProps.disabled}>
                    Logout
                    <LogoutIcon fontSize='small' className={styles.icon} />
                  </Button>
                )}
              /> : <GoogleLogin
                clientId={`${process.env.NEXT_PUBLIC_CLIENT_ID}`}
                buttonText='Login'
                onSuccess={responseSuccess}
                onFailure={responseFailure}
                cookiePolicy={'single_host_origin'}
                render={(renderProps) => (
                  <Button variant="contained" onClick={renderProps.onClick} className={styles.loginBtn} disabled={renderProps.disabled}>
                    <div className={styles.btnText}>Login with</div>
                    <GoogleIcon />
                  </Button>
                )}
              />}
          </div>
          <label htmlFor="Location">Enter Location</label>
          <div className={styles.locationRow}>
            <Location
              invalidLocation={invalidLocation}
              setInvalidLocation={setInvalidLocation}
            />
            <Button className={styles.startBtn} variant="contained" onClick={() => { Router.push('/find'); }}>Start</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;