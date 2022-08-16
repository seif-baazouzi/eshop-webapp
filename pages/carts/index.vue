<template>
  <div>
    <NavBar />
    
    <div class="container">
      <div class="header">
        <h2>Carts List</h2>
        <NuxtLink to="/carts/list" v-if="$store.state.isLogin">
          <button class="blue-outline">My carts list</button>
        </NuxtLink>
      </div>
    </div>
    
    <div class="container" v-if="Object.keys(shopsCarts).length !== 0">
      <CartList
        v-for="(items, shopName) in shopsCarts"
        :key="shopName"
        :items="items"
        :shopName="shopName"
        @zero-items="(shopName) => deleteShopCart(shopName)"
      />
    </div>
    
    <div class="message-container" v-else>
      <CartIcon />
      <h1>There is no carts yet</h1>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: "carts",

  head() {
    return {
      title: `Carts - E-shop`
    }
  },

  data() {
    return {
      shopsCarts: {},
    }
  },

  mounted() {
    const localStorageCartsList = localStorage.getItem("carts-list")
    if(localStorageCartsList != null) {
      this.shopsCarts = JSON.parse(localStorageCartsList)
    }
  },

  methods: {
    deleteShopCart(shopName: string) {
      delete (this.shopsCarts as any)[shopName]
      this.$forceUpdate()
    }
  }
})
</script>

<style scoped>
  .header {
    max-width: 768px;
    margin: 0 auto 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
</style>
