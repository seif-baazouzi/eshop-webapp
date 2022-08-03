<template>
  <div>
    <NavBar/>
    <ItemSingle
      :name="item.itemName"
      :image="item.itemImage"
      :rate="item.rate"
      :price="item.itemPrice"
      :description="item.itemDescription"
    />
  </div>
</template>

<script lang="ts">
import { apiServer } from "../../config/config"

export default {
  name: "Item",

  data() {
    return {
      item: {}
    }
  },

  created() {
    this.apiServer = apiServer
  },

  async fetch() {    
    const res = await fetch(`${apiServer}/items/${this.$route.params.itemID}`)
    const { item } = await res.json()
    
    this.item = item
  },
}
</script>
