const { ethers } = require('ethers');
import { abi as IUniswapV3PoolABI } from '@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Pool.sol/IUniswapV3Pool.json';
import { abi as QuoterABI } from '@uniswap/v3-periphery/artifacts/contracts/lens/Quoter.sol/Quoter.json';
import { formTokens } from './pairTokens';

const { getPoolImmutables } = require('./pool');

const pollAddress = {
  // ETH ---> USDT
  ETH_USDT: '0x11b815efb8f581194ae79006d24e0d814b7697f6',

  // USDC ---> USDT
  USDC_USDT: '0x3416cf6c708da44db2624d63ea0aaef7113527c6',

  // DAI---> USDT
  DAI_USDT: '0x48da0965ab2d2cbf1c17c09cfb5cbe67ad5b1406',

  // TEST
  // WBETHTC ---> ETH
  // WBETHTC_ETH: '0xcbcdf9626bc03e24f779434178a73a0b4bad62ed'
};

const format = (value, type) => {
  let formatedValue = value
  if(type === 'WETH') {
    formatedValue = Number(formatedValue).toFixed(2).toString()
    formatedValue = formatedValue.split('')
    formatedValue.splice(1, 0, ',')
    return formatedValue.join('')
  }
  return Number(formatedValue).toFixed(5).toString()
}

const init = async (input, provider, address) => {
  // https://docs.uniswap.org/protocol/reference/deployments
  const quoterAddress = '0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6';
  const poolContract = new ethers.Contract(address, IUniswapV3PoolABI, provider);

  const { tokenDecimals0, tokenDecimals1, tokenSymbol0, /*tokenSymbol1*/ } = await formTokens(
    poolContract,
    provider
  );

  const quoterContract = new ethers.Contract(quoterAddress, QuoterABI, provider);

  const immutables = await getPoolImmutables(poolContract);

  const amountIn = ethers.utils.parseUnits(input.toString(), tokenDecimals0);

  // 100000000 --> 1 WBTC
  // 1000000000000000000 --> 1 ETH

  const quotedAmountOut = await quoterContract.callStatic.quoteExactInputSingle(
    immutables.token0,
    immutables.token1,
    immutables.fee,
    amountIn,
    0
  );

  const amountOut = ethers.utils.formatUnits(quotedAmountOut, tokenDecimals1);

  /*console.log('==========');
  console.log(`${input} ${tokenSymbol0} can be swapped for ${amountOut} ${tokenSymbol1}`);
  console.log('==========');*/

  return format(amountOut, tokenSymbol0) ;
};

const getPrice = async (input, provider) => {
  var prices = [];
  for (let address in pollAddress) {
    prices.push(await init(input, provider, pollAddress[address]));
  }
  return prices;
};

export { getPrice };
