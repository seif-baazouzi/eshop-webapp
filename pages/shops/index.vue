<template>
  <div>
    <NavBar />
    <ShopList :shops="shops" />
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
  name: "ShopsPage",
  
  head() {
    return {
      title: `Shops - E-shop`
    }
  },

  data() {
    return {
      selectedPage: (this.$route.query.page && !isNaN(this.$route.query.page)) ? parseInt(this.$route.query.page) : 1,
      pages: 0,
      shops: []
    }
  },

  watch: {
    selectedPage: "$fetch"
  },

  async fetch() {    
    const res = await fetch(`${apiServer}/shops?page=${this.selectedPage}`)
    const { shops, pages } = await res.json()
    
    this.shops = shops
    this.pages = pages
  },
}

</script>
