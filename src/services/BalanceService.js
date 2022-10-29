import { tokenContracts, format } from './_index';

class BalanceService {
  async read(walletAddress) {
    let balances = await Promise.all(
      tokenContracts.map(async (contract) => {
        const entries = Object.entries(contract);
        return {
          token: entries[0][0],
          value: format(await entries[0][1].balanceOf(walletAddress)),
        };
      })
    );
    return balances;
  }
}

export default new BalanceService();
