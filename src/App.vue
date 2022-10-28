<template>
  <div id="app">
    <connect-button
      :provider='provider'
      @handleConnection='setSigner($event)'
    />
    <balance-table v-if='signer' :provider='provider' :signer='signer'/>
    <token-rate-table />
  </div>
</template>

<script>
  const { ethers } = require('ethers');
  import TokenRateTable from './components/TokenRateTable.vue';
  import BalanceTable from './components/BalanceTable.vue';
  import ConnectButton from './components/ConnectButton.vue';
  export default {
    components: {
      TokenRateTable,
      BalanceTable,
      ConnectButton,
    },
    mounted() {
      this.provider = new ethers.providers.Web3Provider(window.ethereum);
      console.log(this.provider);
    },
    data: () => {
      return {
        provider: {},
        signer: null,
      };
    },
    methods: {
      setSigner(value) {
        this.signer = value;
        console.log(this.signer);
      },
    },
  };
</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
