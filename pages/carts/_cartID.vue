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
import { apiServer } from "../../config/config"
import { parseCookies } from "../../utils/cookies"

export default {
  name: "ShopCartsPage",
  
  data() {
    return {
      items: [],
    }
  },

  async fetch() {
    const rawCookie = this.$nuxt?.context?.req?.headers.cookie || document.cookie || ""
    const cookies = parseCookies(rawCookie)

    let res = await fetch(`${apiServer}/carts/user/items/${this.$route.params.cartID}`, {
      headers: {
        "X-Token": cookies.token,
      },
    })
    const { cartItems } = await res.json()
    
    this.items = cartItems
  },
}
</script>

<style scoped>
  .container {
    max-width: 768px;
  }
</style>
