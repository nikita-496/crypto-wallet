const { ethers } = require('ethers');
const ERC_20_ABI = require('../assets/ERC_20_ABI.json');
const Contract_information = require('../assets/Contract_Information.json');

const baseURL = `https://mainnet.infura.io/v3/${process.env.VUE_APP_INFURA_KEY}`;

const provider = new ethers.providers.JsonRpcProvider(baseURL);

const format = ethers.utils.formatUnits;

const tokenContracts = Contract_information.map((token) => {
  const tokenSymbol = token.symbol;
  return {
    [tokenSymbol]: new ethers.Contract(token.address, ERC_20_ABI[0][tokenSymbol], provider),
  };
});

export { provider, format, tokenContracts };
