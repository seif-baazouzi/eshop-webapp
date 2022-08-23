<template>
  <div>
    <NavBar />
    <div class="container">
      <LinksChain :links="linksChain" />
      <UserManageItemsList
        :items="items"
        :shopName="$route.params.shopName"
        @change="(newItemsList) => items = newItemsList"
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
      title: `Manage Shop ${this.$route.params.shopName} - E-shop`
    }
  },

  data() {
    const page = parseInt(this.$route.query.page?.toString())
    
    return {
      selectedPage: (this.$route.query.page && !isNaN(page)) ? page : 1,
      pages: 0,
      items: [],

      linksChain: [
        { path: "/manage-shops", label: "ManageShops" },
        { path: `/manage-shops/${this.$route.params.shopName}`, label: `${this.$route.params.shopName} Items` },
      ]
    }
  },

  watch: {
    selectedPage: "$fetch"
  },

  async fetch() {
    this.$nextTick(() => this.$nuxt.$loading?.start())

    const rawCookie = this.$nuxt?.context?.req?.headers.cookie || document.cookie || ""
    const cookies = parseCookies(rawCookie)

    const res = await fetch(`${apiServer}/items/shop/${this.$route.params.shopName}?page=${this.selectedPage}`, {
      headers: {
        "X-Token": cookies.token
      }
    })    
    const { items, pages } = await res.json()
    
    this.items = items
    this.pages = pages

    this.$nuxt.$loading?.finish()
  },
})
</script>

<style scoped>
  .container {
    max-width: 968px;
  }
</style>
