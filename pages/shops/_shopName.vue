<template>
  <div>
    <NavBar/>
    
    <ShopSingle
      :name="shop.shopName"
      :image="shop.shopImage"
      :description="shop.shopDescription"
      :rate="shop.rate"
    />
    
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
  .separator {
    width: calc(100% - 2rem);
    height: .125rem;
    margin: 1rem auto;
    background-color: var(--light-gray);
  }
</style>
