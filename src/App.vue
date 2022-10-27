<template>
  <div id="app">
    <button @click="connect">{{ setButtonInner }}</button>
    <balance-table v-if="isConnected" />
    <token-rate-table />
  </div>
</template>

<script>
  import TokenRateTable from './components/TokenRateTable.vue';
  import BalanceTable from './components/BalanceTable.vue';
  export default {
    components: {
      TokenRateTable,
      BalanceTable,
    },
    data: () => {
      return {
        account: null,
        isConnected: false,
      };
    },
    computed: {
      setWalletAdrdess() {
        const walletAdress = this.account[0].split('')
        walletAdress.splice(4, walletAdress.length - 8, '...')
        return walletAdress.join('')
      },
      setButtonInner() {
        return this.isConnected ? this.setWalletAdrdess : 'Connect';
      },
    },
    methods: {
      async connect() {
        if (typeof window.ethereum !== 'undefined') {
          // MetaMask is installed!
          try {
            this.account = await window.ethereum.request({ method: 'eth_requestAccounts' });
            this.isConnected = true;
          } catch (error) {
            throw new Error('Error connecting ...');
          }
        }
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
