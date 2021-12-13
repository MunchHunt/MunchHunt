import '../styles/globals.css'
import Layout from '../Components/Layout'
import type { AppProps } from 'next/app'
import { MunchProvider } from '../Components/Contexts/MunchContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MunchProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </MunchProvider>
  )
}

export default MyApp
