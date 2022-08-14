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
    <CommentList v-if="item.itemID" :itemID="item.itemID" />
  </div>
</template>

<script lang="ts">
import { apiServer } from "../../config/config"

export default {
  name: "Item",

  head() {
    return {
      title: `Item ${this.item.itemName} - E-shop`
    }
  },

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
