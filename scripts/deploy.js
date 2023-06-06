const hre = require('hardhat');

const main = async () => {
  const [deployer] = await ethers.getSigners();
  const PokemonMarket = await hre.ethers.getContractFactory('PokemonMarket');
  const NFTPokemonMarket = await PokemonMarket.deploy();

  await NFTPokemonMarket.deployed();
  
//Consol View
console.log("***********************************************************************************");
console.log("Deploying contracts with the account:", deployer.address);
console.log("Account balance:", (await deployer.getBalance()).toString());
console.log("***********************************************************************************\n");
console.log(`PokemonMarket Contract: `,"\n");
console.log(`${NFTPokemonMarket.address}`,"\n");
console.log("***********************************************************************************");
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
