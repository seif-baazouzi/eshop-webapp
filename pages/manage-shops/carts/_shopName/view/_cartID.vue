<template>
  <div>
    <NavBar />
    <div class="container">
      <LinksChain :links="linksChain" />
      <UserManageCartSingle
        :cartID="parseInt($route.params.cartID)"
        :isStore="true"
        :items="items"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import { apiServer } from "../../../../../config/config"
import { parseCookies } from "../../../../../utils/cookies"

export default Vue.extend({
  name: "ShopCartsPage",
  
  head() {
    return {
      title: `Cart ${this.$route.params.cartID} Items - E-shop`
    }
  },

  data() {
    return {
      items: [],

      linksChain: [
        { path: "/manage-shops", label: "ManageShops" },
        { path: `/manage-shops/carts/${this.$route.params.shopName}`, label: `${this.$route.params.shopName} Carts` },
        { path: `/manage-shops/carts/${this.$route.params.shopName}/view/${this.$route.params.cartID}`, label: `Cart ${this.$route.params.cartID}` },
      ]
    }
  },

  async fetch() {
    this.$nextTick(() => this.$nuxt.$loading?.start())

    const rawCookie = this.$nuxt?.context?.req?.headers.cookie || document.cookie || ""
    const cookies = parseCookies(rawCookie)

    let res = await fetch(`${apiServer}/carts/shop/items/${this.$route.params.cartID}`, {
      headers: {
        "X-Token": cookies.token,
      },
    })
    const { cartItems } = await res.json()
    
    this.items = cartItems

    this.$nuxt.$loading?.finish()
  },
})
</script>

<style scoped>
  .container {
    max-width: 768px;
  }
</style>
