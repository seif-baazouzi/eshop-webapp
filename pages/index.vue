<template>
  <div>
    <NavBar />
    <ItemList :items="list" />
  </div>
</template>

<script lang="ts">
import Vue from "vue"

export default Vue.extend({
  name: "HomePage",
  
  data() {
    return {
      list: [
        { name: "Item Name", price: 1000, rate: 4 },
        { name: "Item Name", price: 1000, rate: 4 },
        { name: "Item Name", price: 1000, rate: 4 },
        { name: "Item Name", price: 1000, rate: 4 },
      ]
    }
  },
})

</script>
