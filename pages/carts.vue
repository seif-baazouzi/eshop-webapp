<template>
  <div>
    <NavBar />
    <div class="container" v-if="Object.keys(shopsCarts).length !== 0">
      <h1>Carts List</h1>
        <CartList
          v-for="(items, shopName) in shopsCarts"
          :key="shopName"
          :items="items"
          :shopName="shopName"
        />
    </div>
    
    <div class="message-container" v-else>
      <h1>There is no carts yet</h1>
    </div>
  </div>
</template>

<script lang="ts">
export default {
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
  }
}
</script>
