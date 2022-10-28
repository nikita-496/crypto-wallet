<template>
  <div>
    <button @click="connect">{{ setButtonInner }}</button>
  </div>
</template>

<script>
  export default {
    props: {
      provider: {
        type: Object,
        required: true,
      },
    },
    data: () => {
      return {
        account: null
      }
    },
    computed: {
      setButtonInner() {
        return this.account ? `${this.account[0]?.substring(0,8)}...` : 'Connect';
      },
    },
    methods: {
      async connect() {
        if (typeof window.ethereum !== 'undefined') {
          // MetaMask is installed!
          try {
            this.account = await window.ethereum.request({ method: 'eth_requestAccounts' });
            await this.provider.send('eth_requestAccounts', []);
            this.$emit('handleConnection', this.provider.getSigner(this.account[0]));
          } catch (error) {
            throw new Error('Error connecting ...');
          }
        }
      },
    },
  };
</script>

<style lang="scss" scoped></style>
