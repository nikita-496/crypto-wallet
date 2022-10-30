import { getPrice } from "../utils/spotPrices"
import { provider } from "./_index"

class RateService {
  async getSpotTokenPrices(amount) {
   return await getPrice(amount, provider)
  }
}

export default new RateService()