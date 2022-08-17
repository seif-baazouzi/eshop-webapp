<template>
  <div>
    <NavBar/>
    <ItemSingle
      v-if="Object.keys(item).length > 0"
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
import Vue from 'vue'

import { apiServer } from "../../config/config"

export default Vue.extend({
  name: "Item",

  head() {
    return {
      title: `Item ${(this as any).item.itemName} - E-shop`
    }
  },

  data() {
    return {
      item: {},

      apiServer: apiServer,
    }
  },

  async fetch() {
    this.$nextTick(() => this.$nuxt.$loading?.start())

    const res = await fetch(`${apiServer}/items/${this.$route.params.itemID}`)
    const { item } = await res.json()
    
    this.item = item

    this.$nuxt.$loading?.finish()
  },
})
</script>
