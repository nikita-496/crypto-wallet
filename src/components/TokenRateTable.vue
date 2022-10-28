<template>
  <div>
    <h2>TokenRateTable</h2>
    <currency-field tokenName='ETH'/>
    <currency-field tokenName='USDC '/>
    <currency-field tokenName='DAI'/>
  </div>
</template>

<script>
  import CurrencyField from './CurrencyField.vue';
  export default {
     components: {
      CurrencyField,
    },
  };
</script>

<style scoped></style>
