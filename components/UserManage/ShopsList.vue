<template>
  <div>
    <div class="table">
      <table>
        <thead>
          <th>Shop Image</th>
          <th>Shop Name</th>
          <th>Edit Image</th>
          <th>Edit</th>
          <th>Delete</th>
        </thead>
        <tbody>
          <UserManageShop
            v-for="(shop) in shops"
            :key="shop.shopName"
            :name="shop.shopName"
            :image="shop.shopImage"
            :description="shop.shopDescription"

            @edit-image="(image) => editShopImage(shop.shopName, image)"
            @edit="(newData) => editShop(shop.shopName, newData)"
            @delete="() => deleteShop(shop.shopName)"
          />
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import { apiServer } from "../../config/config"

export default Vue.extend({
  props: {
    shops: {
      type : Array,
      required: true,
    },
  },

  created() {
    this.apiServer = apiServer
  },

  methods: {
    editShop(oldShopName, { shopName, shopDescription }) {
      this.shops = this.shops.map(s => {
        if(s.shopName === oldShopName) {
          s.shopName = shopName
          s.shopDescription = shopDescription
        }

        return s
      })
    },

    editShopImage(shopName, image) {
      this.shops = this.shops.map(s => {
        if(s.shopName === shopName) {
          s.shopImage = image
        }

        return s
      })
    },

    deleteShop(shopName) {
      this.shops = this.shops.filter(s => s.shopName != shopName)
    },
  }
})
</script>

