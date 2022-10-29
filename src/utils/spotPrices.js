const { ethers } = require('ethers');
import { abi as IUniswapV3PoolABI } from '@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Pool.sol/IUniswapV3Pool.json';
import { abi as QuoterABI } from '@uniswap/v3-periphery/artifacts/contracts/lens/Quoter.sol/Quoter.json';
import { formTokens } from './pairTokens';

const { getPoolImmutables } = require('./pool');

// ETH ---> USDT [+]
const poolAddress_ETH_USDT = '0x11b815efb8f581194ae79006d24e0d814b7697f6';

// USDC ---> USDT
// incorrect value. USDC has no contract data --> https://etherscan.io/address/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48#readContract
//const poolAddress_USDC_USDT = '0x3416cf6c708da44db2624d63ea0aaef7113527c6';

// DAI---> USDT [+]
//const poolAdress_DAI_USDT = '0x6f48eca74b38d2936b02ab603ff4e36a6c0e3a77';

// TEST
// WBETHTC ---> ETH
//const poolAddress1 = '0xcbcdf9626bc03e24f779434178a73a0b4bad62ed';

const getPrice = async (input, provider) => {
  // https://docs.uniswap.org/protocol/reference/deployments
  const quoterAddress = '0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6';
  const poolContract = new ethers.Contract(poolAddress_ETH_USDT, IUniswapV3PoolABI, provider);

  const { tokenDecimals0, tokenDecimals1, tokenSymbol0, tokenSymbol1 } = await formTokens(
    poolContract, provider
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

  console.log('==========');
  console.log(`${input} ${tokenSymbol0} can be swapped for ${amountOut} ${tokenSymbol1}`);
  console.log('==========');
};

export { getPrice };