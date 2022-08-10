<template>
  <div>
    <NavBar />
    <div class="container">
      <div class="header">
        <h3>Shops List</h3>
        <button class="blue">Add new shop</button>
      </div>
      <UserManageShopsList
        :shops="shops"
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
}
</script>

<style scoped>
  .container {
    max-width: 968px;
  }

  .header {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
</style>
