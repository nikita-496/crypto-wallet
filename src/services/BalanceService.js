import { format, provider, contract } from './_index';

class BalanceService {
  async read(walletAddress, tokenSymbol) {
    let balance = null;
    switch (tokenSymbol) {
      case 'USDC':
        balance = await contract[1].balanceOf(walletAddress);
        break;
      case 'DAI':
        balance = await contract[2].balanceOf(walletAddress);
        break;
      case 'USDT':
        balance = await contract[3].balanceOf(walletAddress);
        break;
      default:
        balance = await provider.getBalance(walletAddress);
        break;
    }
    return format(balance);
  }
}

export default new BalanceService();
