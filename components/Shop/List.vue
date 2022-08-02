<template>
  <div class="container">
    <h1>Shops List</h1>
    <div class="shops-list">
      <ShopCard
        v-for="shop in shops"
        :key="shop.shopName"
        :name="shop.shopName"
        :image="shop.shopImage"
        :rate="shop.rate"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    shops: {
      type: Array,
      required: true
    },
  }
})
</script>

<style scoped>
  h1 {
    font-size: 1.75rem;
  }

  .shops-list {
    width: 100%;
    display: grid;
    padding-bottom: 5rem;
    grid-template-rows: auto;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }

  @media screen and (min-width: 520px) {
    .shops-list { grid-template-columns: 1fr 1fr 1fr }
  }

  @media screen and (min-width: 920px) {
    .shops-list { grid-template-columns: 1fr 1fr 1fr 1fr }
  }

  @media screen and (min-width: 1200px) {
    .shops-list { grid-template-columns: 1fr 1fr 1fr 1fr 1fr }
  }
</style>
