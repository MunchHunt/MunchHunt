import React from 'react';
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav>
      <Link href="/"><a>Landing</a></Link>
      <Link href="/Find"><a>Find</a></Link>
      <Link href="/Results"><a>Results</a></Link>
    </nav>
  );
};

export default Navbar;