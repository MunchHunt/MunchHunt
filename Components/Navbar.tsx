import React from 'react';
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav>
      <Link href="/"><a>Landing</a></Link>
      <Link href="/find"><a>Find</a></Link>
      <Link href="/results"><a>Results</a></Link>
    </nav>
  );
};

export default Navbar;