<template>
  <div>
    <NavBar />
    
    <div class="container" v-if="carts.length != 0">
      <h4>{{ $route.params.shopName }} Carts List</h4>
      <UserManageCartList
        type="user"
        :shopName="$route.params.shopName"
        :carts="carts"
      />
      <Pagination
        :pages="pages"
        :selectedPage="selectedPage"
        @set-selected-page="(page) => { $router.push(`?page=${page}`); selectedPage = page }"
      />
    </div>

    <div class="message-container" v-else>
      <CartIcon />
      <h1>There is no carts yet!</h1>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import { apiServer } from "../../config/config"
import { parseCookies } from "../../utils/cookies"

export default Vue.extend({
  name: "ShopCartsPage",
  
  head() {
    return {
      title: `Shop Carts List - E-shop`
    }
  },

  data() {
    const page = parseInt(this.$route.query.page?.toString())
    
    return {
      selectedPage: (this.$route.query.page && !isNaN(page)) ? page : 1,
      pages: 0,
      carts: [],
    }
  },

  watch: {
    selectedPage: "$fetch"
  },

  async fetch() {
    const rawCookie = this.$nuxt?.context?.req?.headers.cookie || document.cookie || ""
    const cookies = parseCookies(rawCookie)

    let res = await fetch(`${apiServer}/carts/user?page=${this.selectedPage}`, {
      headers: {
        "X-Token": cookies.token,
      },
    })
    const { carts } = await res.json()
    
    this.carts = carts.slice(0, 4)
  },
})
</script>

<style scoped>
  .container {
    max-width: 768px;
  }
</style>
