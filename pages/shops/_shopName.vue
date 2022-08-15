<template>
  <div>
    <NavBar/>
    
    <ShopSingle
      v-if="Object.keys(shop).length > 0"
      :name="shop.shopName"
      :image="shop.shopImage"
      :description="shop.shopDescription"
      :rate="shop.rate"
    />
    
    <ItemList :items="items" />
    <Pagination
      :pages="pages"
      :selectedPage="selectedPage"
      @set-selected-page="(page) => { $router.push(`?page=${page}`); selectedPage = page }"
    />
  </div>
</template>

<script lang="ts">
import { apiServer } from "../../config/config"

export default {
  name: "Shop",

  head() {
    return {
      title: `Shop ${this.$route.params.shopName} - E-shop`
    }
  },

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
