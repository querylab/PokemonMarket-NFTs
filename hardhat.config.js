require('@nomicfoundation/hardhat-toolbox');

const privateKey = "Wallet Private key"; // my wallet private key polygon mumbai testnework
//  alchemy polygone mumbai testnet api key
const INFURA_API_KEY = "9cb128774f4b4f5797fc40a6ff71eded"; //Infura apikey

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
