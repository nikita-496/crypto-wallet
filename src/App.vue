<template>
  <div id="app" class="flex flex-col justify-center min-h-screen sm:px-16 px-6 bg-black-app">
    <header class="relative flex flex-row justify-between items-center w-full sm:py-10 py-6">
      <img class="w-16 h-16 object-contain" src="./assets/uniswapLogo.png" alt="uniswap logo" />
      <transition name="slide" appear>
        <modal class="modal" v-if="showModal" @closeModal="() => (this.showModal = false)" />
      </transition>
      <div class="ml-10 flex items-center">
        <span class="relative flex h-2 w-2">
          <span
            class="absolute inline-flex h-full w-full rounded-full"
            :class="signer ? 'animate-ping bg-green-400 opacity-75' : 'bg-green-500'"
          ></span>
          <span
            class="relative inline-flex rounded-full h-2 w-2"
            :class="signer ? 'bg-green-500' : 'bg-yellow-700'"
          ></span>
        </span>
        <span class="text-sm ml-2" :class="signer ? 'text-green-500 ' : 'text-yellow-700'">{{
          signer ? 'Wallet connected' : 'Wallet not connected'
        }}</span>
      </div>
      <connect-button
        :provider="provider"
        @handleConnection="setSigner($event)"
        @handleLogout="setSigner($event)"
        @opneModal="() => this.showModal = true"
      />
    </header>
    <main class="flex-1 flex justify-start items-center flex-col w-full">
      <h1 class="text-white font-poppins font-semibold text-5xl tracking-wide">Uniswap 3.0</h1>
      <p class="text-white font-medium mt-3 text-base mb-10">Exchange rate of 1 coin to USDT</p>

      <div class="relative w-3/5 rounded-3xl">
        <div class="pink_gradient"></div>
        <div class="bg-blackberry backdrop-blur-[4px] rounded-3xl shadow-card flex-1 p-10">
          <token-rate-table :signer="signer" />
        </div>
        <div class="blue_gradient"></div>
      </div>
    </main>
  </div>
</template>

<script>
  const { ethers } = require('ethers');
  import TokenRateTable from './components/TokenRateTable.vue';
  import ConnectButton from './components/ConnectButton.vue';
  import Modal from './components/Modal.vue';
  export default {
    components: {
      TokenRateTable,
      ConnectButton,
      Modal,
    },
    mounted() {
      this.provider = new ethers.providers.Web3Provider(window.ethereum);
    },
    data: () => {
      return {
        provider: {},
        signer: null,
        showModal: false
      };
    },
    methods: {
      setSigner(value) {
        this.signer = value;
      },
    },
  };
</script>

<style scoped>
  .modal {
    right: 35vw;
    z-index: 999;
  }
  .slide-enter-active,
  .slide-leave-active {
    transition: transform 0.5s;
  }
  .slide-enter,
  .slide-leave-to {
    transform: translateX(-20%) translateY(-100vh);
  }
</style>
