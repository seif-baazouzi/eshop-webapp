<template>
  <div>
    <NavBar/>
    <ItemSingle
      :id="item.itemID"
      :name="item.itemName"
      :image="item.itemImage"
      :rate="item.rate"
      :price="item.itemPrice"
      :description="item.itemDescription"
      :shopName="item.itemShop"
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
