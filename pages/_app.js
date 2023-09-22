import Head from 'next/head';
import Script from 'next/script';
import { ThemeProvider } from 'next-themes';
import NextNProgress from 'nextjs-progressbar';

import { NFTProvider } from '../context/NFTcontext';
import '../styles/globals.css';
import { Navbar, Footer } from '../components';

const App = ({ Component, pageProps }) => (
  <NFTProvider>
    <script async src="http://umami.thatquery.com:3000/script.js" data-website-id="c21f8651-2d3d-4557-92f8-ee5f8a54ecc0"></script>
    <ThemeProvider attribute="class">
      <div className="dark:bg-nft-dark bg-white min-h-screen">
      <script async src="http://umami.thatquery.com:3000/script.js" data-website-id="c21f8651-2d3d-4557-92f8-ee5f8a54ecc0"></script>
        <Head>
          <title>pokemonmarket.com</title>
          <meta
            name="description"
            content="Pokemon Market NFT where you can buy and sell new NFTs."
          />
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          <link rel="icon" href="/favicon.ico" />
          <script async src="http://umami.thatquery.com:3000/script.js" data-website-id="c21f8651-2d3d-4557-92f8-ee5f8a54ecc0"></script>        </Head>
        <NextNProgress
          color="#EB1484"
          startPosition={0.3}
          stopDelayMs={200}
          height={3}
          showOnShallow
          options={{ showSpinner: false }}
        />
        <Navbar />
        <div className="pt-65">
          <Component {...pageProps} />
        </div>
        <Footer />
      </div>

      <Script src="https://kit.fontawesome.com/d45b25ceeb.js" crossorigin="anonymous" />
    </ThemeProvider>
  </NFTProvider>
);

export default App;
