const { default: axios } = require("axios");

exports.getAbi = async (address) => {
  const url = `https://api.etherscan.io/api?module=contract&action=getabi&address=${address}&apikey=GFWRWBQ8AE2A9HC8UZCQMPPRVHJH4BVMXR`
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