<template>
  <div class="absolute  flex items-center bg-currant outline-none pl-4 pr-32 py-4 font-poppins font-bold rounded-xl opacity-90 hover:bg-hoverCurrant">
    <img src="../assets/metamask.png" alt="MetaMask logo" class="w-7 h-7 inline">
    <a  href="https://metamask.io/" target="_blank" class="ml-3 text-white hover:text-blue-500">Install MetaMask</a>
    <span class="absolute right-4 border rounded-full h-4 w-4 flex items-center justify-center text-white text-xs font-light cursor-pointer" @click="close">x</span>
  </div>
</template>

<script>
  export default {
    methods: {
      close() {
        this.$emit('closeModal');
      }
    }
  }
</script>