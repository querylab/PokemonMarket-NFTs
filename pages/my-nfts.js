import { useState, useEffect, useContext } from 'react';
import Image from 'next/image';

import { NFTContext } from '../context/NFTcontext';
import { NFTCard, Loader, Banner, SearchBar } from '../components';
import images from '../assets';
import { shortenAddress } from '../utils/shortendAddress';

const MyNFTs = () => {
  const { fetchMyNFTsOrListerNFTs, currentAccount } = useContext(NFTContext);
  const [nfts, setNfts] = useState([]);
  const [nftsCopy, setNftsCopy] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeSelect, setActiveSelect] = useState('Recently added');

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

  useEffect(() => {
    setIsLoading(true);
    fetchMyNFTsOrListerNFTs('fetchMyNFTs')
      .then((items) => {
        setNfts(items);
        setNftsCopy(items);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  }, []);

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

  if (isLoading) {
    return (
      <div className="flexStart min-h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <div className="w-full flex justify-start items-center flex-col min-h-screen">
      <div className="w-full flexCenter flex-col">
        <Banner
          name="Your Pokemon NFTs"
          childStyles="text-center mb-4"
          paraentStyles="h-80 justify-center"
        />

        <div className="flexCenter flex-col -mt-20 z-0">
          <div className="flexCenter w-40 h-40 sm:w-36 sm:h-36 p-1 dark:bg-nft-black-2 bg-white rounded-full">
            <Image src={images.creator1} className="rounded-full object-cover" />
          </div>
          <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-2xl mt-6">{shortenAddress(currentAccount)}</p>
        </div>
      </div>

      {!isLoading && !nfts.length && !nftsCopy.length ? (
        <div>
          <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-2xl mt-6">No Pokemon NFTs Owned</p>
        </div>
      ) : (
        <div className="sm:px-4 p-12 w-full minmd:w-4/5 flexCenter flex-col">
          <div className="flex-1 w-full flex flex-row sm:flex-col px-4 xs:px-0 minlg:px-8">
            <SearchBar
              activeSelect={activeSelect}
              setActiveSelect={setActiveSelect}
              handleSearch={onHandleSearch}
              clearSearch={onClearSearch}
            />
          </div>
          <div className="w-full flex flex-wrap mt-3">
            {nfts.map((nft) => <NFTCard key={nft.tokenId} nft={nft} onProfilePage />)}
          </div>
        </div>
      )}
    </div>
  );
};

export default MyNFTs;
