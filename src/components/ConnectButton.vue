<template>
  <div>
    <button
      class="relative border border-gray-700 outline-none px-6 py-2 font-poppins font-bold text-lg text-white rounded-3xl leading-[24px] hover:bg-pink-600 transition-all"
      @click="action"
    >
      {{ setButtonInner }}
    </button>
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
        account: null,
      };
    },
    computed: {
      setButtonInner() {
        return this.account ? `${this.account[0]?.substring(0, 8)}...` : 'Connect';
      },
    },
    methods: {
      action() {
        if (this.account) {
          this.account = null;
          this.$emit('handleLogout', this.account);
        } else {
          this.connect();
        }
      },
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
        else {
            this.$emit('opneModal');
          }
      },
    },
  };
</script>
