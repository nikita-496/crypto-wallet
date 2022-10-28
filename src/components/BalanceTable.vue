<template>
  <div>
    <h2>BalanceTable</h2>
  </div>
</template>

<script>
  import BalanceService from '../services/BalanceService'
  export default {
    props: {
      provider: {
        type: Object,
        required: true,
      },
      signer: {
        type: Object,
        required: true,
      },
    },
    data: () => {
      return {
        eathContract: null,
        usdcContract: null,
        daiContract: null,
      };
    },
    mounted() {
      (async () => {
        console.log(await BalanceService.read(await this.signer.getAddress())) 
      })()
    },
  };
</script>

<style scoped></style>
