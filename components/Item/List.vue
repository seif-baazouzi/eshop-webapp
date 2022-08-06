<template>
  <div class="container">
    <div v-if="items.length > 0">
      <h3>{{ title }}</h3>
      <div class="items-list">
        <ItemCard
          v-for="item in items"
          :key="item.itemID"
          :id="item.itemID"
          :name="item.itemName"
          :rate="item.rate"
          :price="item.itemPrice"
          :image="item.itemImage"
          :shopName="item.itemShop"
        />
      </div>
    </div>

    <div v-else class="message-container">
      <h1>There is no items yet!</h1>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    title: {
      type: String,
      default: "Items List"
    },
    items: {
      type: Array,
      required: true
    },
  }
})
</script>

<style scoped>
  .items-list {
    width: 100%;
    padding-bottom: 1rem;
    display: grid;
    grid-template-rows: auto;
    grid-template-columns: 1fr;
    gap: .25rem;
  }

  @media screen and (min-width: 520px) {
    .items-list { grid-template-columns: 1fr 1fr }
  }

  @media screen and (min-width: 920px) {
    .items-list { grid-template-columns: 1fr 1fr 1fr }
  }

  @media screen and (min-width: 1200px) {
    .items-list { grid-template-columns: 1fr 1fr 1fr 1fr }
  }
</style>
