import { useState, useEffect, useRef, useContext } from 'react';
import Image from 'next/image';
import Head from 'next/head';
import { useTheme } from 'next-themes';

import images from '../assets';
import { Banner, CreatorCard, Loader, NFTCard, SearchBar } from '../components';
import { shortenAddress } from '../utils/shortendAddress';
import { getCreators } from '../utils/getTopCreators';
// import { makeId } from '../utils/makeId';
import { NFTContext } from '../context/NFTcontext';

const Home = () => {
  const { theme } = useTheme();
  const parentRef = useRef(null);
  const scrollRef = useRef(null);
  const [nfts, setNfts] = useState([]);
  const [nftsCopy, setNftsCopy] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hideButtons, setHideButtons] = useState(false);
  const { fetchNFTs } = useContext(NFTContext);
  const [activeSelect, setActiveSelect] = useState('Recently added');

  const handleScroll = (direction) => {
    const { current } = scrollRef;

    const scrollAmount = window.innerWidth > 1800 ? 270 : 210;

    if (direction === 'left') {
      current.scrollLeft -= scrollAmount;
    } else {
      current.scrollLeft += scrollAmount;
    }
  };

  useEffect(() => {
    fetchNFTs()
      .then((items) => {
        setNfts(items.reverse());
        setNftsCopy(items);
        setIsLoading(false);

        // console.log(nfts);
      });
  }, []);

  const isScrollable = () => {
    const { current } = scrollRef;
    const { current: parent } = parentRef;

    if (current?.scrollWidth >= parent?.offsetWidth) return setHideButtons(false);
    return setHideButtons(true);
  };

  // if window is resized
  useEffect(() => {
    isScrollable();
    window.addEventListener('resize', isScrollable);

    return () => {
      window.removeEventListener('resize', isScrollable);
    };
  });

  const topCreators = getCreators(nftsCopy);

  useEffect(() => {
    const sortedNFTs = [...nftsCopy];

    switch (activeSelect) {
      case 'Price (low to high)':
        setNfts(sortedNFTs.sort((a, b) => a.price - b.price));
        break;
      case 'Price (high to low)':
        setNfts(sortedNFTs.sort((a, b) => b.price - a.price));
        break;
      case 'Recently added':
        setNfts(sortedNFTs.sort((a, b) => b.tokenId - a.tokenId));
        break;
      default:
        setNfts(nfts);
        break;
    }
  }, [activeSelect]);

  const onHandleSearch = (value) => {
    const filteredNFTs = nfts.filter(({ name }) => name.toLowerCase().includes(value.toLowerCase()));

    if (filteredNFTs.length) {
      setNfts(filteredNFTs);
    } else {
      setNfts(nftsCopy);
    }
  };

  const onClearSearch = () => {
    if (nfts.length && nftsCopy.length) {
      setNfts(nftsCopy);
    }
  };

  return (
    <div className="flex justify-center sm:px-4 p-12">
      <Head>
        <title>pokemonmarket.com</title>
        <meta
          name="description"
          content="Pokemon Market - Pokemon Market where you can buy and sell new NFTs."
        />
      </Head>
      <div className="w-full minmd:w-4/5">
        <Banner
          name={(<>Pokemon Market NFTs<br />Buys and Sells</>)}
          paraentStyles="justify-start mb-6 h-72 sm:h-60 p-12 xs:p-4 xs:h-44 rounded-3xl"
          childStyles="md:text-4xl sm:text-2xl xs:text-xl text-left"
        />

        {!isLoading && !nfts.length ? (
          <h1 className="font-poppins text-2xl minlg:text-4xl font-semibold ml-4 xs:ml-0">That&apos;s weird... No Pokemon NFTs for sale!</h1>
        ) : isLoading ? <Loader /> : (
          <>
            <div>
              <h1 className="font-poppins dark:text-white text-nft-black-1 text-2xl minlg:text-4xl font-semibold ml-4 xs:ml-0">Top Pokemon Trainer NFTs Sellers</h1>

              <div className="relative flex-1 max-w-full flex mt-3" ref={parentRef}>
                <div className="flex flex-row w-max overflow-x-scroll no-scrollbar select-none" ref={scrollRef}>
                  {topCreators.map((creator, i) => (
                    <CreatorCard
                      key={i}
                      rank={i + 1}
                      creatorImages={images[`creator${i + 1}`]}
                      creatorName={shortenAddress(creator.seller)}
                      creatorEths={creator.sumall}
                    />
                  ))}
                  {/* {[1, 2, 3, 4, 5, 6].map((i) => (
                    <CreatorCard
                      key={i}
                      rank={i}
                      creatorImages={images[`creator${i}`]}
                      creatorName={`0x${makeId(3)}...${makeId(4)}`}
                      creatorEths={10 - i * 0.5}
                    />
                  ))} */}

                  {!hideButtons && (
                  <>
                    <div
                      className="absolute w-8 h-8 minlg:w-12 minlg:h-12 top-45 left-0 cursor-pointer"
                      onClick={() => handleScroll('left')}
                    >
                      <Image
                        src={images.left}
                        layout="fill"
                        objectFit="contain"
                        alt="left_arrow"
                        className={theme === 'dark' ? '' : 'filter invert'}
                      />
                    </div>
                    <div
                      className="absolute w-8 h-8 minlg:w-12 minlg:h-12 top-45 right-0 cursor-pointer"
                      onClick={() => handleScroll('right')}
                    >
                      <Image
                        src={images.right}
                        layout="fill"
                        objectFit="contain"
                        alt="right_arrow"
                        className={theme === 'dark' ? '' : 'filter invert'}
                      />
                    </div>
                  </>
                  )}

                </div>
              </div>
            </div>

            <div className="mt-10">
              <div className="flexBetween mx-4 xs:mx-0 minlg:mx-8 sm:flex-col sm:items-start">
                <h1 className="flex-1 font-poppins dark:text-white text-nft-black-1 text-2xl minlg:text-4xl font-semibold sm:mb-4">Top Pokemon NFTs</h1>
                <div className="flex-2 sm:w-full flex flex-row sm:flex-col">
                  <SearchBar
                    activeSelect={activeSelect}
                    setActiveSelect={setActiveSelect}
                    handleSearch={onHandleSearch}
                    clearSearch={onClearSearch}
                  />
                </div>
              </div>
              <div className="mt-3 w-full flex flex-wrap justify-start md:justify-center">
                {nfts.map((nft) => <NFTCard key={nft.tokenId} nft={nft} />)}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
