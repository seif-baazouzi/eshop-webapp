<template>
  <div>
    <NavBar />

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
  name: "ItemsPage",
  
  head() {
    return {
      title: `Items - E-shop`
    }
  },

  data() {
    const page = parseInt(this.$route.query.page.toString())
    
    return {
      selectedPage: (this.$route.query.page && !isNaN(page)) ? page : 1,
      pages: 0,
      items: []
    }
  },

  watch: {
    selectedPage: "$fetch"
  },

  async fetch() {    
    const res = await fetch(`${apiServer}/items?page=${this.selectedPage}`)
    const { items, pages } = await res.json()
    
    this.items = items
    this.pages = pages
  },
})

</script>
