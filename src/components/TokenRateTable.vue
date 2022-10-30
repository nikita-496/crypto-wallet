<template>
  <div class="overflow-x-auto relative">
    <div v-if="tokens && !rate" class="flex justify-center items-center">
      <div
        class="absolute top-1 right-40 animate-spin rounded-full h-5 w-5 border-b-2 border-gray-200"
      ></div>
    </div>
    <span v-if="tokens && !rate" class="absolute top-1 right-10 font-normal text-xs text-gray-200"
      >Fetching best price...</span
    >
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400 mt-5">
      <thead>
        <tr class="border-b border-gray-800">
          <th scope="col" class="py-3 px-6">#</th>
          <th scope="col" class="py-3 px-6">Name</th>
          <th scope="col" class="py-3 px-6">Rate</th>
          <th v-if="signer" scope="col" class="py-3 px-6">Balance</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="n in 3" :key="n" class="border-b border-gray-800">
          <th
            id="serial"
            scope="row"
            class="py-4 px-6 font-medium text-white whitespace-nowrap dark:text-white"
          >
            {{ n }}
          </th>
          <td id="name" class="py-4 px-6">
            <img
              v-if="tokens"
              class="inline"
              :src="require('@/assets/Cryptocurrency-' + tokens[n - 1].symbol + '.svg')"
              :alt="tokens[n - 1].name"
            />
            {{ tokens?.[n - 1].name }}
            <span class="text-gray-500">({{ tokens?.[n - 1].symbol }})</span>
          </td>
          <td id="rate" class="text-lg py-4 px-6">
            <img
              v-if="tokens && !rate"
              class="inline"
              :src="require('@/assets/Cryptocurrency-' + tokens[3].symbol + '.svg')"
              :alt="tokens[n - 1].name"
            />
            {{ rate?.[n - 1] }}
          </td>
          <td id="balance" class="py-4 px-6" v-if="signer">
            <div v-if="!balances" class="flex justify-center items-center">
              <div class="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-200"></div>
            </div>
            <span v-else> {{ balances?.[n - 1].value }}</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  import tokens from '../assets/Contract_Information.json';
  import RateService from '../services/RateService';
  import BalanceService from '../services/BalanceService';
  export default {
    mounted() {
      (async () => {
        this.rate = await RateService.getSpotTokenPrices(1);
      })();
      this.tokens = tokens;
    },
    props: {
      signer: {
        type: Object,
        required: false,
      },
    },
    data: () => {
      return {
        tokens: null,
        balances: null,
        rate: null,
      };
    },
    watch: {
      signer: async function () {
        if (this.signer) {
          this.balances = await BalanceService.read(await this.signer.getAddress());
        }
      },
    },
  };
</script>

<style scoped></style>
