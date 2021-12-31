import React, { useState } from 'react';
import styles from '../styles/Navbar/navbar.module.css';
import styles2 from '../styles/Navbar/navbar2.module.css';
import Image from 'next/image';
import Login from './Login';
import Router from 'next/router'
import InfoIcon from '@mui/icons-material/Info';
import InfoModal from './InfoModal';

const myLoader = ({ src, width, quality }: any) => {
  return `https://i.imgur.com/${src}?w=${width}&q=${quality || 75}`
}

const Navbar = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);

  const goHome = () => {
    Router.push('/');
  }

  const handleClickOpen = () => {
    setOpenModal(true);
  }

  return (
    <div className={styles2.navOuterContainer}>
      <nav className={styles2.navbar}>
        <div className={styles2.navbarLogoContainer} onClick={goHome}>
          <Image
            loader={myLoader}
            src="/Y8KaQBX.png"
            alt="Munch Hunt logo"
            width={70}
            height={70}
          />
          <div className={styles2.munchHuntTitle}>MUNCH HUNT</div>
        </div>
        <div className={styles2.navbarLinkContainer}>
          <a className={styles2.navLinks} onClick={() => Router.push('/find')}>Find</a>
          <Login />
        </div>
        <div onClick={handleClickOpen} className={styles2.infoContainer}>
          <div className={styles2.i}><InfoIcon fontSize='small' /></div>
        </div>
      </nav>
      <InfoModal openModal={openModal} setOpenModal={setOpenModal} />
    </div>
  );
};

export default Navbar;