const { ethers } = require('ethers');
const { getAbi } = require('./pool');

export const formTokens = async (poolContract, provider) => {
  const tokenAddress0 = await poolContract.token0();
  const tokenAddress1 = await poolContract.token1();

  const tokenAbi0 = await getAbi(tokenAddress0);
  const tokenAbi1 = await getAbi(tokenAddress1);

  console.log(tokenAddress0, tokenAddress1)

  const tokenContract0 = new ethers.Contract(tokenAddress0, tokenAbi0, provider);
  const tokenContract1 = new ethers.Contract(tokenAddress1, tokenAbi1, provider);

  const tokenSymbol0 = (await tokenContract0.symbol) ? await tokenContract0.symbol() : 'USDC';
  const tokenSymbol1 = await tokenContract1.symbol();
  const tokenDecimals0 = (await tokenContract0.decimals) ? await tokenContract0.decimals() : 6;
  const tokenDecimals1 = await tokenContract1.decimals();

  return { tokenDecimals0, tokenDecimals1, tokenSymbol0, tokenSymbol1 };
};