import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import axios from 'axios';

import { NFTContext } from '../context/NFTcontext';
import { Input, Loader, Button } from '../components';

const ResellNFT = () => {
  const { createSale, isLoadingNFT } = useContext(NFTContext);
  const router = useRouter();
  const { tokenId, tokenURI } = router.query;
  const [price, setPrice] = useState(null);
  const [image, setImage] = useState('');

  const fetchNFT = async () => {
    if (!tokenURI) return;
    const { data } = await axios.get(tokenURI);

    setImage(data.image);
    setPrice(data.price);
  };

  useEffect(() => {
    if (tokenURI) fetchNFT();
  }, [tokenURI]);

  const resell = async () => {
    try {
      await createSale(tokenURI, price, true, tokenId);
      router.push('/');
    } catch (error) {
      console.log('Error: Resell NFT: ', error);
    }
  };

  if (isLoadingNFT) {
    return (
      <div className="flexStart min-h-screen">
        <Loader />
      </div>
    );
  }

  if (!tokenId || !tokenURI) return <div>Invalid Token</div>;

  return (
    <div className="flex justify-center sm:px-4 p-12">
      <div className="w-3/5 md:w-full">
        <h1 className="font-poppins dark:text-white text-nft-black-1 font-semibold text-2xl">Resell Pokemon NFT</h1>

        <Input
          inputType="number"
          title="Pokemon NFT Price"
          placeholder="NFT price"
          handleClick={(e) => setPrice(e.target.value)}
        />

        {image && (
          <div className="mt-4">
            <Image
              src={image}
              alt="Pokemon NFT Image"
              className="rounded-xl"
              width={350}
              height={350}
            />
          </div>
        )}

        <div className="mt-7 flex w-full justify-end">
          <Button
            btnName="Pokemon Resell NFT"
            classStyles="rounded-xl"
            handleClick={resell}
          />
        </div>
      </div>
    </div>
  );
};

export default ResellNFT;
