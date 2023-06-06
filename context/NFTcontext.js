import React, { useState, useEffect } from 'react';
import Web3Model from 'web3modal';
import { ethers } from 'ethers';
import axios from 'axios';
import { create as ipfsHttpClient } from 'ipfs-http-client';

import { MarketAddress, MarketABI } from './constants';

const infuraProjectId = "2QO8j6ByOSzgN1kGA3kMvizsAwI"; //IPFS APIKEY Infura
const infuraProjectSecret = "775a10671a6615ead6010a75bc9321ce"; //IPFS API Key Secret Infura
const INFURA_API_KEY = "9cb128774f4b4f5797fc40a6ff71eded"; //INFURA API KEY Web3API

const client = ipfsHttpClient({
  url: 'https://ipfs.infura.io:5001', //IPFS API Endpoint On Infura
  headers: {
    authorization: `Basic ${Buffer.from(`${infuraProjectId}:${infuraProjectSecret}`).toString('base64')}`,
  },
});

const fetchContract = async (signer) => new ethers.Contract(MarketAddress, MarketABI, signer);

export const NFTContext = React.createContext();

export const NFTProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState('');
  const [isLoadingNFT, setIsLoadingNFT] = useState(false);
  const nftCurrency = 'MATIC';

  const uploadToIPFS = async (file) => {
    try {
      const add = await client.add({ content: file });

      const url = `https://cloudflare-ipfs.com/ipfs/${add.path}`;

      return url;
    } catch (error) {
      console.log('Error: Uploading image to ipfs: ', error);
    }
  };

  const createSale = async (url, formInputPrice, isReselling, id) => {
    const web3modal = new Web3Model();
    const connection = await web3modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    const price = ethers.utils.parseUnits(formInputPrice.toString(), 'ether');
    const contract = await fetchContract(signer);
    const listingPrice = await contract.getListingPrice();

    const transaction = !isReselling
      ? await contract.createToken(url, price, { value: listingPrice.toString() })
      : await contract.resellToken(id, price, { value: listingPrice.toString() });

    setIsLoadingNFT(true);
    await transaction.wait();
  };

  const createNFT = async (formInput, fileUrl, router) => {
    const { name, description, price } = formInput;

    if (!name || !price || !fileUrl) return console.log('Please fill all fields');

    const data = JSON.stringify({ name, description, image: fileUrl });

    try {
      const add = await client.add(data);

      const url = `https://cloudflare-ipfs.com/ipfs/${add.path}`;

      await createSale(url, price);

      router.push('/');
    } catch (error) {
      console.log('Error: Uploading file to ipfs: ', error);
    }
  };

  const fetchNFTs = async () => {
    setIsLoadingNFT(false);
    const provider = new ethers.providers.JsonRpcProvider(`https://polygon-mumbai.infura.io/v3/${INFURA_API_KEY}`);
    const contract = await fetchContract(provider);

    const data = await contract.fetchMarketItems();

    const items = await Promise.all(data.map(async ({ tokenId, seller, owner, price: unformattedPrice }) => {
      const tokenURI = await contract.tokenURI(tokenId);
      const { data: { image, name, description } } = await axios.get(tokenURI);
      const price = ethers.utils.formatUnits(unformattedPrice.toString(), 'ether');

      return {
        tokenId: tokenId.toNumber(),
        seller,
        owner,
        price,
        image,
        name,
        description,
        tokenURI,
      };
    }));

    return items;
  };

  const fetchMyNFTsOrListerNFTs = async (type) => {
    setIsLoadingNFT(false);
    const web3modal = new Web3Model();
    const connection = await web3modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    const contract = await fetchContract(signer);

    const data = type === 'fetchItemsListed'
      ? await contract.fetchItemsListed()
      : await contract.fetchMyNFTs();

    const items = await Promise.all(data.map(async ({ tokenId, seller, owner, price: unformattedPrice }) => {
      const tokenURI = await contract.tokenURI(tokenId);
      const { data: { image, name, description } } = await axios.get(tokenURI);
      const price = ethers.utils.formatUnits(unformattedPrice.toString(), 'ether');

      return {
        tokenId: tokenId.toNumber(),
        seller,
        owner,
        price,
        image,
        name,
        description,
        tokenURI,
      };
    }));

    return items;
  };

  const buyNFT = async (nft) => {
    try {
      const web3modal = new Web3Model();
      const connection = await web3modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();

      const contract = await fetchContract(signer);

      const price = ethers.utils.parseUnits(nft.price.toString(), 'ether');
      const transaction = await contract.createMarketSale(nft.tokenId, { value: price });

      setIsLoadingNFT(true);
      await transaction.wait();
      setIsLoadingNFT(false);
    } catch (error) {
      console.log('Error: Buying NFT: ', error);
    }
  };

  const checkIfWalletIsConnected = async () => {
    if (!window.ethereum) return console.log('Make sure you have metamask!');

    const accounts = await window.ethereum.request({ method: 'eth_accounts' });
    if (accounts.length) {
      setCurrentAccount(accounts[0]);
    } else {
      console.log('No accounts found!');
    }
    window.ethereum.on('accountsChanged', () => {
      console.log('Accounts changed, reloading page...');
      window.location.reload();
    });
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  const connectWallet = async () => {
    try {
      if (!window.ethereum) return console.log('Make sure you have metamask!');

      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

      setCurrentAccount(accounts[0]);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <NFTContext.Provider value={{ nftCurrency, connectWallet, currentAccount, uploadToIPFS, createSale, createNFT, fetchNFTs, fetchMyNFTsOrListerNFTs, buyNFT, isLoadingNFT }}>
      {children}
    </NFTContext.Provider>
  );
};
