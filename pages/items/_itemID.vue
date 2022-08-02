<template>
  <div>
    <NavBar/>
    <div class="container">
      <img :src="apiServer + '/images/' + item.itemImage" alt="">
      <div class="content">
        <h1>{{ item.itemName }}</h1>
        <div class="price">{{ item.itemPrice }} dt</div>
        <Rate :value="item.rate" />
        <h4>Description:</h4>
        <p>{{ item.itemDescription }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { apiServer } from "../../config/config"

export default {
  name: "Item",

  data() {
    return {
      item: {}
    }
  },

  created() {
    this.apiServer = apiServer
  },

  async fetch() {    
    const res = await fetch(`${apiServer}/items/${this.$route.params.itemID}`)
    const { item } = await res.json()

    this.item = item
  },
}
</script>

<style scoped>
  .price {
    font-size: .75rem;
    font-weight: bold;
    color: var(--dark-gray);
  }

  p {
    color: var(--dark-gray);
  }

  @media screen and (min-width: 768px) {
    .container {
      display: flex;
      align-items: flex-start;
      gap: 1rem;
    }

    img {
      width: 60%;
      border-radius: .5rem;
    }

    .content {
      width: 40%;
    }
  }
</style>
