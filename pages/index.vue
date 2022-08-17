<template>
  <div>
    <NavBar />

    <div class="list-container" v-if="items.length > 0">
      <ItemList :items="items" title="Newest Items" :seeMore="true" />
    </div>

    <div class="list-container">
      <ShopList :shops="shops" title="Newest Shops" :seeMore="true" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import { apiServer } from "../config/config"

export default Vue.extend({
  name: "HomePage",
  
  head() {
    return {
      title: "Home - E-shop"
    }
  },

  data() {
    return {
      items: [],
      shops: [],
    }
  },

  watch: {
    selectedPage: "$fetch"
  },

  async fetch() {
    this.$nextTick(() => this.$nuxt.$loading?.start())

    let res = await fetch(`${apiServer}/items`)
    const { items } = await res.json()
    
    this.items = items.slice(0, 4)

    res = await fetch(`${apiServer}/shops`)
    const { shops } = await res.json()
    
    this.shops = shops.slice(0, 5)

    this.$nuxt.$loading?.finish()
  },
})

</script>
