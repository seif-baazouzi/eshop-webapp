<template>
  <div>
    <NavBar />
    <div class="container">
      <UserManageCartSingle
        :cartID="parseInt($route.params.cartID)"
        :items="items"
      />
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
      title: `Cart ${this.$route.params.cartID} - E-shop`
    }
  },

  data() {
    return {
      items: [],
    }
  },

  mounted() {
    if(globalThis?.window != null) this.$nextTick(() => this.$nuxt.$loading.start())
  },

  async fetch() {
    this.$nextTick(() => this.$nuxt.$loading?.start())

    const rawCookie = this.$nuxt?.context?.req?.headers.cookie || document.cookie || ""
    const cookies = parseCookies(rawCookie)

    let res = await fetch(`${apiServer}/carts/user/items/${this.$route.params.cartID}`, {
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
