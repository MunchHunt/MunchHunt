import React from 'react';
import Link from 'next/link';
import styles from '../styles/Navbar/navbar.module.css';
import Image from 'next/Image';

const myLoader = ({ src, width, quality }: any) => {
  return `https://i.imgur.com/${src}?w=${width}&q=${quality || 75}`
}

const Navbar = () => {
  return (
    <div className={styles.navOutterContainer}>
      <nav className={styles.navbar}>
        <div className={styles.navbarLogoContainer}>
          <Image
          loader={myLoader}
          src="/Y8KaQBX.png"
          alt="Munch Hunt logo"
          width={70}
          height={70}
          />
          <div className={styles.munchHuntTitle}>Munch Hunt</div>
        </div>
        <div className={styles.navbarLinkContainer}>
          <Link href="/find"><a className={styles.navLinks}>Find</a></Link>
          <Link href="/results"><a className={styles.navLinks}>Results</a></Link>
          <Link href="/"><a className={styles.navLinks}>Logout</a></Link>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;