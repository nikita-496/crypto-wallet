const { default: axios } = require("axios");
const config = require('./config/config')

exports.getAbi = async (address) => {
  const url = `https://api.etherscan.io/api?module=contract&action=getabi&address=${address}&apikey=${config.VUE_APP_ETHERSCAN_API_KEY}`
  const response = await axios.get(url)
  const abi = JSON.parse(response.data.result)
  return abi
}


exports.getPoolImmutables = async (poolContract) => {
  const [token0, token1, fee] = await Promise.all([
    poolContract.token0(),
    poolContract.token1(),
    poolContract.fee(),
  ]);

  // https://etherscan.io/address/0x3416cf6c708da44db2624d63ea0aaef7113527c6
  const immutables = {
    token0,
    token1,
    fee,
  };

  return immutables;
};