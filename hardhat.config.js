require('@nomicfoundation/hardhat-toolbox');

const privateKey = "9a94708686492200cf3b9ec1245439a77f67d89b566595947eb2436ae46df2598"; // my wallet private key polygon mumbai testnework
//  alchemy polygone mumbai testnet api key
const INFURA_API_KEY = "9cb121174f234f66797fc40a6ff71eded"; //Infura apikey

module.exports = {
  solidity: '0.8.10',
  networks: {
    hardhat: {},
    mumbai: {
      url: `https://polygon-mumbai.infura.io/v3/${INFURA_API_KEY}`,
      accounts: [privateKey],
    },
  },
};
