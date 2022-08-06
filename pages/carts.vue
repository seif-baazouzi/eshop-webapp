<template>
  <div>
    <NavBar />
    <h1>Carts List</h1>
    <ul>
      <li v-for="(value, key) in shopsCarts" :key="key">{{ key }} => {{ value }}</li>
    </ul>
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
