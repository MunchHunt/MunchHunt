import React from 'react';
import Link from 'next/link';
import styles from '../styles/Navbar/navbar.module.css';

const Navbar = () => {
  return (
    <div className={styles.navOutterContainer }>
      <nav className={styles.navbar}>
        <div className={styles.navbarLogoContainer}>
          Logo
        </div>
        <div className={styles.navbarLinkContainer}>
          <Link href="/"><a>Landing</a></Link>
          <Link href="/find"><a>Find</a></Link>
          <Link href="/results"><a>Results</a></Link>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;