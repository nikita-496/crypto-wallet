import { getPrice } from "../utils/spotPrices"
import { provider } from "./_index"

class RateService {
  async getSpotTokenPrices() {
   return await getPrice(1, provider)
  }
}

export default new RateService()