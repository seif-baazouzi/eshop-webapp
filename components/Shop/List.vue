<template>
  <div class="container">
    <div v-if="shops.length > 0">
      <h3>{{ title }}</h3>
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

    <div v-else class="message-container">
      <h1>There is no shops yet!</h1>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    title: {
      type: String,
      default: "Shops List"
    },
    shops: {
      type: Array,
      required: true
    },
  }
})
</script>

<style scoped>
  .shops-list {
    width: 100%;
    padding-bottom: 1rem;
    display: grid;
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
