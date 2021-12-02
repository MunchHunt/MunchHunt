import React from 'react';
import Link from 'next/link';
import styles from '../styles/Navbar/navbar.module.css';

const Navbar = () => {
  return (
    <div className={styles.navOutterContainer }>
      <nav className={styles.navbar}>
        <div className={styles.navbarLogoContainer}>
          Munch Hunt
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