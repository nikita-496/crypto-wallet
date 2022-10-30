<template>
  <div>
    <input type="text" placeholder="0.0" v-model="amount" />
  </div>
</template>

<script>
  import RateService from '../services/RateService';
  export default {
    props: {
      filed: {
        type: String,
        required: false,
      },
      tokenName: {
        type: String,
        required: false,
      },
      signer: {
        type: Object,
        required: false,
      },
    },
    data: () => {
      return {
        amount: null,
      };
    },
    methods: {
      blurEventHandler() {
        console.log(this.amount);
      },
      /*async blurEventHandler() {
        return this.signer ? await RateService.read(this.amount, this,this.signer.getAddress) : null;
      },*/
    },
    watch: {
      async amount() {
        this.filed === 'input' ? await RateService.getSpotTokenPrices() : null;
      },
    },
  };
</script>

<style lang="scss" scoped></style>
