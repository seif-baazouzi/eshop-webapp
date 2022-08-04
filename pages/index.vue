<template>
  <div>
    <NavBar />

    <div class="welcome">
      <h1>Welcome to our e-shop platform</h1>
    </div>

    <div class="list-container">
      <ItemList :items="items" title="Newest Items" />
      <div class="center-container">
        <NuxtLink to="/items">
          <button class="blue-outline">See more</button>
        </NuxtLink>
      </div>
    </div>

    <div class="list-container">
      <ShopList :shops="shops" title="Newest Shops" />
      <div class="center-container">
        <NuxtLink to="/shops">
          <button class="blue-outline">See more</button>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { apiServer } from "../config/config"

export default {
  name: "HomePage",
  
  data() {
    return {
      items: [],
      shops: [],
    }
  },

  watch: {
    selectedPage: "$fetch"
  },

  async fetch() {    
    let res = await fetch(`${apiServer}/items`)
    const { items } = await res.json()
    
    this.items = items.slice(0, 4)

    res = await fetch(`${apiServer}/shops`)
    const { shops } = await res.json()
    
    this.shops = shops.slice(0, 5)
  },
}

</script>

<style scoped>
  .welcome {
    width: 100%;
    min-height: 50vh;
    margin-bottom: 1rem;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    background-size: cover;
    background-position: center;
    background-image: url("/images/bg.jpg");
  }

  .welcome::before {
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0; left: 0;
    background-color: rgba(0, 0, 0, .45);
  }

  .welcome h1 {
    color: white;
    position: relative;
    text-align: center;
    text-shadow: var(--shadow);
  }
</style>
