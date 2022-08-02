<template>
  <div>
    <NavBar />

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
import { apiServer } from "../config/config"

export default {
  name: "HomePage",
  
  data() {
    return {
      selectedPage: (this.$route.query.page && !isNaN(this.$route.query.page)) ? parseInt(this.$route.query.page) : 1,
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
    this.pages = pages+2
  },
}

</script>
