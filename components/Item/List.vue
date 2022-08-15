<template>
  <div class="container">
    <div v-if="items.length > 0">
      <div class="header">
        <h3>{{ title }}</h3>
        <NuxtLink to="/items" v-if="seeMore && items.length >= 4">
          <button class="blue-outline">See more</button>
        </NuxtLink>
      </div>

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
      <ItemsIcon />
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
    seeMore: {
      type: Boolean,
      default: false,
    },
  }
})
</script>

<style scoped>
  .header {
    padding: .75rem 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  
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
