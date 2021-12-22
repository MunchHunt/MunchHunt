import React, { useContext } from 'react';
import GoogleLogin, { GoogleLogout } from 'react-google-login';
import { MunchContext } from './Contexts/MunchContext';
import styles from '../styles/Login/Login.module.css';
import LogoutIcon from '@mui/icons-material/Logout';

const Login: React.FC = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(MunchContext);

  const logout = () => {
    setIsLoggedIn(false);
  };

  const responseSuccess = () => {
    setIsLoggedIn(true);
  }

  const responseFailure = () => {
    console.log('Login failed');
  }

  return (
    <div className={styles.container}>
      {isLoggedIn ? (
        <div className={styles.login}>
          <GoogleLogout
            clientId="265112883039-uk4smktdnujvrnhjr5reu74ld3rq251o.apps.googleusercontent.com"
            buttonText="Logout"
            onLogoutSuccess={logout}
            className={styles.logoutBtn}
            render={(renderProps) => (
              <button onClick={renderProps.onClick} className={styles.logoutBtn} disabled={renderProps.disabled}>
                Logout
                <LogoutIcon fontSize='small' className={styles.icon} />
              </button>
            )}
          />
        </div>
      ) :
        <div className={styles.login}>
          <GoogleLogin
            className={styles.loginBtn}
            clientId='265112883039-uk4smktdnujvrnhjr5reu74ld3rq251o.apps.googleusercontent.com'
            buttonText='Login'
            onSuccess={responseSuccess}
            onFailure={responseFailure}
            cookiePolicy={'single_host_origin'}
            render={(renderProps) => (
              <button onClick={renderProps.onClick} className={styles.loginBtn} disabled={renderProps.disabled}>
                Login
              </button>
            )}
          />
        </div>
      }
    </div>
  );
};

export default Login;