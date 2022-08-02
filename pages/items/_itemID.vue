<template>
  <div>
    <NavBar/>
    <div class="container">
      <img :src="apiServer + '/images/' + item.itemImage" alt="">
      <div class="content">
        <Rate :value="item.rate" />
        <h1>{{ item.itemName }}</h1>
        <div class="price">{{ formatPrice(item.itemPrice) }} dt</div>
        <div class="description">
          <h5>Description:</h5>
          <p>{{ item.itemDescription }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { apiServer } from "../../config/config"
import formatPrice from "../../utils/format-price"

export default {
  name: "Item",

  data() {
    return {
      item: {}
    }
  },

  created() {
    this.apiServer = apiServer
    this.formatPrice = formatPrice
  },

  async fetch() {    
    const res = await fetch(`${apiServer}/items/${this.$route.params.itemID}`)
    const { item } = await res.json()
    
    this.item = item
  },
}
</script>

<style scoped>
  .content {
    padding-top: 1rem;
  }

  h1 {
    line-height: 1;
  }

  .price {
    font-size: .75rem;
    font-weight: bold;
    color: var(--dark-gray);
  }

  .description {
    margin-top: 2rem;
  }

  .description p {
    font-size: .75rem;
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
