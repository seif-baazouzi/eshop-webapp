<template>
  <div>
    <NavBar />
    <ItemList :items="list" />
    <Pagination
      :pages="pages"
      :selectedPage="selectedPage"
      @set-selected-page="(page) => selectedPage = page"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue"
import Pagination from "../components/Pagination.vue"

export default Vue.extend({
  components: { Pagination },
  name: "HomePage",
  
  data() {
    return {
      selectedPage: 1,
      pages: 10,
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
