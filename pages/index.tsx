import { useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Script from 'next/script'
import Landing from '../Components/Landing/Landing';

const Home: NextPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const places = `https://maps.googleapis.com/map/api/js?libraries=places&key${process.env.NEXT_PUBLIC_GOOGLE_API}&libraries=places`;

  return (
    <div>
      <Head>
        <title>Munch Hunt</title>
        <meta name="description" content="Munch Hunt helps you choose a restaurant when you are feeling indecisive" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Script src={places} />
      <Landing />
      {/* If logged in, then show contents of this page */}
      {/* If not logged in, redirect to Find */}
    </div>
  )
}

export default Home;
