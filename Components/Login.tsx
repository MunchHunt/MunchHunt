import React, { useContext } from 'react';
import GoogleLogin, { GoogleLogout } from 'react-google-login';
import { MunchContext } from './Contexts/MunchContext';
import styles from '../styles/Login/Login.module.css';
import LogoutIcon from '@mui/icons-material/Logout';

const {
  GetUserData,
  AddNewUser,
} = require('../pages/api/userAuth');

const Login: React.FC = () => {
  const { isLoggedIn, setIsLoggedIn, setUserTemplates, setUserEmail, setCurrChoices, setSelectedTemplate } = useContext(MunchContext);

  const getData = (email: string, name: string) => {
    GetUserData(email)
      .then((res: any) => {
        if (res) {
          console.log('User exists!', res);
          if (res.templates) {
            setUserTemplates(JSON.parse(res.templates));
          }
        } else {
          AddNewUser(email, name)
            .then((res2: any) => {
              console.log('New user created!', res2);
            })
        }
      })
  }

  const responseSuccess = ({ profileObj, accessToken }: any) => {
    setIsLoggedIn(true);
    console.log('Login success:', profileObj.email);
    setUserEmail(profileObj.email);
    getData(profileObj.email, profileObj.name,);
  }

  const responseFailure = (res: any) => {
    console.log('Login failed');
    console.log(res);
  }

  const logout = () => {
    setIsLoggedIn(false);
    console.log('Logout success.');
    setCurrChoices(['', '', '', '', '', '']);
    setSelectedTemplate('');
  };

  return (
    <div className={styles.container}>
      {isLoggedIn ? (
        <GoogleLogout
          clientId={`${process.env.NEXT_PUBLIC_CLIENT_ID}`}
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
      ) :
        <GoogleLogin
          clientId={`${process.env.NEXT_PUBLIC_CLIENT_ID}`}
          buttonText='Login'
          onSuccess={responseSuccess}
          onFailure={responseFailure}
          className={styles.loginBtn}
          cookiePolicy={'single_host_origin'}
          isSignedIn={true}
          render={(renderProps) => (
            <button onClick={renderProps.onClick} className={styles.loginBtn} disabled={renderProps.disabled}>
              Login
            </button>
          )}
        />
      }
    </div>
  );
};

export default Login;