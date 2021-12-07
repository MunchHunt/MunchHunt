import { useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';

const Landing: NextPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  return (
    <div>
      <Head>
        <title>Munch Hunt</title>
        <meta name="description" content="Munch Hunt helps you choose a restaurant when you are feeling indecisive" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Munch Hunt</h1>
      {/* If logged in, then show contents of this page */}
      {/* If not logged in, redirect to Find */}
    </div>
  )
}

export default Landing;
