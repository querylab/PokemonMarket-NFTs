# PokemonMarket-NFTs 🛒💎🖼️

The PokemonMarket-NFTs project relies on several technologies for its operation. Solidity is used to develop the smart contracts that enable secure and reliable interaction on the platform. In addition, Metamask Wallet is used to facilitate transaction management and interaction with the blockchain. For data storage, use is made of IPFS through the Infura network, which enables decentralized and secure distribution of information related to Pokémon NFTs. On the other hand, the user interface development is done using Next.js, React.js and Node.js, which provides a dynamic and engaging experience for users. In terms of infrastructure, the project is implemented on the Polygon Mumbai test network, a scalable and efficient network. It should be noted that the configuration of this network can be modified according to the needs of the project. Together, these technologies enable the secure buying, selling and trading of Pokémon NFTs in the market.


## Setting Up
---
## 1. Clone the repository
## 2. Install dependencies
```bash
$ cd PokemonMarket-NFTs
$ npm install --save-dev hardhat
$ npm install --save dotenv @nomiclabs/hardhat-etherscan @openzeppelin/contracts @nomicfoundation/hardhat-chai-matchers @nomicfoundation/hardhat-toolbox 
```
## 3. Change variables in Files
```bash
# hardhat.config.js
$ INFURA_API_KEY
$ privateKey
# context/NFTcontext.js
$ infuraProjectId
$ infuraProjectSecret
$ INFURA_API_KEY
```

## 4. Deployment Solidity Contract Addresses
```bash
$ npx hardhat clean
$ npx hardhat compile
```

``` bash
$ npx hardhat run scripts/deploy.js --network mumbai
```

<a href="https://imgur.com/fLSnZGm"><img src="https://i.imgur.com/fLSnZGm.gif" title="source: imgur.com" /></a>


``` bash

After deploying the PokemonMarket.sol replace this address in the context/contants.js file with the variable:

export const MarketAddress = "0x88634c8743d9c13b72c407c355Dc4E08f2Ba1025"; //Contract Address for PokemonMarket.sol

```

## 5. Localhost Deployment

``` bash

npm run dev

http://localhost:3000/

```

<a href="https://imgur.com/Kx1tbHr"><img src="https://i.imgur.com/Kx1tbHr.gif" title="source: imgur.com" /></a>






































