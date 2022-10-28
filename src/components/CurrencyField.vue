<template>
  <div>
    <input type="text" v-model="amount">
  </div>
</template>

<script>
  export default {
    props: {
      tokenName: {
        type: String,
        required: true,
      },
    },
    data: () => {
      return {
        amount: 0
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>