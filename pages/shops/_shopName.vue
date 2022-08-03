<template>
  <div>
    <NavBar/>
    
    <div class="shop">
      <img :src="apiServer + '/images/' + shop.shopImage" alt="">
      <div class="content">
        <h2>{{ shop.shopName }}</h2>
        <Rate :value="shop.rate" />
        <p>{{ shop.shopDescription }}</p>
      </div>
    </div>
    
    <div class="separator"></div>

    <div v-if="items.length > 0">
      <ItemList :items="items" />
      <Pagination
        :pages="pages"
        :selectedPage="selectedPage"
        @set-selected-page="(page) => { $router.push(`/?page=${page}`); selectedPage = page }"
      />
    </div>

    <div v-else class="message-container">
      <h1>There is no items yet!</h1>
    </div>
  </div>
</template>

<script lang="ts">
import { apiServer } from "../../config/config"

export default {
  name: "Shop",

  data() {
    return {
      shop: {},

      selectedPage: (this.$route.query.page && !isNaN(this.$route.query.page)) ? parseInt(this.$route.query.page) : 1,
      pages: 0,
      items: []
    }
  },

  created() {
    this.apiServer = apiServer
  },

  async fetch() {
    let res = await fetch(`${apiServer}/shops/${this.$route.params.shopName}`)
    const { shop } = await res.json()
    
    this.shop = shop

    res = await fetch(`${apiServer}/items/shop/${this.$route.params.shopName}`)
    const { items, pages } = await res.json()
    
    this.items = items
    this.pages = pages
  },
}
</script>

<style scoped>
  .shop img {
    aspect-ratio: 2 / 1;
    object-fit: cover;
  }
  
  .content {
    padding: 1rem;
  }

  .content h2 {
    line-height: 1;
  }

  .content p {
    margin-top: 2rem;
    color: var(--dark-gray);
  }

  .separator {
    width: 90%;
    height: .125rem;
    margin: 1rem auto;
    background-color: var(--light-gray);
  }

  @media screen and (min-width: 768px) {
    .shop {
      padding: 1rem;
      display: flex;
      align-items: flex-start;
    }

    .shop img {
      width: 60%;
      border-radius: .5rem;
    }

    .shop .content {
      width: 40%;
    }
  }
</style>
