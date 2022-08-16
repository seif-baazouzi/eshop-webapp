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
import Vue from 'vue'

import { apiServer } from "../../config/config"

export default Vue.extend({
  name: "Shop",

  head() {
    return {
      title: `Shop ${this.$route.params.shopName} - E-shop`
    }
  },

  data() {
    const page = parseInt(this.$route.query.page?.toString())

    return {
      shop: {},

      selectedPage: (this.$route.query.page && !isNaN(page)) ? page : 1,
      pages: 0,
      items: [],

      apiServer: apiServer,
    }
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
})
</script>
