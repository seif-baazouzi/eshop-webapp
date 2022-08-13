<template>
  <div>
    <NavBar />
    <div class="container">
      <UserManageItemsList
        :items="items"
        :shopName="$route.params.shopName"
        @change="(newItemsList) => items = newItemsList"
      />
      <Pagination
        :pages="pages"
        :selectedPage="selectedPage"
        @set-selected-page="(page) => { $router.push(`/?page=${page}`); selectedPage = page }"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { apiServer } from "../../config/config"
import { parseCookies } from "../../utils/cookies"

export default {
  name: "UserShopsPage",
  
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
  },
}
</script>

<style scoped>
  .container {
    max-width: 968px;
  }
</style>
