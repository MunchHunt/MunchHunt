import React, { useContext } from 'react';
import Link from 'next/link';
import styles from '../styles/Navbar/navbar.module.css';
import styles2 from '../styles/Navbar/navbar2.module.css';
import Image from 'next/Image';
import Login from './Login';

const myLoader = ({ src, width, quality }: any) => {
  return `https://i.imgur.com/${src}?w=${width}&q=${quality || 75}`
}

const Navbar = () => {

  const goHome = () => {
    window.open('/', '_self');
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
          <Link href=""><a className={styles2.navLinks} onClick={() => window.open('/find', '_self')}>Find</a></Link>
          {/* <Link href="/results"><a className={styles2.navLinks}>Results</a></Link> */}
          {/* <Link href="/"><a className={styles2.navLinks}>Logout  </a></Link> */}
          <Login />
        </div>
      </nav>
    </div>
  );
};

export default Navbar;