<template>
  <div>
    <NavBar />
    <div class="container">
      <UserManageShopsList
        :shops="shops"
        @change="(newShopsList) => shops = newShopsList"
      />
      <Pagination
        :pages="pages"
        :selectedPage="selectedPage"
        @set-selected-page="(page) => { $router.push(`?page=${page}`); selectedPage = page }"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import { apiServer } from "../../config/config"
import { parseCookies } from "../../utils/cookies"

export default Vue.extend({
  name: "UserShopsPage",
  
  head() {
    return {
      title: `Manage Shops - E-shop`
    }
  },

  data() {
    const page = parseInt(this.$route.query.page.toString())
    
    return {
      selectedPage: (this.$route.query.page && !isNaN(page)) ? page : 1,
      pages: 0,
      shops: []
    }
  },

  watch: {
    selectedPage: "$fetch"
  },

  async fetch() {
    const rawCookie = this.$nuxt?.context?.req?.headers.cookie || document.cookie || ""
    const cookies = parseCookies(rawCookie)

    const res = await fetch(`${apiServer}/shops/user?page=${this.selectedPage}`, {
      headers: {
        "X-Token": cookies.token
      }
    })    
    const { shops, pages } = await res.json()
    
    this.shops = shops
    this.pages = pages
  },
})
</script>

<style scoped>
  .container {
    max-width: 968px;
  }
</style>
