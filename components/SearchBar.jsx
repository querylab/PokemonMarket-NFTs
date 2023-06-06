import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useTheme } from 'next-themes';

import images from '../assets';

const SearchBar = ({ activeSelect, setActiveSelect, handleSearch, clearSearch }) => {
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const { theme } = useTheme();
  const [toogle, setToogle] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(debouncedSearch);
    }, 1000);

    return () => clearTimeout(timer);
  }, [debouncedSearch]);

  useEffect(() => {
    if (search) {
      handleSearch(search);
    } else {
      clearSearch();
    }
  }, [search]);

  return (
    <>
      <div className="flex-1 flexCenter dark:bg-nft-black-2 bg-white border dark:border-nft-black-2 border-nft-gray-2 py-3 px-4 rounded-md">
        <Image
          src={images.search}
          alt="search"
          width={20}
          height={20}
          objectFit="contain"
          className={theme === 'light' ? 'filter invert' : ''}
        />
        <input
          type="text"
          placeholder="Search Pokemon NFTs "
          className="dark:bg-nft-black-2 bg-white mx-4 w-full dark:text-white text-nft-black-1 font-normal text-xs outline-none"
          onChange={(e) => setDebouncedSearch(e.target.value)}
          value={debouncedSearch}
        />
      </div>

      <div
        onClick={() => setToogle((prev) => !prev)}
        className="relative flexBetween ml-4 sm:ml-0 sm:mt-2 min-w-190 cursor-pointer dark:bg-nft-black-2 bg-white border dark:border-nft-black-2 border-nft-gray-2 py-3 px-4 rounded-md"
      >
        <p className="font-poppins dark:text-white text-nft-black-1 font-normal text-xs">{activeSelect}</p>
        <Image
          src={images.arrow}
          objectFit="contain"
          width={15}
          height={15}
          alt="arrow"
          className={theme === 'light' ? 'filter invert' : undefined}
        />
        {toogle && (
        <div className="absolute top-full left-0 right-0 w-full mt-3 z-10 dark:bg-nft-black-2 bg-white border dark:border-nft-black-2 border-nft-gray-2 py-3 px-4 rounded-md">
            {['Recently added', 'Price (low to high)', 'Price (high to low)'].map((item) => (
              <p
                key={item}
                className="font-poppins dark:text-white text-nft-black-1 font-normal text-xs my-3 cursor-pointer"
                onClick={() => setActiveSelect(item)}
              >
                {item}
              </p>
            ))}
        </div>
        )}
      </div>

    </>
  );
};

export default SearchBar;
